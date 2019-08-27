module.exports = function (config, app) {
    //the openID SSO stuff here
    var express = require('express');
    var router = express.Router();
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var session = require('express-session');
    var passport = require('passport');
    router.use(cookieParser());
    router.use(bodyParser.json({limit: '5mb'}) );       // to support JSON-encoded bodies
    router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        limit: '5mb',
        extended: true,
        parameterLimit:50000
    }));
    router.use(cookieParser());
    router.use(session({resave: 'true', saveUninitialized: 'true' , secret: 'Marks little secret'}));
    router.use(passport.initialize());
    router.use(passport.session()); 

    passport.serializeUser(function(user, done) {
            done(null, user);
    }); 

    passport.deserializeUser(function(obj, done) {
            done(null, obj);
    });         

    var OpenIDConnectStrategy = require('passport-idaas-openidconnect').IDaaSOIDCStrategy;
    var Strategy = new OpenIDConnectStrategy({
            authorizationURL : config.sso.authorization_url,
            tokenURL : config.sso.token_url,
            clientID : config.sso.client_id,
            scope: 'openid',
            response_type: 'code',
            clientSecret : config.sso.client_secret,
            callbackURL : config.sso.callback_url,
            skipUserProfile: true,
            issuer: config.sso.issuer_id}, 
            function(iss, sub, profile, accessToken, refreshToken, params, done)  {
                    process.nextTick(function() {
                            profile.accessToken = accessToken;
                            profile.refreshToken = refreshToken;
                            done(null, profile);
                    });
            }); 

    passport.use(Strategy); 

    // used to submit authentication request 
    router.get('/', passport.authenticate('openidconnect', {})); 

    function ensureAuthenticated(req, res, next) {
        console.log('/ensureAuthenticated ----- HIT -----');
        if (!req.isAuthenticated()) {
            req.session.originalUrl = req.originalUrl;
            res.redirect('/');
        } else {
            return next();
        }
    };


    // handle callback, if authentication succeeds redirect to
    // original requested url, otherwise go to /failure
    router.get('/login',function(req, res, next) {
        console.log('****** LOGIN HIT! *****');
        passport.authenticate('openidconnect', {
            successRedirect: '/sso/loginPass',
            failureRedirect: '/sso/loginFailure',
        })(req,res,next);
    });

    router.get('/loginPass', function(req, res) {
        console.log('****** loginPass HIT! *****');
        res.redirect('/loginSuccess');
    });
    router.get('/loginFailure', function(req, res) {
        console.log('****** loginFailure HIT! *****');
        res.redirect('/loginFailure');
    });
    router.get('/userParams', ensureAuthenticated, function(req, res) {
        console.log('/userParams ----- HIT -----');
        var claims = req.user['_json'];
        var result = {'email': claims.email, 'sessionId': req.sessionID};
        res.status(200).send(result);
    });
    router.get('/logout', ensureAuthenticated, function(req,res) {
        console.log('logout hit (sessionId): ' + req.sessionID);
        res.clearCookie("connect.sid"); 
        req.logout();   
        req.session.destroy(function() {
            res.status(200).send('LoggedOut');
        });
    });
    return router;
};