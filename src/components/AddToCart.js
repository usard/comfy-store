import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useCartContext } from '../context/cart_context'
import AmountButtons from './AmountButtons'

const AddToCart = ({product}) => {
  const {id, stock, colors} = product;
  const {addToCart} = useCartContext();
  const [count, setCount] = useState(1);
  const [mainColor, setMainColor] = useState(colors?.[0]);
  const increase = () => {
    console.log('count value in add to cart :', count);
   setCount( (prev)=> prev >= stock ? prev: prev+1);
  }
  const decrease = () => {
    setCount((prev)=> prev > 1? prev-1: prev);
  }
  // console.log('main color in add to cart page :', mainColor);
 
  return (
        <Wrapper>
           <div className="colors">
                <p className='info'>
                  <span>colors</span>
                   <span className='colors-container'>
                    : {
                      colors?.map((color)=> {
                        return <button key={color} onClick={()=>setMainColor(color)} style={{backgroundColor: color}} className='color'>{mainColor === color ? <FaCheck /> : ''}</button>
                      })
                    }
                   </span>
                </p>
              </div>
          <div className="btn-container">
           <AmountButtons stock={stock} count={count} increase={increase} decrease={decrease}></AmountButtons>
           {stock  && <Link to='/cart' className='btn' onClick={()=>  addToCart(id, count, mainColor, product)}>Add to Cart</Link>}
          </div>
       </Wrapper>
    )
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`
export default AddToCart
