# Notification Daemon

A simple service send Notification for todos.

## Installation

Install via Systemd

1. Build and Install `task-line-notification-daemon` using Cargo:

```sh
cargo install --path .
```

2. Create a systemd service file at `~/.config/systemd/user/task-line-notification-daemon.service` with the following content:

```ini
[Unit]
Description=TaskLine Notification Daemon Service
After=graphical.target default.target

[Service]
ExecStart=/home/<User>/.cargo/bin/task-line-notification-daemon
Restart=always
RestartSec=5
StandardOutput=journal
StandardError=journal
Environment="PATH=/home/<User>/.cargo/bin:/usr/local/bin:/usr/bin:/bin"
Environment="TASK_LINE_API_TOKEN=<YOUR_API_TOKEN>"

[Install]
WantedBy=default.target
```

3. Enable and start the service:

```sh
systemctl --user daemon-reload
systemctl --user enable task-line-notification-daemon.service
systemctl --user start task-line-notification-daemon.service
```

4. Verify the service status:

```sh
systemctl --user status task-line-notification-daemon.service
```
