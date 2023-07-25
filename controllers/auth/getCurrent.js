const getCurrent = async (req, res) => {
  const { firstName, lastName, email, phone } = req.user;

  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        firstName,
        lastName,
        email,
        phone,
      },
    },
  });
};

module.exports = getCurrent;
