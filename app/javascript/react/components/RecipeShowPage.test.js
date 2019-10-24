import React from 'react'
import RecipeShowPage from "./recipes/RecipeShowPage"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { BrowserRouter } from 'react-router-dom'

Enzyme.configure({ adapter: new Adapter() })

describe("RecipeShowPage", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <RecipeShowPage
          id="1"
          name="Pancake"
        />
      </BrowserRouter>
    )
  })

  it("renders an h2 tag with the name of recipe", () => {
    expect(wrapper.find("h2").text()).toBe("Pancake")
  })

})
