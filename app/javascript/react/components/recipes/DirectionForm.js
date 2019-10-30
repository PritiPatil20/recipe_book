import React from "react"

const DirectionForm = props => {

  return (
    <div className="callout">
      <label>
        Step
        <input
          type="text"
          id="step"
          onChange={props.handleDirectionChange}
          value={props.direction.step}
        />
      </label>
      <button className="form-button" onClick={props.directionSubmitHandler}>Add</button>
    </div>
  )
}

export default DirectionForm
