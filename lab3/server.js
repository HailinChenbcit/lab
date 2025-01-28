const http = require("http");
const url = require("url");
const { message } = require("./lang/messages/en/en");
const { getDate } = require("./modules/utils");

const PORT = 8000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (parsedUrl.pathname === "/lab3/") {
    const name = parsedUrl.query.name;

    if (!name) {
      res.writeHead(400, { "Content-Type": "text/html" });
      res.end(message.error);
      return;
    }

    const responseMessage = getDate(name, message.success);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(responseMessage);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(message[404]);
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
