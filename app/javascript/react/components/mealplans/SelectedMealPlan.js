import React from 'react'
import { Link } from 'react-router-dom'

const SelectedMealPlan = props => {
  const handleDeleteRecipe = (id) => {
    props.handleDeleteRecipe(id)
  }

  const recipeTiles = props.selectedRecipes.map(recipe =>
    <li className="no-bullets text-center"key={recipe.id}>
      {recipe.name}&nbsp;&nbsp;
      <button
        className="fas fa-trash-alt"
        onClick={handleDeleteRecipe.bind(this,recipe.id)}
      >
      </button>
    </li>
  )

  return(
    <div>
        <h5 className="text-center">Selected Date</h5>
        <h6 className="text-center">{props.mealday}</h6>
        <h5 className="text-center">Selected Recipes</h5>
        <ul>{recipeTiles}</ul>
    </div>
  )
}

export default SelectedMealPlan
