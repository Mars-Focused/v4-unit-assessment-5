module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { id, username, password, profile_pic } = req.body;

    const [existingUser] = await db.get_user_by_email([email]);

    if (existingUser) {
      return res.status(409).send("User already exists");
    }
  },
};
