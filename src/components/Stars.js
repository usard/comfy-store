import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
const Stars = ({stars, reviews}) => {
  // let arr = new Array(5); it wont iterate through the array, so use Array.from method  
  let arr = Array.from({length:5});
  return (
     <div>
      {
        arr.map((item,index)=> {
          return (
          <span>
          {
            stars >= index+1 ? (<BsStarFill />):(stars < index+ 0.5 ? (<BsStar />):(<BsStarHalf />))
          }
          </span>
          )
        })

       
          
        }
     
      {/* <span>
       {
         stars >= 2 ? (<BsStarFill />):(stars < 1.5 ? (<BsStar />):(<BsStarHalf />))
        }
      </span>
      <span>
       {
         stars >= 3 ? (<BsStarFill />):(stars < 2.5 ? (<BsStar />):(<BsStarHalf />))
        }
      </span>
      <span>
       {
         stars >= 4 ? (<BsStarFill />):(stars < 3.5 ? (<BsStar />):(<BsStarHalf />))
        }
      </span>
      <span>
       {
         stars >= 5 ? (<BsStarFill />):(stars < 4.5 ? (<BsStar />):(<BsStarHalf />))
        }
      </span> */}
     </div>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Stars
