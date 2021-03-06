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
        <button className="fas fa-trash-alt" onClick={handleDeleteDirection.bind(this,direction.id)}></button>
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
