import * as Mongoose from "./models";
const tokenName =  'authorization';
const passport = {
  tokenName,
  isLogged: async function (req, res, next) {
    if (req.headers[tokenName]) {
      const found = await Mongoose.token.findOne({uid: req.headers[tokenName]}).populate('user');
      if (!found) return res.status(401).send({message: 'no-token-found'});
      res.locals.user = found.user;
      return next()
    } else {
      return res.status(401).send({message: 'no-token-send'})
    }
  },

  authenticate: async (req, res) => {
    let user;
    const {strategy} = req.body;
    if (strategy === 'google') {
      user = await this.default.googleStrategy(req);
    } else {
      user = await this.default.passwordStrategy(req);
    }
    if (!user) return res.status(401).send({message: 'wrong-strategy'});
    if (user.error) return res.status(401).send(user);
    const {uid} = await this.default.getToken(user);
    res.send(user.publicData({uid}));
  },

  getToken: async (user) => {
    return Mongoose.token.create({user, uid: Math.random()})
  },

  passwordStrategy: async (req) => {
    const {username, password} = req.body;
    let user = await Mongoose.user.findOne({username});
    if (!user) return ({error: 401, message: 'no-user'});
    if (!user.checkPasswd(password)) return ({error: 401, message: 'wrong-pass'});
    return user;
  },

  googleStrategy: async (req) => {
    const {yu} = req.body;
    if(!yu && yu.DW) return {error: 401, message: 'no-google-data'}
    let user = await Mongoose.user.findOne({username: yu.DW})
    if (!user) {
      user = new Mongoose.user({
        username: yu.DW,
        email: yu.nv,
        avatar: yu.nN,
        name: yu.nf
      })
    }else{
      user.name = yu.nf;
      user.avatar = yu.nN;
    }
    console.log(user)
    await user.save();
    return user;
  },

}

export default passport;
