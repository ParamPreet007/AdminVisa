export const valildateEmailLogin = (_, value) => {
  const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!value) {
    return Promise.reject("Email is required.");
  }
  if (!emailRegex.test(value)) {
    return Promise.reject("The input is not a valid email!");
  }
  return Promise.resolve();
};