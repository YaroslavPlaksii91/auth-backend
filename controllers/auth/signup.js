const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { basedir } = global;

const { joiRegisterSchema } = require(`${basedir}/models`);
const { user: service } = require(`${basedir}/services`);
const { createError } = require(`${basedir}/helpers`);

const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const { error } = joiRegisterSchema.validate(req.body);

  if (error) {
    throw createError(400, error.message);
  }

  const { email, password } = req.body;
  const user = await service.findUser({ email });

  if (user) {
    throw createError(409, `User with ${email} already exist`);
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await service.createUser({
    ...req.body,
    password: hashPassword,
  });

  const payload = {
    id: result._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      token,
      user: {
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        phone: result.phone,
      },
    },
  });
};

module.exports = signup;
