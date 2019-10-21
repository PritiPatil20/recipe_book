import React, { useState } from "react"
import _ from "lodash"
import ErrorList from "../ErrorList"

const DirectionForm = props => {
  const [direction, setDirection] = useState({
    step: "",
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = event => {
    setDirection({
      ...direction,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const validForSubmission = () => {
    let submitErrors = {}

    const requiredFields = ["step"]

    requiredFields.forEach(field => {
      if(direction[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "can't be blank"
        }
      }
    })

    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const onSubmitHandler = event => {
    event.preventDefault()
    if (validForSubmission()) {
      props.onDirectionSubmitted(direction)
      setDirection({
        step: ""
      })
      setErrors({})
    }
  }

  return (
    <form className="callout" onSubmit={onSubmitHandler}>
      <ErrorList
        errors={errors}
      />
      <label>
        Step
        <input
          type="text"
          id="step"
          onChange={handleInputChange}
          value={direction.step}
        />
      </label>

      <input className="button" type="submit" value="Add" />
    </form>
  )
}

export default DirectionForm
