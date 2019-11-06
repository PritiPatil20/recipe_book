import React from 'react'
import { Link } from 'react-router-dom'

const MealplanIndexTile = props => {
  const recipeTiles = props.mealrecipes.map(mealrecipe => {
    return(
      <li className="no-bullets recipe-name-index" key={mealrecipe.recipe.id}>
        <Link to={`/recipes/${mealrecipe.recipe.id}`}>
          <h4 className="recipe-name-index">{mealrecipe.recipe.name}</h4>
        </Link>
      </li>
    )
  })

  const handleDelete = event => {
    event.preventDefault()
    props.handleDelete(props.id)
  }

  return(
    <div className="text-center">
        <h3 className="searchResult recipe-name-index">Mealplan for {props.day}</h3>&nbsp;&nbsp;
        <Link className="fas fa-edit" to={`/mealplans/${props.id}/edit`}></Link>&nbsp;&nbsp;
        <Link className="fas fa-trash-alt" onClick={handleDelete}></Link>&nbsp;&nbsp;
        <ul>{recipeTiles}</ul>
    </div>
  )
}

export default MealplanIndexTile
