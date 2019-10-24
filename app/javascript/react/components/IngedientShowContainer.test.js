import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { BrowserRouter } from 'react-router-dom'
Enzyme.configure({ adapter: new Adapter() })
import { act } from "react-dom/test-utils"

import IngredientShowContainer from "./recipes/IngredientShowContainer"

describe("IngredientShowContainer", () => {
  let wrapper
  let data = [
    { id: 1, name: "onion"},
    { id: 2, name: "potato"}
  ]

  beforeEach(() => {
    act(() => {
      wrapper = mount(<IngredientShowContainer ingredients={data} />)
    })
  })

  it("should render 2 li tags", () => {
    expect(wrapper.find("li").length).toEqual(2)
  })
})
