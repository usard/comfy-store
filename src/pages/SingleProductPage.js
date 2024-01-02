import React, {useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers';
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
// import { Link } from 'react-router-dom'

const SingleProductPage = () => {
  const {id} = useParams();
  useEffect(()=> {
    getSingleProduct(id);
  },[])
  const {single_product_loading:loading, single_product_error: error, singleProduct, getSingleProduct} = useProductsContext();
  console.log('single product :', singleProduct);
  // const [mainColor, setMainColor] = useState(singleProduct?.colors?.[0]);// unable to set color here dont know the reason , here i am getting the color using useEfect and using that color in the useState,but it shwoing useState of mainColor as undefined 
  // console.log('main color in singleproduct page :', );
  if(loading) {
    return <Loading />
  }
  else if(error) {
    return <Error />
  }
  else{
    const {images, price, name, company, reviews, stars, stock} = singleProduct; 
    return (
       <Wrapper>
        <PageHero  title={['home', 'products', name]}/>
        <div className="product-center">
          <ProductImages images={images} />
          <div>
              <h2>{name}</h2>
              <Stars stars={stars} reviews={reviews} />
              <p className='price' >{formatPrice(price)}</p>
              <p className='desc'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Vero vitae dignissimos ab, aliquid doloremque perspiciatis cum veniam molestias 
                quae dolorum esse nisi commodi corrupti sint beatae rerum saepe optio praesentium.
              </p>
              <div className='data'>
                <p className='info'>
                  <span>Stock</span>
                  <span>: {stock}</span>
                </p>
                <p className='info'>
                  <span>SKU</span>
                  <span>: {id}</span>
                </p>
                <p className='info'>
                  <span>brand</span>
                  <span>: {company}</span>
                </p>
              </div>
              <hr />
              <AddToCart product={singleProduct} />
          </div>
        </div>
       </Wrapper>    
     )
}
}

const Wrapper = styled.main`
// .product-center{
//   display: grid;
//   grid-template-columns: 1fr 1fr;
// }

  .product-center {
    display:grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }
  .colors{
    margin-top: 2rem;
  }
  .colors-container{
    display: flex;
    gap:10px;
  }
  .color {
    height: 20px;
    width: 20px;
    border-radius: 50%;
  }


  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
