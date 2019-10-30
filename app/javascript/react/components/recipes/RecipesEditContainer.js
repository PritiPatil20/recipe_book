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
  const [ingredient, setIngredient] = useState({
    name: "",
  })
  const [direction, setDirection] = useState({
    step: "",
  })
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

  const handleDeleteIngredient = id => {
    setIngredients(ingredients.filter(ingredient => ingredient.id != id))
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
      setIngredients([])
      setDirections([])
      setErrors({})
    }
  }

  if (redirectNumber) {
    return <Redirect to={`/recipes/${redirectNumber}`} />
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
            ingredientSubmitHandler={ingredientSubmitHandler}
            handleDeleteIngredient={handleDeleteIngredient}
            handleIngredientChange={handleIngredientChange}
            ingredient={ingredient}
          />
          <h6>Directions:</h6>
          <DirectionEditList
            directions={directions}
            directionSubmitHandler={directionSubmitHandler}
            handleDeleteDirection={handleDeleteDirection}
            handleDirectionChange={handleDirectionChange}
            direction={direction}
          />
          <input className="form-button" type="submit" value="Edit Recipe" onClick={editRecipe}/>
        </form>
      </div>
    </div>
  )
}

export default RecipesEditContainer
