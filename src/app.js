const express = require("express");
const pdf = require("pdf-puppeteer");

const app = express();
const port = 8888;

app.use(express.json());
app.use(express.text({ type: "text/html" }));

app.all(/.*/, function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, access-token"
  );

  // debug output
  console.log("method :", req.method, "url :", req.originalUrl);
  next();
});

app.get("/test", function (req, res) {
  console.log("Test endpoint hit");
  res.send("OK");
});

app.use("/api/v1/generate-receipt", function (request, response) {
  console.log(`Generating receipt`);

  const options = {
    printBackground: true,
    displayHeaderFooter: true,
    format: "A4",
  };

  pdf(
    request.body,
    async (data) => {
      console.log("PDF sent");
      response.set("Content-Type", "application/json");
      return response.send(JSON.stringify(data));
    },
    options,
    { args: ["--no-sandbox", "--disable-setuid-sandbox"] }
  );
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
