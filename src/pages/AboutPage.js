import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/hero-bcg.jpeg'

const AboutPage = () => {
  return (
   <main>
     <PageHero title={['home','about']}></PageHero>
     <Wrapper className='page section section-center'>
       <img src={aboutImg} alt="about_image" />
       <article>
        <div className='title'>
          <h2>our story</h2>
          <div className='underline'></div>
        </div>
       <p>Lorem ipsum dolor sit amet consectetur adipisicing
         elit. Possimus deserunt recusandae in dicta id facere,
          architecto sunt sequi consequuntur iste, magni quasi nulla
           fuga consectetur ea. Autem ea porro quisquam? Deleniti voluptatibus, 
           ullam esse tenetur beatae quis exercitationem accusantium doloribus 
           neque vel commodi fuga suscipit velit voluptatum rem nemo deserunt!
        </p>
       </article>
       
     </Wrapper>
   </main>
    
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
