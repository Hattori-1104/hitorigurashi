use rusqlite::{params, Connection};
use serde::{Deserialize, Serialize};
use specta::Type;
use specta_typescript::Typescript;
use std::sync::Mutex;
use tauri::Manager;
use tauri_specta::{collect_commands, Builder};

#[derive(Serialize, Deserialize, Type)]
pub struct ShoppingItem {
	pub id: i32,
	pub name: String,
	pub quantity: i32,
}

pub struct DBState {
	pub conn: Mutex<Connection>,
}

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
#[specta::specta]
fn greet(name: &str) -> String {
	format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
#[specta::specta]
fn add_item(state: tauri::State<DBState>, name: String, quantity: i32) -> Result<(), String> {
	let conn = state.conn.lock().map_err(|e| e.to_string())?;

	conn.execute("INSERT INTO shopping_items (name, quantity) VALUES (?1, ?2)", params![&name, &quantity]).map_err(|e| e.to_string())?;
	Ok(())
}

#[tauri::command]
#[specta::specta]
fn get_items(state: tauri::State<DBState>) -> Result<Vec<ShoppingItem>, String> {
	let conn = state.conn.lock().map_err(|e| e.to_string())?;
	let mut stmt = conn.prepare("SELECT id, name, quantity FROM shopping_items").map_err(|e| e.to_string())?;
	let items_iter = stmt
		.query_map([], |row| {
			Ok(ShoppingItem {
				id: row.get(0)?,
				name: row.get(1)?,
				quantity: row.get(2)?,
			})
		})
		.map_err(|e| e.to_string())?;
	let items = items_iter.collect::<Result<Vec<_>, _>>().map_err(|e| e.to_string())?;
	Ok(items)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
	let specta_builder = Builder::<tauri::Wry>::new().commands(collect_commands![greet, add_item, get_items]);

	#[cfg(debug_assertions)]
	specta_builder.export(Typescript::default(), "../src/types/bindings.ts").expect("Failed to export TypeScript bindings");

	tauri::Builder::default()
		.setup(|app| {
			// OS固有パス
			let handle = app.handle();
			let app_dir = handle.path().app_data_dir().expect("Failed to get app dir");

			// フォルダがなければ作成
			std::fs::create_dir_all(&app_dir).unwrap();
			let db_path = app_dir.join("hitorigurashi.db");

			// 接続、テーブル作成
			let conn = Connection::open(&db_path).unwrap();
			conn
				.execute(
					"CREATE TABLE IF NOT EXISTS shopping_items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, quantity INTEGER)",
					[],
				)
				.unwrap();

			// Tauriの状態に接続を保存
			app.manage(DBState { conn: Mutex::new(conn) });

			Ok(())
		})
		.invoke_handler(specta_builder.invoke_handler())
		.plugin(tauri_plugin_opener::init())
		.run(tauri::generate_context!())
		.expect("error while running tauri application");
}
