---
id: best-practices
title: API Best Practices
---

# API Best Practices

Following these foundational integration patterns ensures your application maintains high availability, reliable data synchronization, and optimal performance when consuming the Dane Food API.

---

## 1. Asynchronous Webhook Management

Because complex inventory lookup and fulfillment allocation steps execute asynchronously in the background, your system must actively leverage the `orderStatusCallbackUrl` parameter.

* **Expose a Public Endpoint:** Ensure your client application exposes a secure, publicly accessible HTTPS endpoint capable of receiving incoming inbound `POST` requests from our gateway.
* **Acknowledge Instantly:** Your webhook listener should immediately return an empty `HTTP 200 OK` status response upon receiving a payload before spinning up deep internal data processing routines.

---

## 2. Inventory Pagination Controls

When scanning large product catalogs via the `/v1/foods` endpoint, always adhere to explicit pagination boundaries rather than attempting to bypass collection caps.

* **Respect the Defaults:** Use the built-in query filters (`pageNumber=1&pageSize=25`) to stream datasets in digestible chunks.
* **Avoid Payload Overhead:** Requesting massive page sizes within a single transaction cycle increases round-trip latency and risks hitting gateway timeout thresholds.

---

## 3. Credential Security

Never hardcode your `BasicAuth` credentials or `JwtAuthToken` values directly inside frontend client source repositories. Always retrieve validation strings dynamically from a secured environment variable vault at execution runtime.