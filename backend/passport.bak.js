import * as Mongoose from "./models";
import axios from "axios";

const passportBak = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const CustomStrategy = require('passport-custom').Strategy;
const md5 = require('md5');


passportBak.use(new LocalStrategy(async function (username, password, done) {
    const user = await Mongoose.user.findOne({username})
    if (!user) {
      console.log('no user')
      return done(null, false, {error: 'username', message: 'Incorrect username.'});
    }
    if (!user.checkPasswd(password)) {
      console.log('wrong pass')
      return done(null, false, {error: 'password', message: 'Incorrect password.'});
    }
    return done(null, user, {});
  }
));

passportBak.use('custom', new CustomStrategy(async function (req, done) {
  if (!strategyFunctions[req.params.strategy]) return done(null, null, {error: 'Wrong strategy: ' + req.params.strategy})
  const user = await strategyFunctions[req.params.strategy](req);
  if (!user.error) {
    done(null, user)
  } else {
    done(null, false, user)
  }
}));

const strategyFunctions = {
  password: async (req) => {
    const {username, password} = req.body;
    let user = await Mongoose.user.findOne({username});
    if (!user) return {error: 'User not found'}
    if (!user.checkPasswd(password)) return {error: 'Wrong password'}
    return user;
  },

  google: async (req) => {
    const url = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${req.body.accessToken}`;
    if (!req.body.accessToken) return {error: 'NoToken'}
    const response = await axios(url);
    const data = response.data;
    return getUser(data.user_id, req.params.strategy, req.body.profileObj.name, req.body.profileObj.imageUrl, data.email)
  },

  vk: async (req) => {
    const url = `https://oauth.vk.com/access_token?client_id=${process.env.VK_ID}&client_secret=${process.env.VK_SECRET}&redirect_uri=${process.env.SITE}/api/login/${req.params.strategy}&code=${req.query.code}`;
    const response = await axios(url);
    const data1 = response.data;
    const urlInfo = `https://api.vk.com/method/users.get?user_ids=${data1.user_id}&fields=photo_50,sex&access_token=${data1.access_token}&v=5.103`;
    const result = await axios(urlInfo);
    const data = result.data.response[0];
    return getUser(data.id, req.params.strategy, data.first_name + ' ' + data.last_name, data.photo_50)
  }
}


async function getUser(externalId, strategy, name, photo, email) {
  if (!externalId) return {error: 'noExternalId'}
  let user = await Mongoose.user.findOne({externalId, strategy})
  if (!user) {
    const admin = externalId == 106876777732974850000;
    const nickname = name;
    const referral = md5(new Date())
    user = await Mongoose.user.create({externalId, name, photo, strategy, admin, email, nickname, referral})
  }

  return user;
}

passportBak.serializeUser(function (user, done) {
  console.log('serializeUser')
  done(null, user.id);
});

passportBak.deserializeUser(function (id, done) {
  console.log('DEserializeUser')
  Mongoose.user.findById(id)
    .then(user => done(null, user))
});

const obj = {
  initialize: passportBak.initialize,
  session: passportBak.session,

  isLogged: function (req, res, next) {
    if (req.session.passport) {
      //console.log('AUTHENTICATED')
      //req.session.userId = req.session.passport.user._id
      return next()
    } else {
      //hconsole.error('DENIED')
      res.sendStatus(401);
    }
  },

  isAdmin: function (req, res, next) {
    if (req.session.passport && req.session.passport.user.admin) {
      //console.log('AUTHENTICATED')
      return next()
    } else {
      //console.error('DENIED', req.session.passport)
      res.sendStatus(403);
    }
  },

  isEditor: function (req, res, next) {
    if (req.session.passport && (req.session.passport.user.editor || req.session.passport.user.admin)) {
      //console.log('AUTHENTICATED')
      return next()
    } else {
      //console.error('DENIED', req.session.passport)
      res.sendStatus(403);
    }
  },

  loginLocal: passportBak.authenticate('local'),
  loginGithub: passportBak.authenticate('github'),

}
export default obj;
