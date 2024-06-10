// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri_plugin_sql::{Migration, MigrationKind};
use tauri::Manager;
use dotenv::dotenv;

fn main() {
  // load env from .env.local path
  dotenv().ok();


  #[tauri::command]
  fn get_env (name: &str) -> String {
    std::env::var(name).unwrap_or_else(|_| "".to_string())
  }
  // only return the file names in the directory, not the full path
  #[tauri::command]
  fn get_files_in_dir (dir: &str) -> Vec<String> {
    let paths = std::fs::read_dir(dir).unwrap();
    let mut files = Vec::new();
    for path in paths {
      let path = path.unwrap().path();
      let file = path.file_name().unwrap().to_str().unwrap().to_string();
      files.push(file);
    }
    files
  }





  let mig_1 = Migration {
    version: 1,
    description: "create_initial_tables",
    sql: include_str!("./migrations/image.sql"),
    kind: MigrationKind::Up,
  };

  let migrations = vec![mig_1];
  // load from env
  let db_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set"); 

  tauri::Builder::default()
  .setup(|app| {
    #[cfg(debug_assertions)] // only include this code on debug builds
    {
      let window = app.get_window("main").unwrap();
      window.open_devtools();
      window.close_devtools();
    }
    Ok(())
  })
  .plugin(tauri_plugin_sql::Builder::default().add_migrations(
    &db_url,
    migrations,
  ).build(),)
    .plugin(tauri_plugin_store::Builder::default().build())
    .invoke_handler(tauri::generate_handler![get_env, get_files_in_dir])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
