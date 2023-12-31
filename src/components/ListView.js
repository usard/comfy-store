import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'
import { Link } from 'react-router-dom'
import { useFilterContext } from '../context/filter_context'
const ListView = () => {
  const {filtered_products} = useFilterContext();
  return (
    <Wrapper>
      <div className="products-container">
        {
          filtered_products?.map((product) => {
            const {image, id , name , description, price } = product;
            return (
              <article key={id}>
                <img src={image} alt='' />
                <div>
                  <h4>{name}</h4>
                  <p>{formatPrice(price)}</p>
                  <p>{description}</p>
                  <Link to={`/products/${id}`} className='btn'>details</Link>
                </div>
              </article>
            )
          })
        }
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
display: grid;
row-gap: 3rem;
  article {
    margin-bottom:3rem;
  }
  img {
    width: 100%;
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
  }
  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`

export default ListView
