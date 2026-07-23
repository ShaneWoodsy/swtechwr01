---
id: errors
title: Error Responses and Handling
---

# Error Responses and Handling

The Dane Food API uses standard HTTP status codes to communicate request outcomes. This guide covers all possible error scenarios, their causes, and recommended recovery strategies.

---

## HTTP Status Codes Overview

| Code | Status | Use Case |
|------|--------|----------|
| `200` | OK | Successful GET, PUT, DELETE |
| `201` | Created | Successful POST (resource created) |
| `400` | Bad Request | Invalid input, validation failure |
| `404` | Not Found | Resource doesn't exist |
| `409` | Conflict | Duplicate resource, state conflict |

---

## 400 Bad Request

### Overview
A `400 Bad Request` error indicates that the API rejected the request due to malformed or invalid input data.

### Common Causes

#### 1. **Invalid JSON Payload**
- Malformed JSON syntax
- Missing required fields
- Incorrect data types

**Example Error Scenario:**
```bash
POST /v1/customers
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "address": {
    "stateCode": "INVALID"  # Invalid: Must be 2-letter code (AL, AK, AZ, etc.)
  }
}

```

**Response:**

```json
{
  "status": 400,
  "message": "Bad Request: Invalid stateCode. Expected one of: AL, AK, AZ, AR, CA"
}

```

**Resolution:**

* Verify `stateCode` is a valid 2-letter code from: `AL`, `AK`, `AZ`, `AR`, `CA`
* Ensure all required fields are present

#### 2. **Invalid Food Order Quantity**

* `orderQuantity` is less than 1 or greater than 999
* Missing required order line item fields

**Example Error Scenario:**

```bash
POST /v1/customers/{customerId}/orders
Content-Type: application/json

{
  "customerId": "550e8400-e29b-41d4-a716-446655440000",
  "foodOrderLines": [
    {
      "upc": "812345678901",
      "orderQuantity": 1500  # Invalid: Maximum is 999
    }
  ]
}

```

**Response:**

```json
{
  "status": 400,
  "message": "Bad Request: orderQuantity must be between 1 and 999"
}

```

**Resolution:**

* Ensure `orderQuantity` is between 1-999 units per line item
* Split larger orders into multiple requests if needed

#### 3. **Invalid Food Name**

* `FoodName` is not one of the supported values

**Example Error Scenario:**

```bash
POST /v1/foods
Content-Type: application/json

{
  "BrandName": "Premium Pets",
  "FoodName": "Unknown Brand",  # Invalid
  "price": 24.99,
  "quantityOnHand": 150
}

```

**Response:**

```json
{
  "status": 400,
  "message": "Bad Request: FoodName must be one of: 'Happy Dog', 'McDoggles', 'Pupper Time', 'NightNight Doggy'"
}

```

**Resolution:**

* Use only supported food names: `"Happy Dog"`, `"McDoggles"`, `"Pupper Time"`, `"NightNight Doggy"`

#### 4. **Field Length Violations**

* `firstName` or `lastName` shorter than 2 characters or longer than 100

**Example Error Scenario:**

```bash
POST /v1/customers
Content-Type: application/json

{
  "firstName": "J",  # Invalid: Must be 2-100 characters
  "lastName": "Smith"
}

```

**Response:**

```json
{
  "status": 400,
  "message": "Bad Request: firstName must be 2-100 characters long"
}

```

**Resolution:**

* Ensure `firstName` and `lastName` are 2-100 characters
* Names cannot be single characters

#### 5. **Invalid UUID Format**

* `customerId` is not a valid UUID

**Example Error Scenario:**

```bash
GET /v1/customers/not-a-uuid

```

**Response:**

```json
{
  "status": 400,
  "message": "Bad Request: Invalid UUID format for customerId"
}

```

**Resolution:**

* Use valid UUID format (e.g., `550e8400-e29b-41d4-a716-446655440000`)

---

## 404 Not Found

### Overview

A `404 Not Found` error indicates that the requested resource doesn't exist in the system.

### Common Causes

#### 1. **Customer Not Found**

* Attempting to fetch, update, or delete a customer that doesn't exist

**Example Error Scenario:**

```bash
GET /v1/customers/550e8400-e29b-41d4-a716-446655440999

```

**Response:**

```json
{
  "status": 404,
  "message": "Not Found: Customer with ID 550e8400-e29b-41d4-a716-446655440999 does not exist"
}

```

**Resolution:**

* Verify the customer ID is correct
* Use `GET /v1/customers` to list available customers
* Ensure the customer was created successfully (check 201 response)

#### 2. **Food Item Not Found**

* Attempting to fetch, update, or delete a food item that doesn't exist

**Example Error Scenario:**

```bash
GET /v1/foods/550e8400-e29b-41d4-a716-446655440999

```

**Response:**

```json
{
  "status": 404,
  "message": "Not Found: Food with ID 550e8400-e29b-41d4-a716-446655440999 does not exist"
}

```

**Resolution:**

* Verify the food ID is correct
* Use `GET /v1/foods` to list available food items
* Create the food item if it doesn't exist

#### 3. **No Foods in System**

* Attempting to list foods when the database is empty

**Example Error Scenario:**

```bash
GET /v1/foods

```

**Response (on empty database):**

```json
{
  "status": 404,
  "message": "Not Found: No Dane Food found"
}

```

**Resolution:**

* Create food items using `POST /v1/foods`
* Check pagination parameters if filtering results

