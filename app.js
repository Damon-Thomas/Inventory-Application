const express = require("express");
const app = express();
const path = require("node:path");
const appRouter = require("./routes/boardRouter")


const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use("/", appRouter)
app.use("/new", appRouter)
app.use("/update", appRouter)
app.use("/products", appRouter)

app.get("*",(req, res) => res.render("./errors/404.ejs") )

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
