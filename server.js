const http = require("http");
const fs = require("fs");
const url = require("url");

const port = 8080;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  fs.readFile(parsedUrl.pathname, (err, data) => {
    if (err) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "text/html");
      return res.end(statusCode + " not found");
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write(data);
    return res.end();
  });
});

server.listen(port);
