const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000; // Change this if needed

function writeOutput(data) {
  const jsonData = JSON.stringify(data, null, 2);
  const outputPath = path.join(__dirname, "output", "output.json");

  fs.writeFile(outputPath, jsonData, (err) => {
    if (err) {
      console.error("Error creating JSON file:", err);
      return;
    }
    console.log("JSON file created successfully!");
  });
}

app.use(express.json());

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "index.html");
  res.sendFile(filePath);
});

app.post("/write-file", (req, res) => {
  const data = req.body.data;
  writeOutput(data);
  res.send("File write request received");
});

app.use(express.static(path.join(__dirname)));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
