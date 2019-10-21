import React from 'react'
import { Link } from 'react-router-dom'

const RecipeIndexTile = props => {
  return(
    <div>
      <Link to={`/recipes/${props.id}`}>
        <h6>{props.name}</h6>
      </Link>
    </div>
  )
}

export default RecipeIndexTile
