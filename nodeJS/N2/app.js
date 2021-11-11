const http = require("http");
const dt = require("./myModule");

const PORT = 8080;
http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("The date and time are currently: " + dt.myDate());
    res.end();
  })
  .listen(PORT);

console.log(`Server Listening on port ${PORT} ...`);
