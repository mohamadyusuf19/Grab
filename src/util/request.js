const request = require('superagent');
const defaultAjaxTimeout = 30000;
//const cookie = require('cookie');
request.Request.prototype.finish = function (callback) {
    //this replace superagent's .end() function to include our custom error handling ( see above )
    this.end((err, res) => {
        callback(err, res);
    });
};

var requestWrapper = function(method) {
    //this is here so we can append the .timeout call to all of our ajax request with the default value
    return function(url) {
        return request[method](url)
            .type('form')
            .timeout(defaultAjaxTimeout);
    };
};

export default {
    get: requestWrapper('get'),
    put: requestWrapper('put'),
    post: requestWrapper('post'),
    del: requestWrapper('del'),
}
