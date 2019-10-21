import React from "react"

const DirectionList = props => {
  const directionList = props.directions.map(direction => {
    return (
      <li key={direction.step}>
        <strong>{direction.step}</strong>
      </li>
    )
  })

  return (
    <div>
      <ol>{directionList}</ol>
    </div>
  )
}

export default DirectionList
