const Validator= require('validator');
const isEmpty = require('is-empty');

module.exports= function  validateOrgProfileInput(data){
    let errors={ };

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.mobileNo = !isEmpty(data.mobileNo) ? data.mobileNo : "";
    data.address = !isEmpty(data.address) ? data.address : "";
    data.pincode = !isEmpty(data.pincode) ? data.pincode : "";
    
    
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
      }
    
      if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
      } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
      }
    
      if(Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
      }
    
     
  return{
      errors,
      isValid: isEmpty(errors)
  };

};