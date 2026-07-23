---
id: release-notes
title: Release Notes
---

# Dane Food API v1.0.0 Release Notes

**Release Date:** July 23, 2026  
**API Version:** `1.0.0`  
**OpenAPI Specification:** `3.0.2`  
**Status:** General Availability (GA)

---

## Overview

We are excited to announce the initial General Availability (GA) release of the **Dane Food API v1.0.0**. This release establishes our foundation for enterprise customer management, food inventory tracking, and asynchronous order processing.

The API uses RESTful endpoints over HTTPS, returning standardized JSON responses with unified error formatting and schema validation.

---

## What's Included in v1.0.0

### 1. Customer Management Service (`/v1/customers`)

Manage customer profile metadata and regional delivery addresses:

* **List Customers (`GET /v1/customers`):** Retrieve paginated customer records.
* **Create Customer (`POST /v1/customers`):** Register new customer entities. Returns a `201 Created` status with a direct resource `Location` header.
* **Get Customer by ID (`GET /v1/customers/{customerId}`):** Fetch customer profiles using UUID path parameters.
* **Update Customer (`PUT /v1/customers/{customerId}`):** Perform full updates on existing customer profiles.
* **Delete Customer (`DELETE /v1/customers/{customerId}`):** Permanently remove customer records.

### 2. Food & Brand Inventory (`/v1/foods`)

Track catalog items, pricing, inventory stock, and distribution center details:

* **List Foods (`GET /v1/foods`):** Access paginated list of catalog brands (e.g., *Happy Dog*, *McDoggles*, *Pupper Time*, *NightNight Doggy*).
* **Create Food Item (`POST /v1/foods`):** Add new food brands and stock items.
* **Get Food by ID (`GET /v1/foods/{foodId}`):** Look up stock and pricing by food UUID.
* **Update Food (`PUT /v1/foods/{foodId}`):** Update stock quantity on hand, pricing, or distribution center locations.
* **Delete Food (`DELETE /v1/foods/{foodId}`):** Purge item entries from the active inventory database.

### 3. Order Processing & Event Webhooks (`/v1/customers/{customerId}/orders`)

Submit orders and track fulfillment asynchronously:

* **Place Customer Order (`POST /v1/customers/{customerId}/orders`):** Submit order line items with UPC codes and quantities.
* **Asynchronous Webhook Notifications (`orderStatusChange`):** Supply an `orderStatusCallbackUrl` in your request body to receive automatic POST notifications whenever order fulfillment status changes.

---

## Security & Authentication

The API enforces two standardized authentication options defined under HTTP security schemes:

* **Bearer Token (`JwtAuthToken`):** Production JWT authorization passed via the HTTP `Authorization` header.
* **Basic Authentication (`BasicAuth`):** HTTP Basic auth for early-stage development and testing pipelines.

---

## Deployment Environments

Target base URLs for each deployment tier:

| Tier | Base Server URL |
| :--- | :--- |
| **Development** | `https://development.gigantic-server.com` |
| **Staging** | `https://staging.gigantic-server.com` |
| **Production** | `https://api.gigantic-server.com` |

---

## Pagination Standards

All array list endpoints (`/v1/customers` and `/v1/foods`) implement uniform offset pagination schema models (`PagedResponse`):

* `pageNumber` *(query, default: `1`)*: Target page number.
* `pageSize` *(query, default: `25`)*: Maximum records returned per page.