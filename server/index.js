const http = require("http");
require("dotenv").config();

const app = http.createServer((req, res) => {
  res.end("Hello world");
});

app.listen(port=process.env.PORT || 8000, () => {
  console.log(`Server is listening on: http://localhost:${port}`);
});
