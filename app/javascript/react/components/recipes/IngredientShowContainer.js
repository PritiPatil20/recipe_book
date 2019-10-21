import React from 'react'

const IngredientShowContainer = props => {
  const ingredients = props.ingredients.map(ingredient => {
    return(
      <li key={ingredient.id}>{ingredient.name}</li>
    )
  })

  return(
    <div>
      <h6>Ingredients</h6>
      <ul>{ingredients}</ul>
    </div>
  )
}

export default IngredientShowContainer
