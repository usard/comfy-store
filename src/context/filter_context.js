import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filtered_products:[],
  layout:'grid',
  all_products:[],
  category:'all',
  company:'all',
  searchText: '',
  color:'all',
  price: 0,
  min_price: 0,
  max_price: 0,
  free_shipping:null,
  sort:'Name(A-Z)',
  sortOptions:['Name(A-Z)', 'Name(Z-A)', 'Price(Low)', 'Price(High)'],
}

const FilterContext = React.createContext()

export const FilterContextProvider = ({ children }) => {
  const [state, dispatch]= useReducer(reducer,initialState)
  const {allProducts:products} = useProductsContext();
  console.log('filtered products in filter context :', products);
  
  useEffect(()=> {
    dispatch({type: LOAD_PRODUCTS, payload:products})
  },[products])
   
  useEffect(()=> {
    dispatch({type: FILTER_PRODUCTS})
    dispatch({type:SORT_PRODUCTS, payload:state.sort})
  },[state.sort,state.searchText, state.category, state.company, state.price, state.color, state.shipping])
  
  const handleSort = (event) => {
    console.log('event :', event.target.value);
    dispatch({type:UPDATE_SORT, payload:event.target.value})
  }
  const handleLayout = (value) => {
    // console.log('value in handleLayout :', value);
    if(value === 'grid') {
      dispatch({type:SET_GRIDVIEW, payload: 'grid'});
    }
    if(value === 'list') {
      dispatch({type:SET_LISTVIEW, payload: 'list'});
    }
  }
  const clearFilters = () => {
    dispatch({type:CLEAR_FILTERS})
  }
  const updateFilters = (event) => {
    let {name, value}= event.target;
    if (name === 'category') {
      value  = event.target.textContent;
    }
    if(name === 'color'){
      console.log("i am in update filter color context", event.target.dataset.color)
      value = event.target.dataset.color;
    }
    if(name=== 'shipping') {
      value = event.target.checked;
      console.log('value of shipping in context :', value);
    }
    dispatch({type: UPDATE_FILTERS, payload: {name, value}})
  }
  return (
    <FilterContext.Provider value={{...state, handleSort, handleLayout, updateFilters, clearFilters}}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
