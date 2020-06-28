import Axios from 'axios'
import { APIURL } from './../../support/ApiUrl'

export const FilterCategory = (data) => {
    return {
        type:'FILTER',
        payload:data
    }
}

export const SetCategory = (data) => {
    return (dispatch) => {
        if (data==='1'){
            dispatch({type:'KOMIK'})
        }else if (data==='2') {
            dispatch({type:'NOVEL'})
        }else if (data==='3') {
            dispatch({type:'EDUKASI'})
        }else if (data==='4') {
            dispatch({type:'ANAK'})
        }else if (data==='5') {
            dispatch({type:'IMPORT'})
        }else if (data==='6') {
            dispatch({type:'DISKON'})
        }
    }
}

export const SortNama = (data) => {
    return {
        type: 'SORT_NAMA',
        payload: data
    }
}

export const ClearFilter = () => {
    return {
        type:'CLEAR_FILTER'
    }
}

export const discountbook=(discountrate)=>{
    return{
        type:'DISKON',
        payload:discountrate
    }
}