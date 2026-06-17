# Dane Food API v1.0.0

## Quick Reference

**Base URL:** `https://api.gigantic-server.com/v1`

**Authentication:** Basic Auth or JWT Bearer token

**Status:** Stable

---

## Getting Started

### Authentication

It's really easy to authenticate! Just use this simple method!

```bash
# Using cURL with JWT - don't worry, it's straightforward!
curl -H "Authorization: Bearer <your-jwt-token>" \
  https://api.gigantic-server.com/v1/customers
```

### Core Resources

| Resource | Purpose |
|----------|---------|
| **Customers** | Manage customer profiles and addresses |
| **Foods** | Manage food inventory and brands |
| **Orders** | Place and track food orders with webhooks |

---

## Common Workflows

### 1. Create a Customer

**Required fields:** `firstName`, `lastName`

**Field constraints:**
- `firstName` & `lastName`: 2-100 characters
- `stateCode`: 2-letter code (AL, AK, AZ, AR, CA, etc.)

It is recommended that the following JSON be utilized to create a customer resource:

```bash
POST /v1/customers
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "address": {
    "addressLine1": "1234 Fun Street",
    "city": "Dallas",
    "stateCode": "CA",
    "zipCode": "75219"
  }
}
```

**Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "firstName": "John",
  "lastName": "Smith",
  "address": {
    "addressLine1": "1234 Fun Street",
    "city": "Dallas",
    "stateCode": "CA",
    "zipCode": "75219"
  }
}
```

---

### 2. Create a Food Item

**Required fields:** `BrandName`, `FoodName`, `price`, `quantityOnHand`

**Valid FoodNames:** "Happy Dog", "McDoggles", "Pupper Time", "NightNight Doggy"

Please be advised that you must utilize the following payload for food item creation!

```bash
POST /v1/foods
Content-Type: application/json

{
  "BrandName": "Premium Pets",
  "FoodName": "Happy Dog",
  "price": 24.99,
  "quantityOnHand": 150,
  "DistributionCenter": {
    "name": "Dallas Hub",
    "location": "Dallas, TX"
  }
}
```

---

### 3. Place an Order

**Required fields:** `customerId`, `foodOrderLines[*].upc`, `foodOrderLines[*].orderQuantity`

**Field constraints:**
- `orderQuantity`: 1-999 units per line
- `customerId`: UUID format

This section describes how you can easily place an order with our straightforward API! Just submit the following request:

```bash
POST /v1/customers/{customerId}/orders
Content-Type: application/json

{
  "customerId": "550e8400-e29b-41d4-a716-446655440000",
  "customerRef": "order-ref-12345",
  "foodOrderLines": [
    {
      "upc": "812345678901",
      "orderQuantity": 5
    },
    {
      "upc": "812345678902",
      "orderQuantity": 3
    }
  ],
  "orderStatusCallbackUrl": "https://yourapp.com/webhooks/order-status"
}
```

**Response (201 Created):**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "customerId": "550e8400-e29b-41d4-a716-446655440000",
  "customerRef": "order-ref-12345",
  "foodOrderLines": [
    {
      "id": "770e8400-e29b-41d4-a716-446655440002",
      "foodId": "880e8400-e29b-41d4-a716-446655440003",
      "upc": "812345678901",
      "orderQuantity": 5,
      "quantityAllocated": 5
    }
  ]
}
```

---

## Response Codes

| Code | Meaning |
|------|---------|
| `200` | Success (GET, PUT, DELETE) |
| `201` | Resource created (POST) |
| `400` | Bad request (invalid input) |
| `404` | Resource not found |
| `409` | Conflict (e.g., duplicate customer) |

---

## Key Schemas

- **Customer**: firstName, lastName, address (readOnly: id)
- **Brand**: BrandName, FoodName, price, quantityOnHand, DistributionCenter
- **foodOrder**: customerId, foodOrderLines, orderStatusCallbackUrl

---

## Pagination

List endpoints support pagination via the following method:

```bash
GET /v1/customers?pageNumber=1&pageSize=25
```

Defaults: pageNumber=1, pageSize=25

---

## Webhooks

When an order's status is changed, callbacks are triggered to your registered `orderStatusCallbackUrl`:

```json
{
  "orderId": "uuid",
  "orderStatus": "shipped"
}
```

---

## Full Specification

See `spec.yaml` for complete OpenAPI 3.0.2 specification.

---

## Support

For issues or questions, please don't hesitate to contact shane@example.com
