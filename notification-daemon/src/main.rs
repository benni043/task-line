use clap::Parser;
use client::fetch::get_todos;

#[derive(Parser, Debug)]
#[command(version, about, long_about = None)]
struct Args {
    #[arg(short, long)]
    server_url: String,
}

#[tokio::main]
async fn main() {
    let args = Args::parse();
    let token = std::env::var("TASK_LINE_API_TOKEN")
        .expect("TASK_LINE_API_TOKEN environment variable not set");

    let mut todos_rx = get_todos(args.server_url, token);

    while let Some(todos) = todos_rx.recv().await {
        let todos: Vec<_> = todos.iter().filter(|todo| todo.time.is_some()).collect();

        for todo in todos {
            println!("{}: {:?}", todo.title, todo.time);
        }
    }
}
