import Axios from 'axios'
import { APIURL } from './../../support/ApiUrl'


export const IniHome=()=>{
    console.log('inihome')
    return{
        type:'INIHOME'
    }
}
export const BukanHome=()=>{
    return{
        type:'BUKANHOME'
    }
}

export const searchbuku=(nama)=>{
    return(dispatch)=>{
        dispatch({type:'SEARCH_START'})
        Axios.get(`${APIURL}/product/searchproduct?inputNama=${nama}`)
        .then((res) => {
            console.log(res.data)
            // var hasilcari=[]
            // hasilcari.push(res.data)
            // console.log(hasilcari)
            dispatch({type:'SEARCH_RESULT',payload:res.data})
            // console.log(res.data[0].name)
            // var hasilcari=res.data
            // this.setState({ hasilcari: res.data })
        }).catch((err) => {
            console.log(err)
        })
    }
}

// export const searchbuku=(inputnama)=>{
//     return{
//         type:'SEARCH_BOOK',
//         payload:inputnama
//     }
// }