# How to Use My Test API

## 1. Authentication
Before making API calls, authenticate using an API key or OAuth token.

### API Key Authentication
Include your API key in the request header:
```bash
curl -X GET "https://api.example.com/v1/users" -H "Authorization: ApiKey YOUR_API_KEY"
```

### OAuth Token Authentication
Obtain an OAuth token and use it in the request:
```bash
curl -X POST "https://api.example.com/oauth/token" \
  -H "Content-Type: application/json" \
  -d '{"client_id": "your-client-id", "client_secret": "your-client-secret", "grant_type": "client_credentials"}'
```

Use the received token in subsequent requests:
```bash
curl -X GET "https://api.example.com/v1/users" -H "Authorization: Bearer YOUR_TOKEN"
```

## 2. Making Requests
Use HTTP methods to interact with the API:
- **GET**: Retrieve data
- **POST**: Create new data
- **PUT**: Update existing data
- **DELETE**: Remove data

## 3. Example Request
**Retrieve all users:**
```bash
curl -X GET "https://api.example.com/v1/users" -H "Authorization: Bearer YOUR_TOKEN"
```

### Sample JSON Response
```json
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "createdAt": "2024-03-24T12:34:56Z"
    },
    {
      "id": 2,
      "name": "Jane Doe",
      "email": "jane.doe@example.com",
      "createdAt": "2024-03-24T13:45:67Z"
    }
  ]
}
```

## 4. Handling Responses
The API returns JSON responses with standard HTTP status codes:
- `200 OK` - Request successful
- `201 Created` - Resource created
- `400 Bad Request` - Invalid request
- `401 Unauthorized` - Authentication failed
- `404 Not Found` - Resource not found
- Adding a new line of text to test the linter feature. 