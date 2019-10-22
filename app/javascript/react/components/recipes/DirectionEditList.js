import React from "react"
import DirectionForm from "./DirectionForm"

const DirectionEditList = props => {

  const handleDeleteDirection = (step) => {
    props.handleDeleteDirection(step)
  }

  const directionList = props.directions.map(direction => {
    return (
      <li key={direction.id}>
        <strong>{direction.step}</strong>&nbsp;&nbsp;
        <button className="button" onClick={handleDeleteDirection.bind(this,direction.id)}>Delete</button>
      </li>
    )
  })

  return (
    <div>
      <ul>{directionList}</ul>
      <DirectionForm
        directionSubmitHandler={props.directionSubmitHandler}
        handleDirectionChange={props.handleDirectionChange}
        direction={props.direction}
      />
    </div>
  )
}

export default DirectionEditList
