import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import RecipesIndexContainer from "./recipes/RecipesIndexContainer"
import RecipesFormContainer from "./recipes/RecipesFormContainer"
import RecipeShowContainer from "./recipes/RecipeShowContainer"
import RecipesEditContainer from "./recipes/RecipesEditContainer"
import MealplansIndexContainer from "./mealplans/MealplansIndexContainer"
import MealplanFormContainer from "./mealplans/MealplanFormContainer"

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={RecipesIndexContainer} />
        <Route exact path="/recipes" component={RecipesIndexContainer} />
        <Route exact path="/recipes/new" component={RecipesFormContainer} />
        <Route exact path="/recipes/:id" component={RecipeShowContainer} />
        <Route exact path="/recipes/:id/edit" component={RecipesEditContainer} />
        <Route exact path="/mealplans" component={MealplansIndexContainer} />
        <Route exact path="/mealplans/new" component={MealplanFormContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
