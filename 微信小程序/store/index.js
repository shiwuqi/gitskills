const Store = require('../utils/store');
const state = require('./state');
const mutations = require('./mutations');
const actions = require('./actions');

module.exports = new Store({
  state,
  mutations,
  actions
})