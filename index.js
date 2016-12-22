'use strict'

const Trailpack = require('trailpack')
// const _ = require('lodash')
const lib = require('./lib')

module.exports = class ProxyCMSTrailpack extends Trailpack {

  /**
   * TODO document method
   */
  validate () {

  }

  /**
   * Adds Routes, Policies, and Agenda
   */
  configure () {
    return Promise.all([
      lib.ProxyCMS.addPolicies(this.app),
      lib.ProxyCMS.addRoutes(this.app),
      lib.ProxyCMS.addAgenda(this.app)
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

