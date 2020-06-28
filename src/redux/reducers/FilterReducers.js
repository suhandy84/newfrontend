const INITIAL_STATE = {
    idcategory: '',
    isfilter: false,
    iskomik: false,
    isnovel: false,
    isedukasi: false,
    isanak: false,
    isimport: false,
    isdiskon: false,
    sortnama: false,
    discountrate: 0
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FILTER':
            return { ...state, idcategory: action.payload, isfilter: true }
        case 'KOMIK':
            return { ...state, iskomik: true, isnovel: false, isedukasi: false, isanak: false, isimport: false, isdiskon: false }
        case 'NOVEL':
            return { ...state, isnovel: true, iskomik: false, isedukasi: false, isanak: false, isimport: false, isdiskon: false }
        case 'EDUKASI':
            return { ...state, isnovel: false, iskomik: false, isedukasi: true, isanak: false, isimport: false, isdiskon: false }
        case 'ANAK':
            return { ...state, isnovel: false, iskomik: false, isedukasi: false, isanak: true, isimport: false, isdiskon: false }
        case 'IMPORT':
            return { ...state, isnovel: false, iskomik: false, isedukasi: false, isanak: false, isimport: true, isdiskon: false }
        case 'DISKON':
            return { ...state, isnovel: false, iskomik: false, isedukasi: false, isanak: false, isimport: false, isdiskon: true }
        case 'SORT_NAMA':
            return { ...state, sortnama: action.payload}
        case 'DISKON':
            return { ...state, discountrate: action.payload}
        case 'CLEAR_FILTER':
            return INITIAL_STATE
        default:
            return state
    }
}