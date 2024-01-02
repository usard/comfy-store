import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

const getFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('cart'))|| [] ;
}

const initialState = {
  cart: getFromLocalStorage(),
  total_amount:0,
  shipping_fee:5.85,
  total_items:0,
}

const CartContext = React.createContext()

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer,initialState);
  
  useEffect(()=> {
    dispatch({type: COUNT_CART_TOTALS})
    localStorage.setItem('cart', JSON.stringify(state.cart));
  },[state.cart])

  const addToCart = (id, count, mainColor, product, image) => {
    dispatch({type:ADD_TO_CART, payload:{id, count, mainColor, product, image} });
  }
  const editItem = (id, count, type) => {
    console.log('editItem triggered')
       dispatch({type:TOGGLE_CART_ITEM_AMOUNT, payload:{id,count,type}})
  }
  const removeFromCart = (id) => {
    dispatch({type:REMOVE_CART_ITEM, payload:{id}});
  }

  const clearCart = () => {
    dispatch({type:CLEAR_CART});
  }
  
  return (
    <CartContext.Provider value={{...state, addToCart, removeFromCart, clearCart, editItem}}>{children}</CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
