const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { basedir } = global;

const { joiAuthSchema } = require(`${basedir}/models`);
const { user: service } = require(`${basedir}/services`);
const { createError } = require(`${basedir}/helpers`);

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { error } = joiAuthSchema.validate(req.body);

  if (error) {
    throw createError(400, error.message);
  }

  const { email, password } = req.body;
  const user = await service.findUser({ email });
  const comparePassword = await bcrypt.compare(password, user.password);

  if (!user || !comparePassword) {
    throw createError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  await service.updateUser(user._id, { token });

  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
    },
  });
};

module.exports = login;
