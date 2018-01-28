import api from './index'
var qs = require('qs')

function list (uid) {
  return api.get('items.json', {
    params: {
      uid: uid
    }
  })
}

function favoies (uid) {
  return api.get('favoies.json', {
    params: {
      uid: uid
    }
  })
}

function addFavory (uid, baobeiId) {
  return api.post('favory.json', qs.stringify({
    uid: uid,
    baobei_id: baobeiId
  }))
}

function rmFavory (uid, baobeiId) {
  return api.delete('favory.json', {
    params: {
      uid: uid,
      baobei_id: baobeiId
    }
  })
}

export default {list, favoies, addFavory, rmFavory}
