const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateHomeInput(data) {
  let errors = {};

  console.log(data);
  data.houseName = !isEmpty(data.houseName) ? data.houseName : '';
  data.houseLocation = !isEmpty(data.houseLocation) ? data.houseLocation : '';
  data.houseAvailableFrom = !isEmpty(data.houseAvailableFrom) ? data.houseAvailableFrom : '';
  data.houseAvailableTill = !isEmpty(data.houseAvailableTill) ? data.houseAvailableTill : '';
  data.houseArea = !isEmpty(data.houseArea) ? data.houseArea : '';
  data.houseImage = !isEmpty(data.houseImage) ? data.houseImage : '';
  data.guestCapacity = !isEmpty(data.guestCapacity) ? data.guestCapacity : '';
  data.houseDescription = !isEmpty(data.houseDescription) ? data.houseDescription : '';
  data.housePrice = !isEmpty(data.housePrice) ? data.housePrice : '';

  

  if (Validator.isEmpty(data.houseName)) {
    errors.houseName = 'Home Name field is required';
  }

  if (Validator.isEmpty(data.houseLocation)) {
    errors.houseLocation = 'Home Location field is required';
  }
  if (Validator.isEmpty(data.guestCapacity)) {
    errors.guestCapacity = 'Home Guest Capacity field is required';
  }

  if (Validator.isEmpty(data.houseAvailableFrom)) {
    errors.houseAvailableFrom = 'Home Available From field is required';
  }

  if (Validator.isEmpty(data.houseAvailableTill)) {
    errors.houseAvailableTill = 'Home Available Till field is required';
  }

  if (Validator.isEmpty(data.houseArea)) {
    errors.houseArea = 'Home Area field is required';
  }

  if (Validator.isEmpty(data.houseImage)) {
    errors.houseImage = 'Home Image URL field is required';
  }

  if (Validator.isEmpty(data.housePrice)) {
    errors.housePrice = 'Home Price field is required';
  }

  if (Validator.isEmpty(data.houseDescription)) {
    errors.houseDescription = 'Home Description field is required';
  }

  

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
