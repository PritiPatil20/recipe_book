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
  const [ingredient, setIngredient] = useState({
    name: "",
  })
  const [direction, setDirection] = useState({
    step: "",
  })

  const handleInputChange = event => {
    setRecipe({
      ...recipe,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }
  const handleIngredientChange = event => {
    setIngredient({
      ...ingredient,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const validIngredientSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["name"]

    requiredFields.forEach(field => {
      if(ingredient[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "of ingredient can't be blank"
        }
      }
    })

    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const ingredientSubmitHandler = event => {
    event.preventDefault()
    if (validIngredientSubmission()) {
      setIngredients([...ingredients, ingredient])
      setIngredient({
        name: ""
      })
      setErrors({})
    }
  }

  const handleDirectionChange = event => {
    setDirection({
      ...direction,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const validDirectionSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["step"]

    requiredFields.forEach(field => {
      if(direction[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "can't be blank"
        }
      }
    })

    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const directionSubmitHandler = event => {
    event.preventDefault()
    if (validDirectionSubmission()) {
      setDirections([...directions, direction])
      setDirection({
        step: ""
      })
      setErrors({})
    }
  }

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["name"]

    requiredFields.forEach(field => {
      if(recipe[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "Please enter"
        }
      }
      if(ingredients.length===0){
        submitErrors = {
          ...submitErrors,
          ["ingredients"]: "Please enter"
        }
      }
      if(directions.length===0){
        submitErrors = {
          ...submitErrors,
          ["directions"]: "Please enter"
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
      setIngredients([])
      setDirections([])
      setErrors({})
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
          <label htmlFor="name"><strong>Name:</strong>
            <input
              type="text"
              id="name"
              value={recipe.name}
              onChange={handleInputChange}
            />
          </label>
          <strong>Ingredients:</strong>
          <IngredientList ingredients={ingredients} />
          <IngredientForm
            ingredientSubmitHandler={ingredientSubmitHandler}
            handleIngredientChange={handleIngredientChange}
            ingredient={ingredient}
          />
          <strong>Directions:</strong>
          <DirectionList directions={directions} />
          <DirectionForm
            directionSubmitHandler={directionSubmitHandler}
            handleDirectionChange={handleDirectionChange}
            direction={direction}
          />
          <input className="button" type="submit" value="Add Recipe" onClick={handleSubmit} />
        </form>
      </div>
  </div>
  )
}

export default RecipesFormContainer
