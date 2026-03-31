use client::fetch::get_todos;
use rpi_pal::{hal::Delay, i2c::I2c};

#[tokio::main]
async fn main() {
    let (token, server_url) = env();

    let mut todos_rx = get_todos(server_url, token);

    // pins 3 (SDA) and 5 (SCL)
    let mut i2c = I2c::new().unwrap();
    let mut delay = Delay::new();
    let mut lcd = lcd_lcm1602_i2c::sync_lcd::Lcd::new(&mut i2c, &mut delay)
        .with_address(0x27)
        .with_cursor_on(false) // no visible cursos
        .with_rows(2) // two rows
        .init()
        .unwrap();

    while let Some(todos) = todos_rx.recv().await {
        let todos: Vec<_> = todos.iter().filter(|todo| todo.is_today()).collect();

        if let Some(todo) = todos.get(0) {
            let _ = lcd.set_cursor(0, 0);
            let _ = lcd.write_str(&todo.title);
        }

        if let Some(todo) = todos.get(1) {
            let _ = lcd.set_cursor(1, 0);
            let _ = lcd.write_str(&todo.title);
        }
    }
}

fn env() -> (String, String) {
    dotenvy::dotenv().unwrap();

    let token = std::env::var("TASK_LINE_API_TOKEN")
        .expect("TASK_LINE_API_TOKEN environment variable not set");

    let server_url = std::env::var("TASK_LINE_SERVER_URL")
        .expect("TASK_LINE_SERVER_URL environment variable not set");

    (token, server_url)
}
