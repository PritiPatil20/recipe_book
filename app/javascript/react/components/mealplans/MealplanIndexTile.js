import React from 'react'
import { Link } from 'react-router-dom'

const MealplanIndexTile = props => {
  return(
    <div>
        <h5>{props.day}</h5>
        <Link to={`/recipes/${props.recipe.id}`}>
          <h6>{props.recipe.name}</h6>
        </Link>
    </div>
  )
}

export default MealplanIndexTile
