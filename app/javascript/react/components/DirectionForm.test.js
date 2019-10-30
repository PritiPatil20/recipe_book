import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { BrowserRouter } from 'react-router-dom'
Enzyme.configure({ adapter: new Adapter() })

import DirectionForm from "./recipes/DirectionForm"

describe("DirectionForm", () => {
  let wrapper, onClickMock, onChangeMock

  let ingredienField = {
    step: "Boil potatoes"
  }

  beforeEach(() => {
    onClickMock = jest.fn()
    onChangeMock = jest.fn()
    wrapper = mount(
      <BrowserRouter>
        <DirectionForm
          direction={ingredienField}
          directionSubmitHandler={onClickMock}
          handleDirectionChange={onChangeMock}
        />
      </BrowserRouter>
    )
  })

  it('should invoke the click function from props when clicked', () => {
    let add = wrapper.find("button")
    add.simulate("click")
    expect(onClickMock).toHaveBeenCalled()
  })

  it('should invoke the change function from props when step has changed', () => {
    let step = wrapper.find("#step")
    step.simulate("change")
    expect(onChangeMock).toHaveBeenCalled()
  })

  it('should print the step in the input field', () => {
    expect(wrapper.find("#step").props().value).toBe("Boil potatoes")
  })

})
