import React from 'react'
import { Link } from 'react-router-dom'

const RecipeIndexTile = props => {
  return(
    <div className="text-center">
      <br/>
      <Link to={`/recipes/${props.id}`}>
        <h3 className="recipe-name-index">{props.name}</h3>
      </Link>
    </div>
  )
}

export default RecipeIndexTile
