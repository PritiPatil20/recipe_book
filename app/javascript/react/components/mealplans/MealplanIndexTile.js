import React from 'react'
import { Link } from 'react-router-dom'

const MealplanIndexTile = props => {
  const recipeTiles = props.mealrecipes.map(mealrecipe => {
    return(
      <li className="no-bullets" key={mealrecipe.recipe.id}>
        <Link to={`/recipes/${mealrecipe.recipe.id}`}>
          {mealrecipe.recipe.name}
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
        <h5 className="searchResult">Mealplan for {props.day}</h5>&nbsp;&nbsp;
        <Link className="fas fa-edit" to={`/mealplans/${props.id}/edit`}></Link>&nbsp;&nbsp;
        <Link className="fas fa-trash-alt" onClick={handleDelete}></Link>&nbsp;&nbsp;
        <Link className="fas fa-clipboard-list" to={`/mealplans/${props.id}`}></Link>
        <ul>{recipeTiles}</ul>
    </div>
  )
}

export default MealplanIndexTile
