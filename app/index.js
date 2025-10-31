const http = require('http');

// Azure App Service provides the port via an environment variable
const port = process.env.PORT || 8080;

// This is the HTML for our "Blue" version, styled like the original.
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blue-Green Demo</title>
    <style>
        body { font-family: Arial, sans-serif; display: grid; place-items: center; min-height: 90vh; margin: 0; }
        .container { padding: 3rem 4rem; border-radius: 12px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
        .blue { background-color: #e0f7fa; border: 3px dashed #007bff; color: #004d40; }
        h1 { margin: 0; font-size: 3.5rem; }
    </style>
</head>
<body>
    <div class="container blue">
        <h1>🔵 Blue Version</h1>
        <p>This is the current <strong>Production</strong> environment (Node.js).</p>
    </div>
</body>
</html>
`;

// Create the simple web server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlContent);
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});