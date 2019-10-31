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
        <button className="fas fa-trash-alt" onClick={handleDeleteIngredient.bind(this,ingredient.id)}></button>
      </li>
    )
  })

  return (
    <div>
      <ul>{ingredientList}</ul>
      <IngredientForm
        ingredientSubmitHandler={props.ingredientSubmitHandler}
        handleIngredientChange={props.handleIngredientChange}
        ingredient={props.ingredient}
      />
    </div>
  )
}

export default IngredientEditList
