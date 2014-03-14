'use strict';
var immediate = require('immediate');
module.exports = unwrap;

function unwrap(promise, func, value) {
  immediate(function () {
    var returnValue;
    try {
      returnValue = func(value);
    } catch (e) {
      promise.reject(e);
      return;
    }

    if (returnValue === promise) {
      promise.reject(new TypeError('Cannot resolve promise with itself'));
    } else {
      promise.resolve(returnValue);
    }
  });
}