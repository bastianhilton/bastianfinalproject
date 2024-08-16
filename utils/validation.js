// utils/validation.js

export const rules = {
    required: (value) => {
      if (value === undefined || value === null || value === '') {
        return 'This field is required';
      }
      return true;
    },
    email: (value) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        return 'This must be a valid email';
      }
      return true;
    },
    minLength: (min) => (value) => {
      if (value.length < min) {
        return `This field must be at least ${min} characters long`;
      }
      return true;
    },
    // Add more custom rules as needed
  };
  
  export const validate = (value, ruleSet) => {
    for (let rule of ruleSet) {
      let [ruleName, ...args] = rule.split(':');
      const result = rules[ruleName](value, ...args);
      if (result !== true) {
        return result;
      }
    }
    return true;
  };
  
  export const validateForm = (values, schema) => {
    const errors = {};
    for (let field in schema) {
      const result = validate(values[field], schema[field]);
      if (result !== true) {
        errors[field] = result;
      }
    }
    return errors;
  };
  