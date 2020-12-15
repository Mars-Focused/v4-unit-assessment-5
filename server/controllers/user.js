const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { id, username, password, profile_pic } = req.body;

    const [existingUser] = await db.get_user_by_email([email]);

    if (existingUser) {
      return res.status(409).send("User already exists");
    }

    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(password, salt);

    const [newUser] = await db.register_user([id, username, hash, admin]);

    req.session.user = newUser;

    res.status(200).send(newUser);
  },
};
