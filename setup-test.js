import axios from 'axios' // v0.15.3
import httpAdapter from 'axios/lib/adapters/http'
axios.defaults.adapter = httpAdapter;

let mockStorage = {};

module.exports = window.localStorage = {
  setItem: (key, val) => Object.assign(mockStorage, {[key]: val}),
  getItem: (key) => mockStorage[key],
  clear: () => mockStorage = {}
};