import React from 'react'
import { Link } from 'react-router-dom'

const RecipeIndexTile = props => {
  return(
    <div className="text-center">
      <br/>
      <Link to={`/recipes/${props.id}`}>
        <h4 className="recipe-name-index">{props.name}</h4>
      </Link>
    </div>
  )
}

export default RecipeIndexTile
