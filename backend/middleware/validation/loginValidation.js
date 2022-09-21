const Yup = require('yup');

const catchAsync = require('../../utils/catchAsync');

const loginSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Format d'email invalide")
    .required('Adresse email requise'),
  password: Yup.string().trim().required('Mot de passe requis'),
});

exports.loginValidation = catchAsync(async (req, res, next) => {
  const value = await loginSchema.validate(
    { ...req.body },
    { abortEarly: false, stripUnknown: true }
  );
  req.body = value;
  next();
});
