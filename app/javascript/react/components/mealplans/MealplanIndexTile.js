import React from 'react'
import { Link } from 'react-router-dom'

const MealplanIndexTile = props => {
  const recipeTiles = props.mealrecipes.map(mealrecipe => {
    return(
      <li key={mealrecipe.recipe.id}>
        <Link to={`/recipes/${mealrecipe.recipe.id}`}>
          {mealrecipe.recipe.name}
        </Link>
      </li>
    )
  })

  return(
    <div>
        <h5>{props.day}</h5>
        <ul>{recipeTiles}</ul>
    </div>
  )
}

export default MealplanIndexTile
