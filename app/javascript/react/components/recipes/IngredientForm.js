import React from "react"

const IngredientForm = props => {

  return (
    <div className="callout">
      <label>
        Name
        <input
          type="text"
          id="name"
          onChange={props.handleIngredientChange}
          value={props.ingredient.name}
        />
      </label>
      <button className="button" onClick={props.ingredientSubmitHandler}>Add Ingredients</button>
    </div>
  )
}

export default IngredientForm
