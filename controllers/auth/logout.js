const { basedir } = global;

const { user: service } = require(`${basedir}/services`);

const logout = async (req, res) => {
  const { id } = req.user;

  await service.updateUser(id, { token: null });

  res.status(204).json();
};

module.exports = logout;
