import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { BrowserRouter } from 'react-router-dom'
Enzyme.configure({ adapter: new Adapter() })

import MealplanIndexTile from "./mealplans/MealplanIndexTile"

describe("MealplanIndexTile", () => {
  let wrapper
  let recipe = {
    name: "icecream"
  }

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <MealplanIndexTile
          day="October 24, 2019"
          recipe=recipe
        />
      </BrowserRouter>
    )
  })

  it("renders an h5 tag with the mealplan day", () => {
    expect(wrapper.find("h5").text()).toBe("October 24, 2019")
  })

  it("renders a link that will lead to an recipe show page", () => {
    expect(wrapper.find("Link").text()).toBe("icecream")
  })
})
