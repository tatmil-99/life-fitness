const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  const filePath = path.join(
    __dirname,
    "public",
    req.url == "/" ? "home.html" : req.url
  );
  const fileExt = path.extname(filePath);

  let contentType;

  if (fileExt == ".js") {
    contentType = "text/javascript";
  } else if (fileExt == ".jpg" || fileExt == ".png") {
    contentType = `image/${fileExt.slice(1)}`;
  } else {
    contentType = `text/${fileExt.slice(1)}`;
  }

  fs.readFile(filePath, (err, data) => {
    try {
      res.writeHead(200, { "Content-Type": contentType });
      res.write(data);
    } catch (err) {
      if (err.code == "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write("<h1>404 Not Found</h1>");
      }
    }

    return res.end();
  });
});

server.listen(port, () => console.log(`server running on port ${port}...`));
