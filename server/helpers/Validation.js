const joi = require('@hapi/joi');
const XRegExp = require('xregexp');
const registrationValidation = (data) => {
  const schema = joi
    .object({
      name: joi
        .string()
        .pattern(new XRegExp('^[\\p{L}\\d]+(?:\\s[\\p{L}\\d]+)*$'))
        .min(3)
        .required(),
      email: joi
        .string()
        .min(6)
        .required()
        .email(),
      phone: joi
        .number()
        .min(8)
        .required(),

      password: joi
        .string()
        .required()
        .pattern(new RegExp('^[A-Za-z0-9]{3,30}$')),
      rePassword: joi.ref('password'),
      birthDate: joi.date().required(),
    })
    .with('password', 'rePassword');

  return schema.validate(data);
};

/**
 *  currentPass: currentPass.password,
        newPass: newPass.password,
        reNewPass: reNewPass.password,
 * 
 */

const changePasswordValidation = (data) => {
  const schema = joi
    .object({
      currentPass: joi
        .string()
        .required()
        .pattern(new RegExp('^[A-Za-z0-9]{3,30}$')),
      newPass: joi
        .string()
        .required()
        .pattern(new RegExp('^[A-Za-z0-9]{3,30}$')),
      reNewPass: joi.ref('newPass'),
    })
    .with('newPass', 'reNewPass');

  return schema.validate(data);
};

const emilValidation = (data) => {
  const schema = joi.object({
    email: joi
      .string()
      .required()
      .email(),
  });

  return schema.validate(data);
};

const logInValidation = (data) => {
  const schema = joi.object({
    email: joi
      .string()
      .min(6)
      .required()
      .email(),
    password: joi
      .string()
      .required()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  });
  return schema.validate(data);
};

const V4UUIDValidation = (uuid) => {
  const uuidV4Regex = /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i;
  return uuidV4Regex.test(uuid);
};

const updateProfileValidation = (data) => {
  const schema = joi.object({
    user_name: joi
      .string()
      .pattern(new XRegExp('^[\\p{L}\\d]+(?:\\s[\\p{L}\\d]+)*$'))
      .min(3)
      .required(),
    email: joi
      .string()
      .min(6)
      .required()
      .email(),
    phone: joi
      .number()
      .min(8)
      .required(),

    birth_date: joi.date().required(),
    university: joi.string().optional(),
    address: joi.string().optional(),
    profession: joi.string().optional(),
  });

  return schema.validate(data);
};

const newmemberValidation = (data) => {
  const schema = joi.object({
    name: joi
      .string()
      .pattern(new XRegExp('^[\\p{L}\\d]+(?:\\s[\\p{L}\\d]+)*$'))
      .min(3)
      .required(),
    email: joi
      .string()
      .min(6)
      .required()
      .email(),
    phone: joi
      .number()
      .min(8)
      .required(),
    eventID: joi.string().optional(),
    changePass: joi.boolean().required(),

    password: joi
      .string()
      .required()
      .pattern(new RegExp('^[A-Za-z0-9]{3,30}$')),

    birthDate: joi.date().required(),
  });

  return schema.validate(data);
};
module.exports = {
  registrationValidation,
  logInValidation,
  V4UUIDValidation,
  emilValidation,
  newmemberValidation,
  changePasswordValidation,
  updateProfileValidation,
};
