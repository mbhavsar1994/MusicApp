var express = require("express"); // use npm install express
var http = require("http");
const dao = require("./src/dao");
const bodyParser = require("body-parser");

module.exports = dao;

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

var cors = require("cors");

app.use(cors());

app.get("/playlists", function(req, res) {
  //connect db
  dao.connect();

  //query data from database

  dao.query("SELECT * FROM playlist ", [], result => {
    console.log(result.rows);

    // var json_users = JSON.stringify(result.rows);
    // console.log(json_users);

    res.status(200).json({ data: result.rows });
    dao.disconnect();
  });
});

app.get("/tracks/:playListID", function(req, res) {
  //connect db
  dao.connect();

  //query data from database

  dao.query(
    "SELECT * FROM track where playlist_id=$1 ",
    [req.params.playListID],
    result => {
      console.log(result.rows);

      // var json_users = JSON.stringify(result.rows);
      // console.log(json_users);

      res.status(200).json({ data: result.rows });
      dao.disconnect();
    }
  );
});

app.get("/tracks", function(req, res) {
  //connect db
  dao.connect();

  //query data from database

  dao.query("SELECT * FROM track ", [], result => {
    console.log(result.rows);

    // var json_users = JSON.stringify(result.rows);
    // console.log(json_users);

    res.status(200).json({ data: result.rows });
    dao.disconnect();
  });
});

2;
app.post("/track", function(req, res) {
  dao.connect();
  dao.query(
    "insert into track (playlist_id,title,uri,master_id)values($1,$2,$3,$4)",
    [req.body.playListID, req.body.title, req.body.uri, req.body.masterID],
    result => {
      console.log(result.rowCount);
      if (result.rowCount > 0) {
        res
          .status(200)
          .json({ data: "Track details Added successfully  to playlist" });
      } else {
        res.status(500).send("something went wrong");
      }
      dao.disconnect();
    }
  );
});

app.delete("/tracks/:trackId", function(req, res) {
  dao.connect();

  //query data from database
  console.log(req.params.id);
  dao.query("delete from track where id = $1", [req.params.trackId], result => {
    console.log(result);

    if (result.rowCount > 0) {
      res.status(200).json({ data: "Track Deleted SuccessFully!" });
    }

    dao.disconnect();
  });
});

app.listen(8000, function() {
  console.log("Example app listening on port 3000!");
});
