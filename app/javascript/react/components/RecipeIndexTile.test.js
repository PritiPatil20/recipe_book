import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { BrowserRouter } from 'react-router-dom'
Enzyme.configure({ adapter: new Adapter() })

import RecipeIndexTile from "./recipes/RecipeIndexTile"

describe("RecipeIndexTile", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <RecipeIndexTile
          name="Upma"
        />
      </BrowserRouter>
    )
  })

  it("renders an h6 tag with the recipe name", () => {
    expect(wrapper.find("h4").text()).toBe("Upma")
  })

  it("renders a link that will lead to an recipe show page", () => {
    expect(wrapper.find("Link").text()).toBe("Upma")
  })
})
