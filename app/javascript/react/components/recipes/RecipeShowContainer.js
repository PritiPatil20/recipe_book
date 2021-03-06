import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import RecipeShowPage from './RecipeShowPage'
import IngredientShowContainer from './IngredientShowContainer'
import DirectionShowContainer from './DirectionShowContainer'

const RecipeShowContainer = props => {
  const [recipe, setRecipe] = useState({
    name: ""
  })
  const [ingredients,setIngredients] = useState([])
  const [directions,setDirections] = useState([])
  const [redirectNumber, setRedirectNumber] = useState(null)
  const [redirectDelete, setRedirectDelete] = useState(null)
  const [currentUser, setCurrentUser] = useState({})
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
      setCurrentUser(body.current_user)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const updateRecipe = event => {
    setRedirectNumber(recipeId)
  }

  if (redirectNumber) {
    return <Redirect to={`/recipes/${redirectNumber}/edit`} />
  }

  let showButton = "hideEditButton"
  if (currentUser) {
    if(currentUser.id === recipe.user_id){
      showButton = "showEditButton"
    }
  }

  let showDelete = "hideDeleteButton"
  if (currentUser) {
    if(currentUser.role === "admin"){
      showDelete = "showDeleteButton"
    }
  }

  const handleBackButton = event => {
    event.preventDefault()
    history.back()
  }

  const handleDelete = event => {
    let id = recipe.id
    fetch(`/api/v1/recipes/${id}`, {
      credentials: "same-origin",
      method: 'DELETE',
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
      setRedirectDelete(true)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  if (redirectDelete) {
    return <Redirect to={`/`} />
  }

  let photo_url = ""
  if(recipe.recipe_photo){
    photo_url=recipe.recipe_photo.url
  }

  return (
    <div className="row">
      <div className="small-6 small-centered columns">
        <br/><br/>
        <img src={photo_url} />
      </div>
      <div className="small-6 small-centered columns">
        <div>
          <br/><br/>
          <RecipeShowPage
            id={recipe.id}
            name={recipe.name}
          />
        </div>
        <div>
          <strong>Ingredients</strong>
          <IngredientShowContainer
            ingredients={ingredients}
          />
        </div>
        <div>
          <strong>Directions</strong>
          <DirectionShowContainer
            directions={directions}
          />
        </div>
        <button className={`form-button ${showButton}`} onClick={updateRecipe}>Edit</button>&nbsp;
        <button className={`form-button ${showDelete}`} onClick={handleDelete}>Delete</button>&nbsp;
        <button className="form-button" onClick={handleBackButton}>Back</button>
      </div>
    </div>
  )
}

export default RecipeShowContainer
