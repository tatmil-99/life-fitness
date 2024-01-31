const http = require("http");
const fs = require("fs");

const port = 8080;

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, "http://localhost:8080");

  fs.readFile("." + parsedUrl.pathname, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end("404 not found");
    } else if (parsedUrl.pathname.includes(".css")) {
      res.writeHead(200, { "Content-Type": "text/css" });
    } else if (parsedUrl.pathname.includes(".js")) {
      res.writeHead(200, { "Content-Type": "application/javascript" });
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
    }

    res.write(data);
    return res.end();
  });
});

server.listen(port);
