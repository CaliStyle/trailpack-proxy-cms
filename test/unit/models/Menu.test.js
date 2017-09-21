'use strict'
/* global describe, it */
const assert = require('assert')

describe('Menu Model', () => {
  it('should exist', () => {
    assert(global.app.api.models['Menu'])
  })
})
