import React, { useState } from 'react'
import IngredientList from "./IngredientList"
import IngredientForm from "./IngredientForm"
import DirectionList from "./DirectionList"
import DirectionForm from "./DirectionForm"
import _ from "lodash"
import ErrorList from "../ErrorList"
import { Redirect } from "react-router-dom"

const RecipesFormContainer = props => {
  const [recipe, setRecipe] = useState({
    name: ""
  })
  const [ingredients, setIngredients] = useState([])
  const [directions, setDirections] = useState([])
  const [errors, setErrors] = useState({})
  const [redirectNumber, setRedirectNumber] = useState(null)

  const ingredientSubmittedHandler = ingredient => {
    setIngredients([...ingredients, ingredient])
  }

  const directionSubmittedHandler = direction => {
    setDirections([...directions, direction])
  }

  const handleInputChange = event => {
    setRecipe({
      ...recipe,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const validForSubmission = () => {
    let submitErrors = {}

    const requiredFields = ["name"]

    requiredFields.forEach(field => {
      if(recipe[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "can't be blank"
        }
      }
    })

    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (validForSubmission()) {
      fetch('/api/v1/recipes.json', {
        credentials: "same-origin",
        method: 'POST',
        body: JSON.stringify({
          recipe: recipe,
          ingredients: ingredients,
          directions: directions
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
           error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        setRedirectNumber(body.recipe.id)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));

      setRecipe({
        name: ""
      })
    }
  }

  if (redirectNumber) {
    return <Redirect to={`/recipes/${redirectNumber}`} />
  }

  return(
    <div className="row">
      <div className="small-6 small-centered columns">
        <h2 className="text-center">Add a New Recipe</h2>
        <form className="callout secondary">
          <ErrorList
            errors={errors}
          />
          <label htmlFor="name"><h6>Name:</h6>
            <input
              type="text"
              id="name"
              value={recipe.name}
              onChange={handleInputChange}
            />
          </label>
          <h6>Ingredients:</h6>
          <IngredientList ingredients={ingredients} />
          <IngredientForm onIngredientSubmitted={ingredientSubmittedHandler} />
          <h6>Directions:</h6>
          <DirectionList directions={directions} />
          <DirectionForm onDirectionSubmitted={directionSubmittedHandler} />
          <input type="submit" value="Add Recipe" onClick={handleSubmit} />
        </form>
      </div>
    </div>
  )
}

export default RecipesFormContainer
