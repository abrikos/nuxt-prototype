import * as Mongoose from '../models';

export default function UserController(app) {
  function isLogged(req, res, next) {
    if (req.session.uid) {
      return next()
    } else {
      res.sendStatus(401);
    }
  }

  app.get('/api/auth', async (req, res) => {
    console.log(req.session)
    if (!req.session.uid) return res.status(401).send({message: 'Not logged. No user'})
    Mongoose.user.findById(req.session.uid)
      .then(user => {
        if (!user) return res.status(401).send({message: 'Wrong authenticated user '})
        console.log(user.public.name)
        res.send(user.public)
      })
      .catch(error => res.send({error: 500, message: error.message}))
  });

  app.post('/api/login/google', async (req, res) => {
    const {yu} = req.body;
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
      res.send(user.public);
    }catch(e){
      res.status(500).send({message: e.message})
    }
  });

  app.get('/api/logout', isLogged, (req, res) => {
    req.session.uid = {};
    res.sendStatus(200);
  });

  app.get('/api/user/:id/view', isLogged, (req, res) => {
    Mongoose.user.findById(req.params.id)
      .select('username email')
      .then(model => res.send(model))
      .catch(error => {
        res.status(500).send({message: error.message})
      })
  });

  app.post('/api/user/:id/update', isLogged, (req, res) => {
    Mongoose.user.findById(req.params.id)
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

  app.get('/api/user/list', isLogged, (req, res) => {
    Mongoose.user.find()
      .select('username email createdAt')
      .then(list => res.send(list))
      .catch(error => {
        res.status(500).send({message: error.message})
      })
  });

  app.post('/api/password/change', isLogged, (req, res) => {
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

  app.post('/api/email/change', isLogged, (req, res) => {
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

  app.post('/api/signup', async (req, res) => {
    const {username, password, passwordConfirm, email} = req.body;
    if (!username) return res.status(412).send({message: 'Необходимо указать username!'})
    if (!email) return res.status(412).send({message: 'Необходимо указать email!'})
    if (!password) return res.status(412).send({message: 'Необходимо указать пароль!'})
    if (passwordConfirm !== password) return res.status(412).send({message: 'Пароли не совпадают'})
    try {
      let user = await Mongoose.user.findOne({$or: [{username}, {email}]})
      if (user && user.username === username) return res.status(422).send({message: 'Такой пользователь уже зарегистрирован'});
      if (user && user.email === email) return res.status(422).send({message: 'Такой email уже зарегистрирован'});
      user = new Mongoose.user({username, email});
      user.setPasswd(password);
      await user.save()
      res.sendStatus(200)

    } catch (error) {
      console.log(error)
      res.status(500).send({message: error.message})
    }

  });
}
