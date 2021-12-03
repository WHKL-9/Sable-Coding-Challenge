const express = require("express"); // to create API endpoints
const dotenv = require("dotenv"); // reading the .env file
const cors = require("cors"); // accepting requests from the browser
dotenv.config();

const app = express(); // creates the server
app.use(cors()); // includes cors as a middleware for accepting requests from the browser
app.use(express.json()); // parse the body of the requests as a JSON when the content type is application/json

// Transactions example
// Assumption - transaction 2 is newer than transaction 1 - and so on and so forth
const virtualDB = [
  {
    TransactionID: 1,
    FromUser: "xyz1",
    ToUser: "ytd9",
    Amount: 70,
    Blocked: false,
    Approved: false,
    Resolved: false,
  },
  {
    TransactionID: 2,
    FromUser: "abc9",
    ToUser: "yxx9",
    Amount: 20,
    Blocked: false,
    Approved: false,
    Resolved: false,
  },
  {
    TransactionID: 3,
    FromUser: "xfc9",
    ToUser: "yzx9",
    Amount: 99,
    Blocked: false,
    Approved: false,
    Resolved: false,
  },
];

app.get("/", function (req, res) {
  //reply to the GET requests
  const nonResolvedTransactions = virtualDB.filter((t) => t.Resolved === false);
  function compare(a, b) {
    if (a.TransactionID < b.TransactionID) return 1;
    if (a.TransactionID > b.TransactionID) return -1;
    return 0;
  }
//   sort non-resolved transactions - from newest to oldest 
  const sortedTransaction = nonResolvedTransactions.sort(compare);
  res.send(sortedTransaction);
});

app.post("/", (req, res) => {
  virtualDB.push(req.body);
  res.send(virtualDB);
});

app.post("/:id/block", (req, res) => {
  const trans = virtualDB.find((t) => t.TransactionID == req.params.id);
  if (!trans) return res.status(404).send();
  // find by index, replace in array, return OK
  if (trans) {
    const targetIndex = virtualDB.findIndex(
      (t) => t.TransactionID == req.params.id
    );
    virtualDB[targetIndex] = {
      ...virtualDB[targetIndex],
      Resolved: true,
      Blocked: true,
    };
    res.status(204).send();
    console.log(virtualDB);
  }
});

app.post("/:id/approve", (req, res) => {
  const trans = virtualDB.find((t) => t.TransactionID == req.params.id);
  if (!trans) return res.status(404).send();
  if (trans) {
    const targetIndex = virtualDB.findIndex(
      (t) => t.TransactionID == req.params.id
    );
    virtualDB[targetIndex] = {
      ...virtualDB[targetIndex],
      Resolved: true,
      Approved: true,
    };
    res.status(204).send();
    console.log(virtualDB);
  }
});

app.listen(3001, () => console.log("server is running")); // starts the server on the specified PORT

module.exports = app;
