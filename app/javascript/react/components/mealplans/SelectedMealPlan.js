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
    <div className="select-form-container">
        <h4 className="text-center"><strong>Selected Date</strong></h4>
        <h5 className="text-center">{props.mealday}</h5>
        <h4 className="text-center"><strong>Selected Recipes</strong></h4>
        <ul>{recipeTiles}</ul>
    </div>
  )
}

export default SelectedMealPlan
