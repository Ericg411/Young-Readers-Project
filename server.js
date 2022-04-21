const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const QuestionSchema = require("./Question");
const dotenv = require("dotenv") 
dotenv.config()


//create initial connection to database
mongoose.connect(
  `mongodb+srv://${process.env.USER}:${process.env.PASS}@youngreadersliteracy.rzuv5.mongodb.net/youngreadersliteracy?retryWrites=true&w=majority`,
  { useNewUrlParser: true },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded!");
    } else {
      console.log(`Error in DB connection: ${err}`);
    }
  }
);

//initialize a database through a connection constructor and store in a variable
const db = mongoose.connection;

//bring in error handling for database connection
db.on("error", console.error.bind(console, "connection error"));

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const jwt = require("jsonwebtoken");
const { json } = require("express/lib/response");

process.env.USERFRONT_JWT_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAsIneflhoq55pOkzwzMHg
ZsX7SIirDyBZcV/IASteUJf/377ZaidTVNu5W5wQm7fUw1FOTwX7T0dgqM3hl8vt
KM8WpeeDo7OLr/msqTLTcv+RiqeQhXh6KFdA4wdL/SA8pl+Q83Ybb77lm98SsBRd
7heijFIVgnD4EZ57SFAjHxlGREPIbxlvxDGhlJtCulmNjgYJOCn+7+zUDiFyx+VY
c5te+ODLeTBAxvQ5lVxBdBvmt4OAGGIZ7SIbg1uRQALYoZjqn3FU7nDyL3/Z2p0x
1mdyaReS3amFFU+z/xy6cmjXdhL2xMlKOW79LHfIFzdOFiiqZpM3rM2i4ndYxBZT
DewY//TO/GCFMKRJ3knK12UwVS10x2buHnBh1QpxM9z6PrnvgVv7c1Wi/QWS1cVs
9bZyLBvRWdyibzsdXwIDqGPRlKR8c7GMkt8pH2jD65i8vj6RnpIfDF0HT66s/5Si
a2NQLHVdddgd+2Jk8e2j9omHG/s65xuJdtqXYxSW1Y5VJ0djdCn3mCf7KusL41Oo
pPtoBlWwSOEaeA5wGruj0BKO5FDRQ1tHfVgzvdEWG6ARBRhrz+IbUBkB5YSAZUgP
nWULmFER87KKetENnhi4tTWlPZ6K4uui5qeGlFp8yzc5pnRnvXqXV2wmNbWTPBbZ
lFAtd9rDqGIXhHoNgv2fAkMCAwEAAQ==
-----END PUBLIC KEY-----`;

app.get("/admin", (req, res) => {
  try {
    const accessToken = req.headers.authorization.replace("Bearer ", "");

    const verifiedPayload = jwt.verify(
      accessToken,
      process.env.USERFRONT_JWT_PUBLIC_KEY,
      { algorithms: ["RS256"] }
    );

    const roles = verifiedPayload.authorization["xbpm8jmn"].roles;
    if (!roles.includes("admin")) {
      throw new Error("Unauthorized");
    }

    res.send({
      data: `Data for admin only. Requestor has roles: ${roles.join(" & ")}.`,
    });
  } catch (error) {
    res.status(401).send({
      message: "Unauthorized",
      status: 401,
    });
  }
});

app.get("/users", (req, res) => {
  try {
    const accessToken = req.headers.authorization.replace("Bearer ", "");

    const verifiedPayload = jwt.verify(
      accessToken,
      process.env.USERFRONT_JWT_PUBLIC_KEY,
      { algorithms: ["RS256"] }
    );

    res.send({
      data: `Data specific to user ${verifiedPayload.userId} (${verifiedPayload.userUuid}).`,
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(401).send({
      message: "Unauthorized",
      status: 401,
    });
  }
});

// function authenticateToken(req, res, next) {
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1];
//     if (token == null) return res.sendStatus(401);

//     jwt.verify(token, process.env.USERFRONT_PUBLIC_KEY, (err, auth) => {
//         if (err) return res.sendStatus(403);
//         req.auth = auth;
//         next()
//         console.log(req.auth)
//     })
// }

app.listen(port, () => {
  console.log("Now listening on http://localhost:" + port);
});

//Erics server section

//create a model for the database entries
const Question = mongoose.model("questions", QuestionSchema);

//get all questions
app.get('/', async (req, res) => {
  let allQuestions = await Question.find({})
  res.json(allQuestions)
})

//create functionality
app.post("/create", async (req, res) => {
  const newQuestion = new Question({
    userName: req.body.userName,
    bookTitle: req.body.bookTitle,
    userAnswer: req.body.userAnswer,
    userAnswer2: req.body.userAnswer2,
    userAnswer3: req.body.userAnswer3,
    date: Date(),
    teacherAnswer: null,
  });
  await newQuestion.save();

  res.redirect("http://localhost:3000/");
});

//update functionality for teacher page
app.post("/update", async (req, res) => {
  // let allQuestions = Question.find({});
  await Question.updateOne(
    { userAnswer: req.body.userAnswer },
    { $set: { teacherAnswer: req.body.teacherAnswer } }
  );
  res.redirect("http://localhost:3000/");
});
