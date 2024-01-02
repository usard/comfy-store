import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const {layout} = useFilterContext();
  // console.log('layout in products list :', layout)
  return ( layout== 'grid' ? <ListView />:<GridView /> )
}

export default ProductList
