const { basedir } = global;

const { User } = require(`${basedir}/models`);

const findUser = (query) => User.findOne(query);

const createUser = (body) => User.create(body);

const updateUser = (id, body) =>
  User.findByIdAndUpdate(id, body, { new: true });

module.exports = {
  findUser,
  createUser,
  updateUser,
};
