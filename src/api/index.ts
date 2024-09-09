const s: string = "hello world!";
console.log(s);


import fs from "fs";
import { Bitrix24 } from "node-bitrix24";
import mysql from "mysql2";

const bx24 = new Bitrix24(process.env.BITRIX24_HOOK);

// Excel file processing
const excelFilePath = "./tickets.xlsx"; // Replace with your Excel file path

// Assuming you have a library to read Excel files (e.g., xlsx)
// You'll need to install it: npm install xlsx
const workbook = require("xlsx").readFile(excelFilePath);
const worksheet = workbook.Sheets["Sheet1"]; // Replace with your sheet name

const excelTickets = Object.values(worksheet).filter((cell) => {
  return typeof cell.v === "string";
}).map((cell) => cell.v);

// MySQL database connection
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;

  let db = ''
  // Query to retrieve tickets from the database
  const sql = "SELECT * FROM `1c_b24` ORDER BY `b24_id` DESC";
  connection.query(sql, (err, results) => {
    if (err) throw err;

    const mysqlTickets = results.map((row) => row.1c_id);

    // Search tickets in Bitrix24
    const allTickets = [...excelTickets, ...mysqlTickets];
    allTickets.forEach((title) => {
      bx24.call("crm.deal.list", {
        filter: {
          "!ID": "1",
          "TITLE": title,
        },
        select: ["ID", "TITLE"],
      })
        .then((response) => {
          if (response.result.length > 0) {
            console.log(`Found ticket in Bitrix24: ${title}`);
            // Perform any actions you need based on the found ticket
          } else {
            console.log(`No ticket found in Bitrix24 for title: ${title}`);
            // Handle the case where the ticket is not found
          }
        })
        .catch((error) => {
          console.error(`Error searching tickets in Bitrix24: ${error}`);
        });
    });

    // Close the MySQL connection
    connection.end((err) => {
      if (err) throw err;
      console.log("MySQL connection closed.");
    });
  });
});


