import React from 'react'
import { Link } from 'react-router-dom'

const SearchResult = props => {

  const selectRecipe = recipe => {
    props.handleSelectRecipe(recipe)
  }

  return(
    <div>
      <li className="no-bullets" key={props.recipe.id}>
        <Link to={`/recipes/${props.recipe.id}`} className="searchResult">
          <h4 className="recipe-name-index">{props.recipe.name}</h4>
        </Link>&nbsp;&nbsp;
        <button className="fas fa-plus-square" onClick={selectRecipe.bind(this,props.recipe)}></button>
      </li>
    </div>
  )
}

export default SearchResult
