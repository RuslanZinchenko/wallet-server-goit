const express = require("express");
const app = express();
const fs = require("fs");
const PORT = process.env.PORT || 3000;

app.get("/costs", function(req, res) {
  fs.readFile("./db/costs/all-costs.json", null, (err, data) => {
    if (err) {
      res.send("file not found");
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.get("/costs/:id", function(req, res) {
  fs.readFile("./db/costs/all-costs.json", null, (err, data) => {
    if (err) {
      res.send("file not found");
    } else {
      res.send(JSON.parse(data).find(i => i.id === Number(req.params.id)));
    }
  });
});

app.get("/category/", function(req, res) {
  fs.readFile("./db/costs/all-costs.json", null, (err, data) => {
    if (err) {
      res.send("file not found");
    } else {
      res.send(
        JSON.parse(data).filter(val => val.category === req.query.category)
      );
    }
  });
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
