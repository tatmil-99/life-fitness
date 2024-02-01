const http = require("http");
const fs = require("fs");

const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, "http://localhost:8080");
  const urlPath = "." + parsedUrl.pathname;

  fs.readFile(urlPath, (err, data) => {
    try {
      res.statusCode = 200;

      // set header content based on media type
      if (urlPath.includes(".css")) {
        res.setHeader("Content-Type", "text/css");
      } else if (urlPath.includes(".js")) {
        res.setHeader("Content-Type", "text/javascript");
      } else {
        res.setHeader("Content-Type", "text/html");
      }

      res.write(data);

      return res.end();
    } catch (err) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");

      return res.end("404 not found");
    }
  });
});

server.listen(port, () => console.log("server running..."));
