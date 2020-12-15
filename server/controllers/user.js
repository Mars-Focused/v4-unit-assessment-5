const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { id, username, password, profile_pic } = req.body;

    const [existingUser] = await db.get_user_by_email([email]);

    if (existingUser) {
      return res.status(409).send("User already exists");
    }
    /*
    The username and password should come from the req.body, and for the profile picture you can use `https://robohash.org/${username}.png`
    This is a website that provides randomized profile pictures of robots
    */
    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(password, salt);

    const [newUser] = await db.register_user([id, username, hash, admin]);

    req.session.user = newUser;

    res.status(200).send(newUser);
  },

  login: async (req, res) => {
    const db = req.app.get("db");

    const { email, password } = req.body;

    const [existingUser] = await db.get_user_by_email([email]);

    if (!existingUser) {
      return res.status(404).send("incorrect password");
    }

    delete existingUser.hash;

    req.session.user = existingUser;

    res.status(200).send(existingUser);
  },
  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },
  getUser: (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user);
    } else {
      res.status(404).send("No session found");
    }
  },
};
