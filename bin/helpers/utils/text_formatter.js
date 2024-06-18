
const formatThousand = (value) => {
  return `${parseFloat(value).toLocaleString('en').replace(/,/g, '.')},00`;
};

const capitalizeFirstSentence = (str) => {
  return str.replace(str[0], str[0].toUpperCase());
};

const formatPhoneNumber = (str) => {
  return str.replace(/\D+/g, '').replace(/^((08){1}|(8){1})/g, '628'); // nosonar
};

module.exports = {
  formatThousand,
  capitalizeFirstSentence,
  formatPhoneNumber
};
