---
id: make-call
title: How to Make the API Call
---

# How to Make the API Call

This example shows how to perform an authorized look-up against your food inventory collection using standard pagination parameter tracking queries.

```
curl -X GET "https://api.gigantic-server.com/v1/foods?pageNumber=1&pageSize=25" \
  -H "Authorization: Bearer YOUR_VALIDATED_JWT_STRING" \
  -H "Accept: application/json"
```
## Expected Response Payload

The database returns an array tracking item objects alongside pagination telemetry attributes:

```json
{
"content": [
{
"id": "8f3b1492-c430-4e59-b1a9-d6e87f8974a2",
"BrandName": "Pupper Time",
"FoodName": "Pupper Time",
"price": 24.99,
"quantityOnHand": 142
}
],
"totalPages": 4,
"totalElements": 88,
"size": 25,
"number": 1
}
```
