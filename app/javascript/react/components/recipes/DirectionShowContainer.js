import React from 'react'

const DirectionShowContainer = props => {
  const directions = props.directions.map(direction => {
    return(
      <li key={direction.id}>{direction.step}</li>
    )
  })

  return(
    <div>
      <h6>Directions</h6>
      <ul>{directions}</ul>
    </div>
  )
}

export default DirectionShowContainer
