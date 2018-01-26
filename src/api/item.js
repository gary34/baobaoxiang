import api from './index'

function list (userid) {
  return api.get('items.json', {
    params: {
      userid: userid
    }
  })
}

export default {list}
