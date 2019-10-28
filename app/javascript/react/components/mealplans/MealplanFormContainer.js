import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import SearchResult from "./SearchResult"
import SelectedMealPlan from "./SelectedMealPlan"
import _ from "lodash"
import ErrorList from "../ErrorList"

const MealplanFormContainer = props => {
  const [mealday, setMealday] = useState(null)
  const [recipeSearch, setRecipeSearch] = useState("")
  const [recipes, setRecipes] = useState([])
  const [selectedRecipes, setSelectedRecipes] = useState([])
  const [errors, setErrors] = useState({})

  const handleChangeDate = date => {
    setMealday(date)
  }

  const handleSearchChange = event => {
    setRecipeSearch(event.currentTarget.value)
  }

  const searchRecipe = event => {
    event.preventDefault()
    fetch('/api/v1/recipes/search.json', {
      credentials: "same-origin",
      method: 'POST',
      body: JSON.stringify({
        search_string: recipeSearch
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
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
  }

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipes([...selectedRecipes, recipe])
  }

  const recipeTiles = recipes.map(recipe => {
    return(
      <SearchResult
        key={recipe.id}
        recipe={recipe}
        handleSelectRecipe={handleSelectRecipe}
      />
    )
  })

  const validForSubmission = () => {
    let submitErrors = {}

    if(mealday === null){
      submitErrors = {
        ...submitErrors,
        ["date"]: "Please select"
      }
    }

    if(selectedRecipes.length === 0){
      submitErrors = {
        ...submitErrors,
        ["recipe"]: "Please select"
      }
    }

    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const addMealPlan = event => {
    event.preventDefault()
    if (validForSubmission()) {
      fetch('/api/v1/mealplans.json', {
        credentials: "same-origin",
        method: 'POST',
        body: JSON.stringify({
          mealday: mealday,
          recipes: selectedRecipes
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
  
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
      setRecipeSearch()
      setRecipes([])
      setErrors({})
    }
  }

  return(
    <div className="row">
      <div className="small-6 small-centered columns">
        <h2 className="text-center">Add a Meal Plan</h2>
        <form className="callout secondary">
          <label htmlFor="mealday"><strong>Date:</strong>
            <DatePicker
              selected={mealday}
              onChange={handleChangeDate}
            />
          </label>
          <label htmlFor="recipeSearch"><strong>Recipe:</strong>
            <input
              type="text"
              id="recipeSearch"
              value={recipeSearch}
              onChange={handleSearchChange}
            />
          </label>
          <button className="button" onClick={searchRecipe}>Search</button>
        </form>
        <div>
          {recipeTiles}
        </div>
      </div>
      <div className="small-6 small-centered columns">
        {mealday?(
        <SelectedMealPlan
          mealday={mealday.toLocaleDateString()}
          selectedRecipes={selectedRecipes}
        />) : (
          <SelectedMealPlan
            mealday=""
            selectedRecipes={selectedRecipes}
          />)
        }
        <button className="button" onClick={addMealPlan}>Add Mealplan</button>
      </div>
  </div>
  )

}

export default MealplanFormContainer
