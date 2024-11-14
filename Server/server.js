const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
require("dotenv").config();
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userdb = require("./models/User")

const clientsecret="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"
const clientid="1068077476790-8j1ecuqkdh7fpd3sdkld8hfetnk32ct4.apps.googleusercontent.com"

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}));
// setup session
app.use(session({
    secret:"23445dertrrysdfr2345edgh",
    resave:false,
    saveUninitialized:true
}))

// Connect to MongoDB
connectDB();
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy({
        clientID:clientid,
        clientSecret:clientsecret,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        try {
            let user = await userdb.findOne({googleId:profile.id});

            if(!user){
                user = new userdb({
                    googleId:profile.id,
                    displayName:profile.displayName,
                    email:profile.emails[0].value,
                    image:profile.photos[0].value
                });

                await user.save();
            }

            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    }
    )
)

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});

// initial google ouath login
app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:3000/dashboard",
    failureRedirect:"http://localhost:3000/login"
}))

app.get("/login/sucess",async(req,res)=>{

    if(req.user){
        res.status(200).json({message:"user Login",user:req.user})
    }else{
        res.status(400).json({message:"Not Authorized"})
    }
})
app.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect("http://localhost:3000");
    })
})

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes); // This ensures routes start with /api/auth

// Start serve
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
