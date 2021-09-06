const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^\w{6,}/;
const tokenRegex = /^\w{16}$/;
const nameRegex = /^\w{3,}/;
const ageRegex = /^[1-9][8-9]$|^[2-9]\d$/;
const dateRegex = /([0-2]\d|3[0-1])\/(0\d|1[0-2])\/\d{4}/;
const rateRegex = /^[1-5]$/;

module.exports = { 
  emailRegex,
  passwordRegex,
  tokenRegex,
  nameRegex,
  ageRegex,
  dateRegex,
  rateRegex,
};