---

## 409 Conflict

### Overview

A `409 Conflict` error indicates that the request conflicts with the current state of a resource or violates a unique constraint.

### Common Causes

#### 1. **Duplicate Customer**

* Attempting to create a customer that already exists with the same identifying characteristics

**Example Error Scenario:**

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

**Response (if duplicate exists):**

```json
{
  "status": 409,
  "message": "Conflict: A customer with these details already exists. Use PUT to update existing customers."
}

```

**Resolution:**

* Check if the customer already exists using `GET /v1/customers`
* Use `PUT /v1/customers/{customerId}` to update an existing customer instead
* Include unique identifiers (customerRef) to prevent duplicates

#### 2. **Duplicate Food Item**

* Attempting to create a food item with duplicate identifying attributes

**Example Error Scenario:**

```bash
POST /v1/foods
Content-Type: application/json

{
  "BrandName": "Premium Pets",
  "FoodName": "Happy Dog",
  "price": 24.99,
  "quantityOnHand": 150
}

```

**Response (if duplicate exists):**

```json
{
  "status": 409,
  "message": "Conflict: A food item with this brand and name combination already exists"
}

```

**Resolution:**

* Use `PUT /v1/foods/{foodId}` to update the existing food item
* Use a different brand name or food name combination if a new item is intended

#### 3. **Conflicting Order State**

* Attempting to place an order when inventory is insufficient or customer is locked

**Example Error Scenario:**

```bash
POST /v1/customers/{customerId}/orders
Content-Type: application/json

{
  "customerId": "550e8400-e29b-41d4-a716-446655440000",
  "foodOrderLines": [
    {
      "upc": "812345678901",
      "orderQuantity": 5000  # Insufficient inventory
    }
  ]
}

```

**Response:**

```json
{
  "status": 409,
  "message": "Conflict: Insufficient inventory for requested order. Available units: 150, Requested: 5000"
}

```

**Resolution:**

* Check current inventory levels using `GET /v1/foods/{foodId}`
* Reduce order quantity to available stock
* Split the order and place multiple requests if necessary

#### 4. **Update Conflict**

* Attempting to update a resource that has been modified since retrieval

**Example Error Scenario:**

```bash
PUT /v1/customers/{customerId}
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Doe"
}

```

**Response (on stale data):**

```json
{
  "status": 409,
  "message": "Conflict: The customer has been modified by another process. Fetch the latest version and retry."
}

```

**Resolution:**

* Fetch the latest customer data using `GET /v1/customers/{customerId}`
* Retry the update with current data

---

## Error Response Format

All error responses follow a consistent JSON structure:

```json
{
  "status": 400,
  "message": "Descriptive error message",
  "timestamp": "2024-01-15T10:30:00Z",
  "path": "/v1/customers"
}

```

### Fields:

* **status**: HTTP status code
* **message**: Human-readable description of the error
* **timestamp**: ISO 8601 timestamp of the error
* **path**: The API endpoint that generated the error

---

## Best Practices for Error Handling

### 1. **Validate Before Sending**

```javascript
// Before creating a customer, validate locally
const validateCustomer = (customer) => {
  if (!customer.firstName || customer.firstName.length < 2) {
    throw new Error("firstName must be 2-100 characters");
  }
  if (!customer.lastName || customer.lastName.length < 2) {
    throw new Error("lastName must be 2-100 characters");
  }
  return true;
};

```

### 2. **Implement Retry Logic**

```javascript
// Retry transient errors (5xx) but not client errors (4xx)
const makeRequest = async (endpoint, options, maxRetries = 3) => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(endpoint, options);
      if (response.status >= 500) {
        throw new Error("Server error, retrying...");
      }
      return response;
    } catch (error) {
      if (attempt === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 2 ** attempt * 1000));
    }
  }
};

```

### 3. **Handle Specific Error Codes**

```javascript
const handleResponse = async (response) => {
  if (response.ok) return response.json();
  
  const error = await response.json();
  
  switch (response.status) {
    case 400:
      console.error("Validation error:", error.message);
      break;
    case 404:
      console.error("Resource not found:", error.message);
      break;
    case 409:
      console.error("Conflict:", error.message);
      break;
    default:
      throw new Error(error.message);
  }
};

```

### 4. **Log and Monitor**

* Track error frequencies per endpoint
* Alert on unusual error patterns
* Log full request/response for debugging

### 5. **User Communication**

* Provide clear, actionable error messages to users
* Suggest remediation steps
* Avoid exposing internal system details

---

## Common Error Patterns by Endpoint

### `POST /v1/customers`

**Likely Errors:** `400` (validation), `409` (duplicate)

### `GET /v1/customers/{customerId}`

**Likely Errors:** `400` (invalid UUID), `404` (not found)

### `PUT /v1/customers/{customerId}`

**Likely Errors:** `400` (validation), `409` (conflict), `404` (not found)

### `DELETE /v1/customers/{customerId}`

**Likely Errors:** `404` (not found)

### `POST /v1/foods`

**Likely Errors:** `400` (invalid food name), `409` (duplicate)

### `POST /v1/customers/{customerId}/orders`

**Likely Errors:** `400` (invalid quantity), `404` (customer not found), `409` (inventory conflict)

---

## Support

For unresolved errors or unexpected responses, contact: **shane@example.com**

Include the following in your report:

* HTTP status code
* Error message
* Request endpoint and method
* Request payload (sanitized)
* Timestamp of occurrence
