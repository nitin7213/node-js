const Express = require("express");
const app = Express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  console.log("Here");
  // res.send("HI"); //to print
  // res.sendStatus(500); //error code
  //res.status(500).json({ messge: "Error" });
  //res.json({ msg: "hi nitin" });
  //res.download("run.js"); // to download file
  res.render("index");
});

app.listen(8000, () => {
  console.log("http://localhost:8000");
});
