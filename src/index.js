import express from "express"
import cors from "cors"
import session from "express-session"
import passport from "passport"

import passportConfig from "./passport/passport.js";
passportConfig(passport);

const app = express();

import { api } from "./routes/index.js"
import { client } from "./routes/client-routes.js";

app.use("/api", cors(), api);
app.use("/", cors(), client)

// Express session
app.use(session({
  secret: "keyboard cat",
  resave: true,
  saveUninitialized: true
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//LOGIN
app.post('/login', (req, res, next) => {
  passport.authenticate("local", {
  successRedirect: '/profile',
  failureRedirect:'/login',
})(req, res, next)
});

//LOGOUT
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

// tracking current user
let currentUser = "";

app.get('/api/currentuser', (req, res) => {
  if (req.user === undefined) {
    // The user is not logged in
    res.json({});
} else {
    // the user is logged in
    currentUser = req.user;
    res.json({
        userid: req.user
    });
}
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`))