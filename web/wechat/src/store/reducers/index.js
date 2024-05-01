import { combineReducers } from 'redux'
import stores from './stores'
import balance from './balance'

export default combineReducers({
  stores,
  balance
})
