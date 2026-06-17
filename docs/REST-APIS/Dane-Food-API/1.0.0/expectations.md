---
id: expectations
title: Expected Payload Constraints
---

# Expected Payload Constraints

To ensure structural integrity and prevent downstream integration errors, all incoming JSON payloads must conform exactly to the strict field boundaries defined within the core validation schemas.

---

## 1. Customer Address Verification

When instantiating or updating a customer profile via `POST` or `PUT`, the sub-schema validation engine applies the following rigid checks:

* **stateCode:** Must contain exactly a two-letter uppercase character string matching authorized processing regions. The current validation layer supports: `AL`, `AK`, `AZ`, `AR`, `CA`.
* **zipCode:** Must be supplied as a string representation mapping to a valid geographic postal region (e.g., `75219`).

---

## 2. Food Order Line Item Bounds

When compiling order requests, individual line arrays are cross-referenced against business layer constraints prior to inventory allocation:

* **orderQuantity:** The minimum acceptable processing threshold per discrete line item is `1`. The maximum allowable unit cap per single execution step is `999`. Any volume exceeding this threshold triggers an immediate `HTTP 400 Bad Request` validation failure.
* **customerId:** Must match a valid, pre-existing `UUID` string format tracked in the primary data cluster.