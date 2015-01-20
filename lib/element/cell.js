'use strict'

var TableStyle = require('../style/table')
var Text       = require('./text')

var Cell = module.exports = function(str, style) {
  Cell.super_.call(this, require('../pdf/nodes/cell'))

  if (typeof str === 'object') {
    style = str
    str = null
  }

  this.style    = new TableStyle(style)
  this.children = []

  if (str) {
    var text = new Text(this.style)
    text.add(str)
    this.children.push(text)
  }
}

require('../pdf/utils').inherits(Cell, require('./base'))

var Table = require('./table')
Cell.prototype.createTable = function(opts) {
  var table = new Table(this.style.merge(Cell.super_.paddingReset), opts)
  this.children.push(table)
  return table
}