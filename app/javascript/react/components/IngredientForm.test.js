import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { BrowserRouter } from 'react-router-dom'
Enzyme.configure({ adapter: new Adapter() })

import IngredientForm from "./recipes/IngredientForm"

describe("IngredientForm", () => {
  let wrapper, onClickMock, onChangeMock

  let ingredienField = {
    name: "Tomato"
  }

  beforeEach(() => {
    onClickMock = jest.fn()
    onChangeMock = jest.fn()
    wrapper = mount(
      <BrowserRouter>
        <IngredientForm
          ingredient={ingredienField}
          ingredientSubmitHandler={onClickMock}
          handleIngredientChange={onChangeMock}
        />
      </BrowserRouter>
    )
  })

  it('should invoke the click function from props when clicked', () => {
    let add = wrapper.find("button")
    add.simulate("click")
    expect(onClickMock).toHaveBeenCalled()
  })

  it('should invoke the change function from props when name has changed', () => {
    let name = wrapper.find("#name")
    name.simulate("change")
    expect(onChangeMock).toHaveBeenCalled()
  })

  it('should print the name in the input field', () => {
    expect(wrapper.find("#name").props().value).toBe("Tomato")
  })

})
