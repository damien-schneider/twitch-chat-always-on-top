#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Manager, WindowEvent};
use std::fs;
use std::path::PathBuf;
use serde::{Deserialize, Serialize};
use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial};
#[cfg(target_os = "windows")]
use window_vibrancy::apply_blur;

#[derive(Serialize, Deserialize, Clone)]
struct AppState {
    channel: String,
    always_on_top: bool,
    transparent: bool,
}

impl Default for AppState {
    fn default() -> Self {
        Self {
            channel: "poly_fr".to_string(),
            always_on_top: false,
            transparent: false,
        }
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .setup(|app| {
            let _app_handle = app.handle();
            let window = app.get_webview_window("main").unwrap();
            
            window.on_window_event(move |event| {
                if let WindowEvent::CloseRequested { .. } = event {
                    // The frontend should handle saving state before closing
                    // We'll let the window close normally
                }
            });
            
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            set_always_on_top,
            set_transparency,
            load_state,
            save_state,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn set_always_on_top(app_handle: tauri::AppHandle, always_on_top: bool) -> Result<(), String> {
    let window = app_handle.get_webview_window("main")
        .ok_or("Failed to get main window")?;
    window.set_always_on_top(always_on_top).map_err(|e| e.to_string())
}

#[tauri::command]
fn set_transparency(app_handle: tauri::AppHandle, transparent: bool) -> Result<(), String> {
    let window = app_handle.get_webview_window("main")
        .ok_or("Failed to get main window")?;
        
    if transparent {
        // Remove decorations first for better transparency
        window.set_decorations(false).map_err(|e| e.to_string())?;
        
        #[cfg(target_os = "macos")]
        {
            // Apply vibrancy effect for macOS
            apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, None)
                .map_err(|e| format!("Failed to apply vibrancy: {}", e))?;
        }
        
        #[cfg(target_os = "windows")]
        {
            apply_blur(&window, Some((18, 18, 18, 125)))
                .map_err(|e| format!("Failed to apply blur: {}", e))?;
        }
    } else {
        // Restore decorations when not transparent
        window.set_decorations(true).map_err(|e| e.to_string())?;
        
        #[cfg(target_os = "macos")]
        {
            // Use a more opaque background material
            apply_vibrancy(&window, NSVisualEffectMaterial::WindowBackground, None, None)
                .map_err(|e| format!("Failed to remove vibrancy: {}", e))?;
        }
        
        #[cfg(target_os = "windows")]
        {
            apply_blur(&window, None)
                .map_err(|e| format!("Failed to remove blur: {}", e))?;
        }
    }
    Ok(())
}

#[tauri::command]
fn get_app_config_dir(app_handle: tauri::AppHandle) -> Result<PathBuf, String> {
    app_handle
        .path()
        .app_config_dir()
        .map_err(|e| format!("Failed to get app config directory: {}", e))
}

#[tauri::command]
async fn save_state(app_handle: tauri::AppHandle, channel: String, always_on_top: bool, transparent: bool) -> Result<(), String> {
    let state_path = get_app_config_dir(app_handle)?;
    let mut state_file_path = PathBuf::from(&state_path);
    
    // Create directory if it doesn't exist
    if !state_path.exists() {
        fs::create_dir_all(&state_path).map_err(|e| e.to_string())?;
    }
    
    state_file_path.push("app_state.json");
        
    let state = AppState {
        channel,
        always_on_top,
        transparent,
    };
    
    // Write state to file
    let state_json = serde_json::to_string(&state).map_err(|e| e.to_string())?;
    fs::write(state_file_path, state_json).map_err(|e| e.to_string())?;
    
    Ok(())
}

#[tauri::command]
async fn load_state(app_handle: tauri::AppHandle) -> Result<AppState, String> {
    let state_path = get_app_config_dir(app_handle.clone())?;
    let mut state_file_path = PathBuf::from(&state_path);
    state_file_path.push("app_state.json");
    
    if !state_file_path.exists() {
        return Ok(AppState::default());
    }
    
    let state_json = fs::read_to_string(state_file_path).map_err(|e| e.to_string())?;
    let state: AppState = serde_json::from_str(&state_json).map_err(|e| e.to_string())?;
    
    Ok(state)
}