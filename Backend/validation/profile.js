const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};


  data.phonenumber = !isEmpty(data.phonenumber) ? data.phonenumber : '';
  data.city = !isEmpty(data.city) ? data.city : '';
  data.gender = !isEmpty(data.gender) ? data.gender : '';
  data.country = !isEmpty(data.country) ? data.country : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  // data.languages = !isEmpty(data.languages) ? data.languages : '';
  data.about = !isEmpty(data.about) ? data.about : '';

  

  if (Validator.isEmpty(data.phonenumber)) {
    errors.phonenumber = 'Phone Number is required';
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = 'City field is required';
  }

  if (Validator.isEmpty(data.gender)) {
    errors.gender = 'Gender field is required';
  }

  if (Validator.isEmpty(data.country)) {
    errors.country = 'Country field is required';
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = 'Company field is required';
  }

  // if (Validator.isEmpty(data.languages)) {
  //   errors.languages = 'Languages field is required';
  // }

  if (Validator.isEmpty(data.about)) {
    errors.about = 'Bio field is required';
  }

  

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
