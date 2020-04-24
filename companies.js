const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://kchin06:abcdefg@cluster0-snuu3.mongodb.net/test?retryWrites=true&w=majority";
var fastcsv = require("fast-csv");
var fs = require("fs");

let readStream = fs.createReadStream("companies.csv");
let companyData = [];
let csvStream = fastcsv.parse().on("data", function(data) {
    companyData.push({
      company: data[0],
      ticker: data[1]
    });
  })
  .on("end", function() {
    // remove the headings
    companyData.shift();
    console.log(companyData);

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) throw err;

      client.db("companies").collection("companies").insertMany(companyData, (err, res) => {
        if (err) throw err;
        console.log(`Data is inserted.`);
      client.close();
        });
      }
    );
  });

readStream.pipe(csvStream);
