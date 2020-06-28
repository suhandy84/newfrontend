export const today=()=>{
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let mm = new Date().getMonth()+1
    let dd = new Date().getDate()
    let dy = new Date().getDay()
    let yy = new Date().getFullYear()
    let hh = new Date().getHours()
    let mn = new Date().getMinutes()
    let ss = new Date().getSeconds()

    return `${days[dy]} - ${mm}/${dd}/${yy} - ${hh}:${mn}:${ss}`
}

export const dateFormat=(data)=>{
    let days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
    let months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]
    let mm = new Date(data).getMonth()
    let dd = new Date(data).getDate()
    let dy = new Date(data).getDay()
    let yy = new Date(data).getFullYear()
    // let hh = new Date().getHours()
    // let mn = new Date().getMinutes()
    // let ss = new Date().getSeconds()

    return `${days[dy]} - ${months[mm]}/${dd}/${yy}`
}

export const totalPage=(a,totalprod)=>{

    let b = a - totalprod
    

    return a - b
}
