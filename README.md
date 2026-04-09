# TaskLine

A simple to-do app focused on tasks that can be completed within a specific time span.

## .env example

### Development

Create a OAuth client at [google](https://console.cloud.google.com/)

```dotenv
GOOGLE_CLIENT_ID=<google_client_id>
GOOGLE_CLIENT_SECRET=<google_client_secret>
```

### Deployment

```dotenv
BASE_URL="http://localhost:3000"

GOOGLE_CLIENT_ID=<google_client_id>
GOOGLE_CLIENT_SECRET=<google_client_secret>

UPSTASH_URL=<url>
UPSTASH_TOKEN=<auth_token>

BETTER_AUTH_SECRET=<secret>
BETTER_AUTH_URL=http://localhost:3000
```
