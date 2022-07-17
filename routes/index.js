const express = require("express");
const router = express.Router();
const elastic = require("elasticsearch");
const bodyParser = require("body-parser").json();
const insertDoc = require("../insertData");
const searchDoc = require("../search");

const es = elastic.Client({
  host: "localhost:9200",
});

router.use((req, res, next) => {
  es.index({
    index: "logs",
    body: {
      url: req.url,
      method: req.method,
    },
  })
    .then((res) => {
      console.log("logs index");
    })
    .catch((err) => {
      console.log(err);
    });

  next();
});

router.post("/products", bodyParser, async (req, res, next) => {
  const { index, id, type, data } = req.body;
  try {
    const resp = await insertDoc(index, id, type, data);
    res.send(resp);
  } catch (e) {
    console.log(e);
  }
});

router.get("/products/:title", bodyParser, async (req, res, next) => {
  const title = req.params.title;
  console.log(title);
  const body = {
    query: {
      match: {
        title: title,
      },
    },
  };
  const resp = await searchDoc("hello", 2, body);
  res.send(resp);
});

module.exports = router;
