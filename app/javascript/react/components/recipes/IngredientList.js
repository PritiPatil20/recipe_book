import React from "react"

const IngredientList = props => {
  const ingredientList = props.ingredients.map(ingredient => {
    return (
      <li key={ingredient.name}>
        <strong>{ingredient.name}</strong>
      </li>
    )
  })

  return (
    <div>
      <ul>{ingredientList}</ul>
    </div>
  )
}

export default IngredientList
