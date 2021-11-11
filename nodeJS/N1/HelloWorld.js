let http = require("http");

const PORT = 8080;
http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("Hello World!");
  })
  .listen(PORT);

console.log(`Server Listening on port ${PORT} ...`);
