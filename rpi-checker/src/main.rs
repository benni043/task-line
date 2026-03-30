use client::fetch::get_todos;

#[tokio::main]
async fn main() {
    dotenvy::dotenv().unwrap();

    let token = std::env::var("TASK_LINE_API_TOKEN")
        .expect("TASK_LINE_API_TOKEN environment variable not set");

    let server_url = std::env::var("TASK_LINE_SERVER_URL")
        .expect("TASK_LINE_SERVER_URL environment variable not set");

    let mut todos_rx = get_todos(server_url, token);

    while let Some(todos) = todos_rx.recv().await {
        let todos: Vec<_> = todos
            .iter()
            .filter(|todo| todo.time.is_some())
            .filter(|todo| todo.is_today())
            .collect();

        for todo in todos {
            println!("{}", todo.title);
        }
    }
}
