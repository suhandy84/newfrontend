import {combineReducers} from 'redux'
import AuthReducers from './AuthReducers'
import HeaderReducers from './Headerreducers'
import userReducers from './userReducer'
import FilterReducers from './FilterReducers'
import CartReducers from './Cartreducers'


export default combineReducers({
    Auth:AuthReducers,
    Header:HeaderReducers,
    userReducers:userReducers,
    Filter:FilterReducers,
    Totalcart:CartReducers
})