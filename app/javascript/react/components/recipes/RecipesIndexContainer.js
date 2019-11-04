import React, { useState, useEffect } from 'react'
import RecipeIndexTile from "./RecipeIndexTile"

const RecipesIndexContainer = props => {
  const [recipes, setRecipes] = useState([])
  
  useEffect(() => {
    let search = ""
    if (props.location.search) {
      search = props.location.search
    }
    fetch(`/api/v1/recipes${search}.json`)
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(body => {
      setRecipes(body.recipes)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const recipeTiles = recipes.map(recipe => {
    return(
      <RecipeIndexTile
        key={recipe.id}
        id={recipe.id}
        name={recipe.name}
      />
    )
  })
  return(
    <div>
      {recipeTiles}
    </div>
  )
}

export default RecipesIndexContainer
