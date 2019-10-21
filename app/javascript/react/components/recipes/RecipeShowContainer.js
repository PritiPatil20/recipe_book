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

  const updateRecipe = event => {
    setRedirectNumber(recipeId)
  }

  if (redirectNumber) {
    return <Redirect to={`/recipes/${redirectNumber}/edit`} />
  }

  const deleteRecipe = event => {

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
        <IngredientShowContainer
          ingredients={ingredients}
        />
      </div>
      <div>
        <DirectionShowContainer
          directions={directions}
        />
      </div>
      <button className="button" onClick={updateRecipe}>Edit</button>&nbsp;
      <button className="button" onClick={deleteRecipe}>Delete</button><br/>
      <Link to="/">Home</Link>
    </div>
  )
}

export default RecipeShowContainer
