'use strict'

const Trailpack = require('trailpack')
// const _ = require('lodash')
const lib = require('./lib')

module.exports = class ProxyCMSTrailpack extends Trailpack {

  /**
   * TODO document method
   */
  validate () {
    if (!_.includes(_.keys(this.app.packs), 'express')) {
      return Promise.reject(new Error('Trailpack-proxy-cart only works for express!'))
    }

    if (!_.includes(_.keys(this.app.packs), 'sequelize')) {
      return Promise.reject(new Error('Trailpack-proxy-cart only works for Sequelize!'))
    }

    if (!_.includes(_.keys(this.app.packs), 'proxy-engine')) {
      return Promise.reject(new Error('Trailpack-proxy-cart requires trailpack-proxy-engine!'))
    }

    if (!_.includes(_.keys(this.app.packs), 'proxy-generics')) {
      return Promise.reject(new Error('Trailpack-proxy-cart requires trailpack-proxy-generics!'))
    }

    // Configs
    if (!this.app.config.proxyEngine) {
      return Promise.reject(new Error('No configuration found at config.proxyEngine!'))
    }

    if (!this.app.config.proxyCMS) {
      return Promise.reject(new Error('No configuration found at config.proxyCMS!'))
    }

    if (!this.app.config.proxyGenerics) {
      return Promise.reject(new Error('No configuration found at config.proxyGenerics!'))
    }

    return Promise.all([
      lib.Validator.validateProxyCMS.config(this.app.config.proxyCMS)
    ])
  }

  /**
   * Adds Routes, Policies, and Agenda
   */
  configure () {
    return Promise.all([
      lib.ProxyCMS.configure(this.app),
      lib.ProxyCMS.addPolicies(this.app),
      lib.ProxyCMS.addRoutes(this.app),
      lib.ProxyCMS.resolveGenerics(this.app),
      lib.ProxyCMS.copyDefaults(this.app),
      lib.ProxyCMS.addCrons(this.app),
      lib.ProxyCMS.addEvents(this.app),
      lib.ProxyCMS.addTasks(this.app)
    ])
  }

  /**
   * TODO document method
   */
  initialize () {

  }

  constructor (app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}

