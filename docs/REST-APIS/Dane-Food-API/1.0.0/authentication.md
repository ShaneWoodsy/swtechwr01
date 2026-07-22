---
id: authentication
title: Authentication Options
---

# Authentication Options

The Dane Food API gateway natively supports two distinct protocol validation methods to protect resource paths depending on your specific infrastructure environmental context.

### 1. HTTP Basic Authentication
For quick scripts or development testing, pass your base64 encoded credential pairs inside the standard header block:

```http
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
```

### 2. JWT Bearer Token Authentication

For production applications, pass a validated JSON Web Token (JWT) in the Authorization header:

```http
Authorization: Bearer YOUR_VALIDATED_JWT_STRING
```
