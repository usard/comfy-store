export const formatPrice = (price) => {
  const formattedPrice =   Intl.NumberFormat('en-US', 
   {
    style: 'currency',
    currency: 'INR'
   }).format(price); 
   return formattedPrice;
}

export const getUniqueValues = (arr, type) => {
  // console.log('unique values :', [...new Set(arr.map((product)=>product[type])), 'all'].sort());
  if(type==='colors'){
    return [...new Set(...arr.map(( product)=> product[type]) )].sort();
  }
 return [...new Set(arr.map((product)=>product[type])), 'all'].sort()

}
