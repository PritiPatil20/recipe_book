import React, { useState, useEffect } from 'react'
import IngredientEditList from "./IngredientEditList"
import DirectionEditList from "./DirectionEditList"
import _ from "lodash"
import ErrorList from "../ErrorList"
import { Redirect } from "react-router-dom"

const RecipesEditContainer = props => {
  const [recipe, setRecipe] = useState({
    name: ""
  })
  const [ingredients, setIngredients] = useState([])
  const [directions, setDirections] = useState([])
  const [errors, setErrors] = useState({})
  const [redirectNumber, setRedirectNumber] = useState(null)
  let recipeId = props.match.params.id

  useEffect(() => {
    fetch(`/api/v1/recipes/${recipeId}`)
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
      setRecipe(body.recipe)
      setIngredients(body.ingredients)
      setDirections(body.directions)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const handleInputChange = event => {
    setRecipe({
      ...recipe,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const ingredientSubmittedHandler = ingredient => {
    setIngredients([...ingredients, ingredient])
  }

  const handleDeleteIngredient = id => {
    setIngredients(ingredients.filter(ingredient => ingredient.id != id))
  }

  const directionSubmittedHandler = direction => {
    setDirections([...directions, direction])
  }

  const handleDeleteDirection = id => {
    setDirections(directions.filter(direction => direction.id != id))
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

  const editRecipe = event => {
    event.preventDefault()
    if (validForSubmission()) {
      fetch(`/api/v1/recipes/${recipeId}`, {
        credentials: "same-origin",
        method: 'PUT',
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
    setErrors({})
    }
  }

  if (redirectNumber) {
    return <Redirect to={`/recipes/${redirectNumber}`} />
  }

  return(
    <div className="row">
      <div className="small-6 small-centered columns">
        <h2 className="text-center">Edit a Recipe</h2>
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
          <IngredientEditList
            ingredients={ingredients}
            onIngredientSubmitted={ingredientSubmittedHandler}
            handleDeleteIngredient={handleDeleteIngredient}
          />
          <h6>Directions:</h6>
          <DirectionEditList
            directions={directions}
            onDirectionSubmitted={directionSubmittedHandler}
            handleDeleteDirection={handleDeleteDirection}
          />
          <input type="submit" value="Edit Recipe" onClick={editRecipe}/>
        </form>
      </div>
    </div>
  )
}

export default RecipesEditContainer
