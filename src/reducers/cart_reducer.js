import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  let  {cart} = state;
  if(action.type === ADD_TO_CART) {
    const {id, count, mainColor, product:{name, price, stock, images}} = action.payload;
    console.log('color in reducer :', mainColor )
    const isItemExists = cart?.find((item)=> item.id === id+mainColor)
    if(isItemExists) {
     state.cart?.map((item) => {
      if(item.id === id+mainColor) {
        item.count = stock > item.count+ count? item.count+ count: stock;
      }
      return item;
    });
      return {...state }
    }
    else {
      const newItem = {
        id: id+mainColor,
        name,
        mainColor,
        count,
        price,
        stock,
        image: images[0]?.url
      }
     return {...state, cart:[...state.cart, newItem]}
    }
  }
  if(action.type === REMOVE_CART_ITEM) {
    const {id} = action.payload;
    const index = state.cart.map((cart)=> cart.id).indexOf(id);
    state.cart.splice(index,1);
    console.log('items in cart after remove :', state.cart)
    return {...state, cart:[...state.cart]} 
  }
  if(action.type === CLEAR_CART){
    return {...state,cart:[],total_items:0, total_amount:0}
  }
  if(action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const {id, count, type} = action.payload;
      state.cart.map((item)=> {
        if(item.id === id) {
          item.count = type === 'increase'? item.count + 1: item.count -1;
        }
        return item;
      })
      return {...state, cart:[...state.cart]};
  }
  if(action.type === COUNT_CART_TOTALS) {
    console.log('state.cart in total amount :', state.cart)
    const total = state?.cart?.map((item) => item.count*item.price).reduce((acc, curr)=> acc+curr,0)
    return {...state, total_amount: total}
  }
  return state
  // throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
