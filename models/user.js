const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
);

const joiRegisterSchema = Joi.object({
  firstName: Joi.string()
    .pattern(/^[а-яА-ЯїЇa-zA-Z]+$/)
    .min(2)
    .max(30)
    .required(),
  lastName: Joi.string()
    .pattern(/^[а-яА-ЯїЇa-zA-Z]+$/)
    .min(2)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().pattern(new RegExp("^\\+380\\d{9}$")).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).required(),
  repeatPassword: Joi.ref("password"),
});

const joiAuthSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiAuthSchema,
  joiRegisterSchema,
};
