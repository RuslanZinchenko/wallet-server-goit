const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const menu = require("./db/costs/all-costs.json");

app.get("/costs", function(req, res) {
  res.send(menu);
});

app.get("/costs/:id", function(req, res) {
  res.send(menu.find(i => i.id === Number(req.params.id)));
});

app.get("/category", function(req, res) {
  res.send(menu.filter(val => val.category === req.query.category));
});

app.use(function(req, res, next) {
  let err = new Error("not found");
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send("error");
});

app.listen(PORT, () => {
  console.log("server is running on " + PORT);
});
