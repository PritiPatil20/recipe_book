import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import SearchResult from "./SearchResult"
import SelectedMealPlan from "./SelectedMealPlan"
import _ from "lodash"
import ErrorList from "../ErrorList"
import { Redirect } from "react-router-dom"

const MealplanFormContainer = props => {
  const [mealday, setMealday] = useState(null)
  const [recipeSearch, setRecipeSearch] = useState("")
  const [recipes, setRecipes] = useState([])
  const [selectedRecipes, setSelectedRecipes] = useState([])
  const [errors, setErrors] = useState({})
  const [redirectNumber, setRedirectNumber] = useState(null)

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
        setRedirectNumber(body.mealplan.id)
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
      setRecipeSearch()
      setRecipes([])
      setErrors({})
    }
  }

  if (redirectNumber) {
    return <Redirect to={`/mealplans`} />
  }

  const handleDeleteRecipe = id => {
    setSelectedRecipes(selectedRecipes.filter(recipe => recipe.id != id))
  }

  return(
    <div className="row">
      <div className="small-6 small-centered columns">
        <h2 className="text-center">Add a Meal Plan</h2>
        <form className="callout secondary">
          <ErrorList
            errors={errors}
          />
          <label htmlFor="mealday"><h5><strong>Date:</strong></h5>
            <DatePicker
              selected={mealday}
              onChange={handleChangeDate}
              minDate={new Date()}
            />
          </label>
          <label htmlFor="recipeSearch"><h5><strong>Recipe:</strong></h5>
            <input
              type="text"
              id="recipeSearch"
              value={recipeSearch}
              onChange={handleSearchChange}
            />
          </label>
          <button className="form-button" onClick={searchRecipe}>Search</button>
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
          handleDeleteRecipe={handleDeleteRecipe}
        />) : (
          <SelectedMealPlan
            mealday=""
            selectedRecipes={selectedRecipes}
            handleDeleteRecipe={handleDeleteRecipe}
          />)
        }
        <div className="text-center">
          <button className="form-button" onClick={addMealPlan}>Add Mealplan</button>
        </div>
      </div>
  </div>
  )

}

export default MealplanFormContainer
