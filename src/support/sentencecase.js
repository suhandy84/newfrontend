export const capitalfirst=(input)=>{
    const upper = input.charAt(0).toUpperCase() + input.substring(1)
    return upper
}

export const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());

export const UpperCase = (str) => (str.toString().toUpperCase())
