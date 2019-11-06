import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { BrowserRouter } from 'react-router-dom'
Enzyme.configure({ adapter: new Adapter() })

import MealplanIndexTile from "./mealplans/MealplanIndexTile"

describe("MealplanIndexTile", () => {
  let wrapper
  let recipe1 = { id: 1, recipe: "recipe1"}
  let recipe2 = { id: 2, name: "Pasta"}
  let data = [
    { recipe: recipe1},
    { recipe: recipe2}
  ]

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <MealplanIndexTile
          key="1"
          id="1"
          day="October 24, 2019"
          mealrecipes={data}
        />
      </BrowserRouter>
    )
  })

  it("renders an h3 tag with the mealplan day", () => {
    expect(wrapper.find("h3").text()).toBe("Mealplan for October 24, 2019")
  })

  it("should render 1 li tags", () => {
    expect(wrapper.find("li").length).toEqual(2)
  })
})
