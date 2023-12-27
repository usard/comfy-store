import React,{useState} from 'react'
import styled from 'styled-components'
import { FaPlus, FaMinus } from 'react-icons/fa'

const AmountButtons = () => {
  const [count, setCount] = useState(1);
  const increase = () => {
  
   setCount( (prev)=> prev+1);
  }
  const decrease = () => {
    setCount((prev)=> prev > 1? prev-1: prev);
  }
  return <Wrapper>
            <button type='button' className='' onClick={()=>increase()} >+</button>
            <h2>{count}</h2>
            <button type='button' className='' onClick={()=>decrease()}>-</button>
          </Wrapper> 
}

const Wrapper = styled.div`
  display: grid;
  width: 140px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    margin-bottom: 0;
  }
`

export default AmountButtons
