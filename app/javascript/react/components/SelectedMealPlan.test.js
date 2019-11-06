import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { BrowserRouter } from 'react-router-dom'
Enzyme.configure({ adapter: new Adapter() })

import SelectedMealPlan from "./mealplans/SelectedMealPlan"
describe("SelectedMealPlan", () => {
  let wrapper,onClickMock
  let data = [
    { id: 1, name: "Burger"},
    { id: 2, name: "Pasta"}
  ]

  beforeEach(() => {
    onClickMock = jest.fn()
    wrapper = mount(
      <BrowserRouter>
        <SelectedMealPlan
          mealday="October 24, 2019"
          selectedRecipes={data}
          handleDeleteRecipe={onClickMock}
        />
      </BrowserRouter>
    )
  })

  it("renders an h5 tag with the mealplan day", () => {
    expect(wrapper.find("h5").text()).toBe("October 24, 2019")
  })

  it("should render 2 li tags", () => {
    expect(wrapper.find("li").length).toEqual(2)
  })

})
