const Handlebars = require('handlebars');

// Đăng ký helper 'eq'
const hbs = Handlebars.registerHelper('eq', function (a, b, options) {
  if (a === b) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

module.exports = hbs;
