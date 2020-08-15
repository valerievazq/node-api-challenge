const server = require("./server.js");
const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`** Server Running on http://localhost:${port} **`);
});

server.use("/", (err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: `someting went wrong`,
  });
});
