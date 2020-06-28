import Axios from 'axios'
import {APIURL} from '../../support/ApiUrl'

export const countCart=(id)=>{
    console.log(id)
    return (dispatch)=>{
        dispatch ({type:"CART_START"})
        Axios.get(`${APIURL}/transactions/totalcart/${id}`)
        .then((res)=>{
            console.log(res)
                dispatch({type:"COUNT_CART",payload:res.data[0].totalqty})
        }).catch((err)=>{
            console.log(err)
        })
    }
}