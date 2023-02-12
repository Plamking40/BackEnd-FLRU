let express = require("express"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  dbConfig = require("./database/db");
path = require("path");
const moment = require("moment");
require("dotenv").config();

// Express Route
const userRoutes = require("./routes/users.route");
const questionRoute = require("./routes/question.route");
const questsRoute = require("./routes/quests.route");
const levelsRoute = require("./routes/levels.route");
const rankcomparesRoute = require("./routes/rankcompares.rote");
const coursesRoute = require("./routes/courses.route");
const QuizHistoryRoutes = require("./routes/QuizHistory.route");

// Connecting MongDB Database
const {
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_DEFAULT,
  MONGODB_DATABASE,
} = process.env;

// mongoose.Promise = global.Promise;
mongoose
  .connect(
    `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_DEFAULT}/${MONGODB_DATABASE}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(
    () => {
      console.log("Database successfully connected");
    },
    (error) => {
      console.log("Could not connect to database: " + error);
    }
  );

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use("/users", userRoutes);
app.use("/question", questionRoute);
app.use("/quests", questsRoute);
app.use("/levels", levelsRoute);
app.use("/rankcompares", rankcomparesRoute);
app.use("/courses", coursesRoute);
app.use("/QuizHistory", QuizHistoryRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
  });
}

// PORT
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get("host")}${req.originalUrl}: ${moment().format(
      "MMMM Do YYYY, h:mm:ss a"
    )}`
  );
  next();
};

app.use(logger);
