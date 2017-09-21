/* eslint no-console: [0] */
'use strict'

const joi = require('joi')
const lib = require('.')
// const Errors = require('proxy-engine-errors')

module.exports = {
  // Validate Proxy CMS
  validateProxyCMS: {
    config(config){
      return new Promise((resolve, reject) => {
        joi.validate(config, lib.Schemas.proxyCMSConfig, (err, value) => {
          if (err) {
            return reject(new TypeError('config.proxyCMS: ' + err))
          }
          return resolve(value)
        })
      })
    }
  },
}
