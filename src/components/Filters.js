import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {
  const {all_products:products, category, company, color, updateFilters, clearFilters, price, max_price} = useFilterContext();
  const categoryOptions = getUniqueValues(products,'category');
  console.log('category options :', categoryOptions);
  const companyOptions = getUniqueValues(products,'company');
  console.log('company options :', companyOptions);
  const colorOptions = getUniqueValues(products,'colors');
  return ( 
    <Wrapper>
      <form onSubmit={(event)=> event.preventDefault()}>
        <div className="form-control">
          <input className='search-input' name='searchText' onChange={(event)=>updateFilters(event)} placeholder='search here...' type="search" />
        </div>
        
        <div className="form-control">
          <h5>category</h5>
          <div>
            {
              categoryOptions?.map((item) => {
                return(
                  <button key={item} type='button' name="category" className={item === category ? "active":""} onClick={(event)=> updateFilters(event)}>{item}</button>
                  )
              })
            }
          </div>
        </div>

        <div className="form-control">
          <h5>Company</h5>
          <select name="company" id="company" value={company} onChange={(event)=>{updateFilters(event)}}>
            {
              companyOptions?.map((optionItem) => {
                return <option key={optionItem} value={optionItem}>{optionItem}</option>
              })
            }
          </select>
        </div>

        <div className="form-control">
          <h5>colors</h5>
          <div className="form-control" style={{display:'flex', alignItems:'center', gap: '0.5rem'}}>
            <button type='button' data-color='all' name='color' onClick={(event) => {updateFilters(event)}}>all</button>
            {
             colorOptions.map((colorIcon)=>{
              return <button type='button' data-color={colorIcon} key={colorIcon} name='color' style={{backgroundColor:colorIcon, width:'15px', height:'15px', borderRadius:'50%'}} onClick={(event) => {updateFilters(event)}}>{color === colorIcon ? <FaCheck style={{color:'white'}} />:''}</button>
             })
            }
          </div>
        </div>
        
        <div className='form-control price'> 
           <h5>price :   {formatPrice(price)}</h5>
           <input type="range" name='price' id='price' min={0} max={max_price} value={price} onChange={updateFilters}/>
        </div>

        <div className="form-control shipping">
          <h5>Free shipping </h5>
          <input type="checkbox" name='shipping' onClick={updateFilters} />
        </div>

        <button className='clear-btn' onClick={clearFilters}>clear filters</button>
      </form>

    </Wrapper>
  )
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
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
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
