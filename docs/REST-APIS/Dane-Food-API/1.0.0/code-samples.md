---
id: code-samples
title: Node.js Implementation Example
---

# Node.js Implementation Example

The following production-ready JavaScript sample demonstrates how to programmatically initialize an order lifecycle by transmitting a structured multi-line JSON payload to the customer order endpoint using the native Fetch API.

---

## Order Submission Script

This script automatically structures your target `foodOrderLines` array, sets up your asynchronous status tracking webhook callback URL, and maps the entire transaction against a specific customer identifier.

```javascript
/**
 * Submits a new pet food order for a specific customer account.
 * 
 * @param {string} customerId - The unique UUID identifier of the customer.
 * @param {string} jwtToken - A valid JSON Web Token string for authentication.
 */
const createCustomerFoodOrder = async (customerId, jwtToken) => {
  // Define the endpoint URL mapping to the specific customer record
  const endpointUrl = `[https://api.gigantic-server.com/v1/customers/$](https://api.gigantic-server.com/v1/customers/$){customerId}/orders`;

  // Build the strict payload matching the OpenAPI foodOrder schema constraints
  const orderPayload = {
    customerId: customerId,
    customerRef: "ORD-REF-2026-MARKET",
    foodOrderLines: [
      {
        upc: "812345678901",
        orderQuantity: 5
      },
      {
        upc: "812345678902",
        orderQuantity: 3
      }
    ],
    orderStatusCallbackUrl: "[https://my-application.example.com/webhooks/fulfillment-status](https://my-application.example.com/webhooks/fulfillment-status)"
  };

  try {
    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(orderPayload)
    });

    // An HTTP 201 status indicates successful object creation inside the gateway
    if (response.status === 201) {
      const locationHeader = response.headers.get('Location');
      console.log(`Order processed successfully.`);
      console.log(`Tracking Resource Location: ${locationHeader}`);
    } else {
      console.error(`Execution failed with status code: ${response.status}`);
    }
  } catch (error) {
    console.error('An error occurred during request transmission:', error);
  }
};

// Example execution invocation parameters
const targetCustomerUuid = "550e8400-e29b-41d4-a716-446655440000";
const userSessionJwt = "YOUR_VALIDATED_JWT_STRING_HERE";

createCustomerFoodOrder(targetCustomerUuid, userSessionJwt);