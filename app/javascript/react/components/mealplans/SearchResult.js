import React from 'react'
import { Link } from 'react-router-dom'

const SearchResult = props => {

  const selectRecipe = recipe => {
    props.handleSelectRecipe(recipe)
  }

  return(
    <div>
      <li key={props.recipe.id}>
        <Link to={`/recipes/${props.recipe.id}`} className="searchResult">
          <h6>{props.recipe.name}</h6>
        </Link>&nbsp;&nbsp;
        <button className="fas fa-plus-square" onClick={selectRecipe.bind(this,props.recipe)}></button>
      </li>
    </div>
  )
}

export default SearchResult
