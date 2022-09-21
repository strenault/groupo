const Yup = require('yup');

const catchAsync = require('../../utils/catchAsync');

const articleSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, 'Le titre doit contenir au moins 3 caractères')
    .max(50, 'Le titre doit contenir moins de 50 caractères')
    .required('Veuillez renseigner un titre'),
  content: Yup.string()
    .trim()
    .min(15, 'Le titre doit contenir au moins 15 caractères')
    .max(5000, 'Le titre doit contenir moins de 5000 caractères')
    .required('Veuillez renseigner du contenu pour votre article'),
});

exports.articleValidation = catchAsync(async (req, res, next) => {
  const dataToValidate = req.body;
  const value = await articleSchema.validate(
    { ...dataToValidate },
    { abortEarly: false, stripUnknown: true }
  );
  req.body = value;
  next();
});
