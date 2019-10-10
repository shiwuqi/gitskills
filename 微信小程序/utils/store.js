'use strict'

let _state = {};

class Store {
  constructor(options = {}) {
    _state = JSON.parse(JSON.stringify(options.state)) || {};
    this.walk(options.state || {});
    this.mutations = options.mutations || {};
    this.actions = options.actions || {};

    const _this = this;
    const { dispatch, commit } = this;
    this.dispatch = function boundDispatch(type, payload) {
      return dispatch.call(_this, type, payload);
    }
    this.commit = function boundMutation(type, payload, options) {
      return commit.call(_this, type, payload, options);
    }
  }

  get state() {
    return _state;
  }

  set state(val) {
    console.warn('Cannot assign directly');
  }

  install(global) {
    global.$store = this;
  }

  walk(data) {
    const _this = this;
    Object.keys(data).forEach(function(key) {
      _this.normalizeMapState(data, key, data[key])
    })
  }

  // state属性设置getter方法，防止数据直接修改或删除
  normalizeMapState(data, key, val) {
    Object.defineProperty(data, key, {
      get() {
        return val;
      }
    })
  }

  dispatch(type, payload) {
    const { commit } = this;
    this.actions[type]({ commit, _state }, payload);
  }

  commit(type, payload) {
    this.mutations[type](_state, payload);
  }
}

module.exports = Store