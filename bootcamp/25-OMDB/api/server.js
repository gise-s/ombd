// server configs
const express = require("express");
const helmet = require("helmet");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const path = require("path");
const app = express();

const User = require("./models/User");

app.use(helmet());

// Express Route File Requires
const authAPI = require("./routes");
const { noTrueLogging } = require("sequelize/lib/utils/deprecations");

app.use(express.static(path.resolve(__dirname, "./src/public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  sessions({
    secret: "bootcamp",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    function (username, password, done) {
      User.findOne({ where: { username } })
        .then((user) => {
          if (!user) {
            // email not found
            return done(null, false);
          }

          user.hash(password, user.salt).then((hash) => {
            if (hash !== user.password) {
              return done(null, false); // wrong password
            }

            return done(null, user); // success :D
          });
        })
        .catch(done); // done(err)
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch(done);
});

// Express Routing
app.use("/api", authAPI);
/*app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./src/public", "index.html"));
});*/

User.sync({ force: false }).then(() => {
  http.createServer(app).listen(3001, () => {
    console.log(`Server listening at port 3001`);
  });
});