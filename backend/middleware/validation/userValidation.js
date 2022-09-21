const Yup = require('yup');

const catchAsync = require('../../utils/catchAsync');

const { namePattern } = require('../../utils/regexValidation');

const userSchema = Yup.object({
  firstname: Yup.string()
    .trim()
    .matches(namePattern, 'Prénom invalide')
    .required('Veuillez renseigner votre prénom'),
  lastname: Yup.string()
    .trim()
    .matches(namePattern, 'Nom invalide')
    .required('Veuillez renseigner votre nom'),
  bio: Yup.string()
    .trim()
    .max(500, 'Votre bio doit contenir moins de 500 caractères.'),
  linkedinProfile: Yup.string().trim().url('Url invalide'),
  twitterProfile: Yup.string().trim().url('Url invalide'),
  facebookProfile: Yup.string().trim().url('Url invalide'),
  instagramProfile: Yup.string().trim().url('Url invalide'),
});

exports.userValidation = catchAsync(async (req, res, next) => {
  const dataToValidate = req.body;
  const value = await userSchema.validate(
    { ...dataToValidate },
    { abortEarly: false, stripUnknown: true }
  );

  req.body = value;
  next();
});
