import { handleActions } from 'redux-actions'
import { SAVEBALANCE } from '../types/balance'

export default handleActions({
  [SAVEBALANCE] (state, action) {
    return {
      ...state,
      balance: action.payload
    }
  }
}, {
  balance: 0,
})
