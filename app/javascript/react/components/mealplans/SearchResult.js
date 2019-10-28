import React from 'react'
import { Link } from 'react-router-dom'

const SearchResult = props => {

  const selectRecipe = recipe => {
    props.handleSelectRecipe(recipe)
  }

  return(
    <div>
      <li key={props.recipe.id}>
        <Link to={`/recipes/${props.recipe.id}`}>
          <h6>{props.recipe.name}</h6>
        </Link>
        <button className="button" onClick={selectRecipe.bind(this,props.recipe)}>Select</button>
      </li>
    </div>
  )
}

export default SearchResult
