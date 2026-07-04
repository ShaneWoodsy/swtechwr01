---
id: overview
title: Overview of API
---

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const ApiStatusTable = () => {
const { siteConfig } = useDocusaurusContext();
return (
<table>
<thead>
<tr>
<th>API Version</th>
<th>Last Updated</th>
<th>Docs Version</th>
<th>Status</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>v{siteConfig.customFields.currentApiVersion}</code></td>
<td>{siteConfig.customFields.lastUpdatedDate}</td>
<td><code>v1.0</code></td>
<td>🟢 Active</td>
</tr>
</tbody>
</table>
);
};

# Overview of API

<ApiStatusTable />

Welcome to the Dane Food API reference engine. This system provides programmatically accessible endpoints designed to manage customer demographics, track supply inventories across domestic distribution centers, and submit real-time pet food purchase lines.

### Base URLs
* **Production:** `https://api.gigantic-server.com`
* **Staging:** `https://staging.gigantic-server.com`
* **Development:** `https://development.gigantic-server.com`

This service uses a REST architecture over standard HTTPS paths, returning structured JSON response payloads for all collections.