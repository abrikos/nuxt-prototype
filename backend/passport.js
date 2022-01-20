import * as Mongoose from "./models";

export default {
  isLogged: async function (req, res, next) {
    if (req.headers.authorisation) {
      const found = await Mongoose.token.findOne({uid: req.headers.authorisation}).populate('user');
      if (!found) return res.status(401).send({message: 'no-token-found'});
      res.locals.user = found.user;
      return next()
    } else {
      return res.status(401).send({message: 'no-token-send'})
    }
  },
}

