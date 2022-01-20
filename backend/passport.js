import * as Mongoose from "./models";
const tokenName = 'authorization';
export default {
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
}

