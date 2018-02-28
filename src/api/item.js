import api from './index'
var qs = require('qs')

function list () {
  return api.get('items.json')
}

function favoies () {
  return api.get('favoies.json')
}

function addFavory (baobeiId) {
  return api.post('favory.json', qs.stringify({
    baobei_id: baobeiId
  }))
}

function rmFavory (baobeiId) {
  return api.delete('favory.json', {
    params: {
      baobei_id: baobeiId
    }
  })
}

export default {list, favoies, addFavory, rmFavory}
