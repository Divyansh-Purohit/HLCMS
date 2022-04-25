const express = require("express");
const app = express();
const path = require("path");

const connectDB = require("./config/db");

connectDB();

app.use(express.json({ extended: false }));

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/user", require("./routes/api/user"));

if (process.env.NODE_ENV === "production") {
  express.static(path.join("client", "build"));
}

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
