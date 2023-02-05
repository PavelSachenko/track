const emailRegExp = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

const validateFormValues = {
  isEmpty: (value: string) => !value || !value.trim().length,
  isEmail: (email: string) => email && emailRegExp.test(email),
}

export default validateFormValues;