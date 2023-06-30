const expressHandlebars = require('express-handlebars');
const Handlebars = require('handlebars');

const hbs = expressHandlebars.engine('.hbs', function (err, content, options) {
    // Đăng ký helper 'eq'
    Handlebars.registerHelper('eq', function (a, b, options) {
        if (a === b) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    if (err) throw err;
    return content(options);
});

module.exports = hbs;
