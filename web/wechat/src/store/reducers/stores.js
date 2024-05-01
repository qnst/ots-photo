import { handleActions } from 'redux-actions'
import { SAVELIST } from '../types/stores'

export default handleActions({
  [SAVELIST] (state, action) {
    return {
      ...state,
      store_arr: action.payload
    }
  }
}, {
  store_arr: [],
})
