import api from './index'

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
export default {list, favoies}
