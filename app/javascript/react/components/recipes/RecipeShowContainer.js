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

  return (
    <div>
      <div>
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
      <button className={`button ${showButton}`} onClick={updateRecipe}>Edit</button>&nbsp;
      <Link to="/">Home</Link>
    </div>
  )
}

export default RecipeShowContainer
