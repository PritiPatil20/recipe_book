import React, { useState } from "react"
import _ from "lodash"
import ErrorList from "../ErrorList"

const IngredientForm = props => {
  const [ingredient, setIngredient] = useState({
    name: "",
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = event => {
    setIngredient({
      ...ingredient,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const validForSubmission = () => {
    let submitErrors = {}

    const requiredFields = ["name"]

    requiredFields.forEach(field => {
      if(ingredient[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "can't be blank"
        }
      }
    })

    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const onSubmitHandler = event => {
    event.preventDefault()
    if (validForSubmission()) {
      props.onIngredientSubmitted(ingredient)
      setIngredient({
        name: ""
      })
      setErrors({})
    }
  }

  return (
    <form className="callout" onSubmit={onSubmitHandler}>
      <ErrorList
        errors={errors}
      />
      <label>
        Name
        <input
          type="text"
          id="name"
          onChange={handleInputChange}
          value={ingredient.name}
        />
      </label>

      <input className="button" type="submit" value="Add Ingredients" />
    </form>
  )
}

export default IngredientForm
