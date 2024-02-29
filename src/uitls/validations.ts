const validations = {
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
  digitRev: /[^\d]/g,
  phoneNumber: /^\d{8}$/,
};

export default validations;
