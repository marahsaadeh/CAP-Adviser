const express = require("express");
const mongoose = require("mongoose");
const sessionMiddleware = require("./sessionMiddleware");
require("dotenv").config();


const app = express();

app.set("view engine", "ejs");

const uri = process.env.DATA_URL;

const stageRoutes = require("./routes/stages");
const startpageRoutes = require("./routes/startpage");
const loginRoutes = require("./routes/login");
const successRoutes = require("./routes/success");
const registerationRoutes = require("./routes/registeration");
const stage1Routes = require("./routes/stage1");
const apiRouter = require("./api");
const profilePage = require("./routes/profileRouter");
const userGradeRoutes = require("./routes/usergradep");
const markRoutes = require("./routes/mark");
const s1ResultRoutes = require("./routes/stage1Result");
const s2ResultRoutes = require("./routes/stage2Result");
const googleAuthRoutes = require("./routes/googleAuth");
const stage2Routes = require("./routes/stage2");

app.use("/api", apiRouter);
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(sessionMiddleware.sessionMiddleware);

const { isUserSignedIn } = require("./sessionMiddleware");

app.use("/stageSelect", stageRoutes);
app.use("/login", loginRoutes);
app.use("/stage1",isUserSignedIn, stage1Routes);
app.use("/success",isUserSignedIn, successRoutes);
app.use("/profile",isUserSignedIn, profilePage);
app.use("/api", apiRouter);
app.use("/registeration", registerationRoutes);
app.use("/plan",isUserSignedIn, userGradeRoutes);
app.use("/marks",isUserSignedIn, markRoutes);
app.use("/stage1Result",isUserSignedIn, s1ResultRoutes);
app.use("/stage2Result",isUserSignedIn, s2ResultRoutes);
app.use("/stage2",isUserSignedIn, stage2Routes);
app.use("/auth/google", googleAuthRoutes);
app.use("/", startpageRoutes);

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("connected to mongodb server");
  } catch (error) {
    console.log(error);
  }
}
connect();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.
http://localhost:${PORT}`);
});
