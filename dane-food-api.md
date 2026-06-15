---
layout: null
title: Dane Food API Interactive Console
---
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Dane Food API - Interactive Reference Console</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css" />
<style>
html { box-sizing: border-box; overflow-y: scroll; }
*, *:before, *:after { box-sizing: inherit; }
body { margin: 0; background: #fafafa; }
</style>
</head>
<body>
<div id="swagger-ui"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-standalone-preset.min.js"></script>
<script>
window.onload = () => {
window.ui = SwaggerUIBundle({
url: 'https://raw.githubusercontent.com/ShaneWoodsy/REST-APIS/main/Dane-Food-API/spec.yaml',
dom_id: '#swagger-ui',
presets: [
SwaggerUIBundle.presets.apis,
SwaggerUIStandalonePreset
],
layout: "BaseLayout",
deepLinking: true,
docExpansion: "list",
defaultModelRendering: "example"
});
};
</script>
</body>
</html>