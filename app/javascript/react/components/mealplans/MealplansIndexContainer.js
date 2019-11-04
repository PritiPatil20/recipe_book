import React, { useState, useEffect } from 'react'
import MealplanIndexTile from "./MealplanIndexTile"

const MealplansIndexContainer = props => {
  const [mealplans, setMealplans] = useState([])

  useEffect(() => {
    fetch('/api/v1/mealplans.json', {
      credentials: 'same-origin',
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
      setMealplans(body.mealplans)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const handleDelete = id => {
    fetch(`/api/v1/mealplans/${id}`, {
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
      setMealplans(body.mealplans)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  const mealplanTiles = mealplans.map(mealplan => {
    return(
      <MealplanIndexTile
        key={mealplan.id}
        id={mealplan.id}
        day={mealplan.day}
        mealrecipes={mealplan.mealrecipes}
        handleDelete={handleDelete}
      />
    )
  })
  return(
    <div>
      <br/><br/><br/>
      {mealplanTiles}
    </div>
  )
}

export default MealplansIndexContainer
