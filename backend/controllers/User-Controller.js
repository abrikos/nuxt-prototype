import * as Mongoose from '../models';
import passport from '../passport';

export default function UserController(app) {

  app.post('/api/auth/token', async (req, res) => {
    const token = req.headers[passport.tokenName];
    if (!token) return res.status(401).send({message: 'no-token-send'});
    const found = await Mongoose.token.findOne({uid: token}).populate('user');
    if (!found) return res.status(401).send({message: 'no-token-found'});
    res.send(found.user.publicData());
  });

  app.post('/api/auth/login', passport.authenticate);

  app.post('/api/auth/signup', async (req, res) => {
    const {username, password, passwordConfirm, email} = req.body;
    if (!username) return res.status(412).send({message: 'Необходимо указать username!'})
    // if (!email) return res.status(412).send({message: 'Необходимо указать email!'})
    if (!password) return res.status(412).send({message: 'Необходимо указать пароль!'})
    if (passwordConfirm !== password) return res.status(412).send({message: 'Пароли не совпадают'})
    try {
      let user = await Mongoose.user.findOne({$or: [{username}, {email}]})
      if (user && user.username === username) return res.status(422).send({message: 'Такой пользователь уже зарегистрирован'});
      if (user && user.email === email) return res.status(422).send({message: 'Такой email уже зарегистрирован'});
      user = new Mongoose.user({username, email});
      console.log('------------', user)
      user.setPasswd(password);
      await user.save()
      res.sendStatus(200)
    } catch (error) {
      console.log(error)
      res.status(500).send({message: error.message})
    }

  });

  app.post('/api/user/update', passport.isLogged, (req, res) => {
    Mongoose.user.findById(res.locals.user.id)
      .then(model => {
        const {password, ...rest} = req.body;
        for (const field in rest) {
          model[field] = req.body[field];
        }
        if (password) {
          model.setPasswd(password);
        }
        res.sendStatus(200)
      })
      .catch(error => {
        res.status(500).send({message: error.message})
      })
  });







  app.get('/api/auth', async (req, res) => {
    if (!req.session.uid) return res.status(401).send({message: 'Not logged. No user'})
    Mongoose.user.findById(req.session.uid)
      .then(user => {
        if (!user) return res.status(401).send({message: 'Wrong authenticated user '})
        res.send(user.public)
      })
      .catch(error => res.send({error: 500, message: error.message}))
  });

  app.post('/api/login', async (req, res) => {
    const {strategy, data} = req.body;
    console.log('zzz', strategy);
    if(strategy === 'google'){
      const {yu} = data;
      if(!yu && yu.DW) return res.sendStatus(401)
      try {
        let user = await Mongoose.user.findOne({username: yu.DW})
        if (!user) {
          user = new Mongoose.user({
            username: yu.DW,
            email: yu.nv,
            avatar: yu.nN,
            name: yu.nf
          })
          await user.save();
        }
        req.session.uid = user.id;
        console.log(user.public);
        res.send(user.public);
      }catch(e){
        res.status(500).send({message: e.message})
      }
    } else {

    }
  });

  app.post('/api/password/change', passport.isLogged, (req, res) => {
    const {password, passwordConfirm} = req.body;
    if (!password) return res.status(412).send({message: 'Необходимо указать пароль!'})
    if (passwordConfirm !== password) return res.status(412).send({message: 'Пароли не совпадают'})
    Mongoose.user.findById(req.session.uid.user.id)
      .then(user => {
        user.setPasswd(password);
        user.save();
        res.sendStatus(200);
      })
      .catch(error => {
        res.status(500).send({message: error.message})
      })
  });

  app.post('/api/email/change', passport.isLogged, (req, res) => {
    const {email} = req.body;
    if (!email) return res.status(412).send({message: 'Необходимо указать Email!'})
    Mongoose.user.findById(req.session.uid.user.id)
      .then(user => {
        user.email = email;
        user.save();
        res.sendStatus(200);
      })
      .catch(error => {
        res.status(500).send({message: error.message})
      })
  });

}
