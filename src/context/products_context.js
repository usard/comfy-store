import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url, single_product_url as singleURL} from '../utils/constants';

import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  isSidebarOpen:false,
  products_loading: false,
  products_error: false,
  featuredProducts:[],
  single_product_loading: false,
  single_product_error: false,
  singleProduct:{},
  allProducts:[],
}

export const ProductsContext = React.createContext();
export const useProductsContext = () => {
  return useContext(ProductsContext)
} 
export const ProductsContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchProducts = async() => {
    dispatch({type:GET_PRODUCTS_BEGIN})
    try {
      const response = await axios.get(url);
      const data = response?.data;
      dispatch({type:GET_PRODUCTS_SUCCESS, payload:data})
      // console.log(' all products data from server :', data);
    }
    catch(error) {
      dispatch({type: GET_PRODUCTS_ERROR,})
      console.log('error while fetching data from the server api :', error.response.data.message)
    }
  }

  const getSingleProduct = async(id) => {
    console.log('function invoked from useEffect :', id)
    dispatch({type:GET_SINGLE_PRODUCT_BEGIN})
    try {
      const response = await axios.get(singleURL+id);
      dispatch({type:GET_SINGLE_PRODUCT_SUCCESS, payload: response.data})
      return response.data;

    }
    catch(error) {
      dispatch({type:GET_SINGLE_PRODUCT_ERROR})
      console.log('error in getting the single product :', error.response.data.message);
    }
  }
  const openSidebar = () => {
    dispatch({type:SIDEBAR_OPEN})
  }
  const closeSidebar = () => {
    dispatch({type:SIDEBAR_CLOSE})
  }
  useEffect(()=>{
    fetchProducts()
  },[])
  return (
    <ProductsContext.Provider value={{...state, openSidebar, closeSidebar, getSingleProduct}}>
      {children}
    </ProductsContext.Provider>
  )
  
}