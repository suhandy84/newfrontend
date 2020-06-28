const INITIAL_STATE={
    ishome:false,
    loading: false,
    hasilcari:[]
}

export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'BUKANHOME': 
            return {...state,ishome:false}
        case 'INIHOME':
            return {...state,ishome:true}
        case 'SEARCH_START':
            return {...state, loading:true}
        case 'SEARCH_RESULT':
            return {...state, loading:false, hasilcari: action.payload}
        default:
            return state
    }
}