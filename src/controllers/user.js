const { userService } = require('../services');

class Controller {
  create = async ( req, res ) => {
    const newUser = req.body;
    const user = await userService.create(newUser);

    if (!user) {
      return res.status(400).send('User with this email already exists');
    }

    return res.status(200).send(user);
  };
  get = async ( req, res ) => {
    const users = await userService.get();

    return res.status(200).send(users);
  };
  update = async ( req, res ) => {
    const { userId } = req.params;
    const newUser = req.body;
    const user = await userService.update(userId, newUser);

    return res.status(201).send(user);
  };
  delete = async ( req, res ) => {
    const { userId } = req.params;
    await userService.delete(userId);

    return res.status(200).send();
  };
  authenticate = async ( req, res ) => {
    const authData = req.body;

    const token = await userService.authenticate(authData);
    if (token) {
      return res.status(200).send(token);
    }

    return res.status(403).send('Invalid password or email');
  };
}

const userController = new Controller();

module.exports = { userController };
