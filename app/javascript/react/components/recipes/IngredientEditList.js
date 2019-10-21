import React from "react"
import IngredientForm from "./IngredientForm"

const IngredientEditList = props => {

  const handleDeleteIngredient = (name) => {
    props.handleDeleteIngredient(name)
  }

  const ingredientList = props.ingredients.map(ingredient => {
    return (
      <li key={ingredient.id}>
        <strong>{ingredient.name}</strong>&nbsp;&nbsp;
        <button className="button" onClick={handleDeleteIngredient.bind(this,ingredient.id)}>Delete</button>
      </li>
    )
  })

  return (
    <div>
      <ul>{ingredientList}</ul>
      <IngredientForm onIngredientSubmitted={props.onIngredientSubmitted} />
    </div>
  )
}

export default IngredientEditList
