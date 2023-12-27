import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
const PageHero = ({title}) => {
  return (
      <Wrapper>
        <div className='section-center'>
         <h1>{
              title?.map((item, index) =>{
                if(index < title.length-1){
                  return(
                    <Link key={item} to={item ==='home' ? '/' : `/${item}`}>{item} / </Link>
                    )
                  }
                else {
                    return
                }
                })
            }
            <span>{title[title.length-1]}</span>
         </h1>
        </div>
      </Wrapper>
  )
}

const Wrapper = styled.section`
  background: var(--clr-primary-10);
  width: 100%;
  min-height: 20vh;
  display: flex;
  align-items: center;
  h1{
    font-size: 20px;
  }

  color: var(--clr-primary-1);
  a {
    color: var(--clr-primary-3);
    padding: 0.5rem;
    transition: var(--transition);
  }
  a:hover {
    color: var(--clr-primary-1);
  }
`

export default PageHero
