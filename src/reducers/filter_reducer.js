import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if(action.type === LOAD_PRODUCTS) {
    const maxPrice = [...action.payload].map((product)=>product.price).reduce((a,b)=>Math.max(a,b), -Infinity);
    const minPrice = [...action.payload].map((product)=> product.price).reduce((a,b)=> Math.min(a,b), +Infinity)
    return {...state, all_products:action.payload, min_price: minPrice, price: maxPrice, max_price: maxPrice, filtered_products: action.payload}
  }
  if(action.type === UPDATE_FILTERS) {
    const {name, value} = action.payload;
    console.log('name and value in update filter :', name, value);
    return {...state, [name]:value}
  }
  if(action.type === UPDATE_SORT){
    return {...state,sort:action.payload}
  }
  if(action.type === SORT_PRODUCTS) {
    const {payload}= action;
    let filtered_products = state.filtered_products;
    if(payload === 'Name(A-Z)') {
      return {...state, filtered_products: filtered_products?.sort((a,b)=> a.name?.localeCompare(b.name) ) }
    }
    if(payload === 'Name(Z-A)') {
     const temp_products = filtered_products.sort((a,b)=> b.name?.localeCompare(a.name));
      return { ...state, filtered_products: temp_products};
    }
    if(payload === 'Price(High)') {
      return { ...state, filtered_products: filtered_products.sort((a,b)=> b.price-a.price)};
    }
    if(payload === 'Price(Low)' ) {
      return { ...state, filtered_products: filtered_products.sort((a,b)=> a.price-b.price)};
    }
  }
  if(action.type === SET_GRIDVIEW) {
    const {payload} = action;
    return {...state, layout: payload}
  }
  if(action.type === SET_LISTVIEW) {
    const {payload} = action;
    return {...state, layout: payload}
  }
  if(action.type === FILTER_PRODUCTS) {
    let temp_products = [...state.all_products];
    const {searchText, category, company, color, price, shipping} = state;
    // console.log('i am in reducer :', searchText, category, company, color, shipping);
    if(searchText) {
      // console.log("i am ok")
      temp_products = temp_products?.filter((product)=> product?.name?.toLowerCase()?.startsWith(searchText));
    }
    if(category !== 'all') {
      // console.log('i came into category reducer')
      temp_products = temp_products?.filter((product)=> product.category === category );
    }
    if(company !== "all")  {
      temp_products = temp_products?.filter((product)=> product.company === company)
    }
    if(color !=="all") {
      console.log('color :', color)
      temp_products = temp_products?.filter((product) => product?.colors?.indexOf(color)>=0)
    }
    if(price) {
      temp_products = temp_products?.filter((product)=> product.price <= price)
    }
    if(shipping) {
      temp_products = temp_products?.filter((product)=> product?.shipping === true)
    }
    return {...state, filtered_products: temp_products}
  }
  if(action.type === CLEAR_FILTERS) {
    const temp_products = state.all_products;
    return {...state,shipping:'all', category:'all', company:'all', filtered_products: temp_products}
  }
  return state;
}

export default filter_reducer;
