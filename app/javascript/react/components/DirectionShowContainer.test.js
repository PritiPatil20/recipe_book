import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { BrowserRouter } from 'react-router-dom'
Enzyme.configure({ adapter: new Adapter() })
import { act } from "react-dom/test-utils"

import DirectionShowContainer from "./recipes/DirectionShowContainer"

describe("DirectionShowContainer", () => {
  let wrapper
  let data = [
    { id: 1, step: "saute vegetables"},
    { id: 2, step: "add garam masala"}
  ]

  beforeEach(() => {
    act(() => {
      wrapper = mount(<DirectionShowContainer directions={data} />)
    })
  })

  it("should render 2 li tags", () => {
    expect(wrapper.find("li").length).toEqual(2)
  })
})
