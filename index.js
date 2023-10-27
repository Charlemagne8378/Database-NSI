const express = require("express");
const fs = require('fs');
const bodyParser = require("body-parser");
const mysql = require('mysql');
const util = require('util');

//Configuration express
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

let con;

//Configuration de la Database
function connect() {
    con = mysql.createConnection({
        host: "51.178.50.24",
        port: "55555",
        user: "app",
        password: "725hs",
        multipleStatements: true
    });
}
connect();

const query = util.promisify(con.query).bind(con);


app.use(express.static('./public'));

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(3000);

app.get("/", async function (request, response) {
    query("use nsi;SELECT * FROM (Societes,BoiteAuxLettres);SELECT * FROM (Locaux);SELECT * FROM (Assurances);", (err, rows) => {
        if (err) throw err;
        response.render("index", {data: rows[1], locaux: rows[2], assurances: rows[3]});
    });
});
