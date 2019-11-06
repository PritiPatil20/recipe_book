import React from "react"
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { BrowserRouter } from 'react-router-dom'
Enzyme.configure({ adapter: new Adapter() })

import SearchResult from "./mealplans/SearchResult"
describe("SearchResult", () => {
  let wrapper,onClickMock
  let recipe = { id: 1, name: "Burger"}

  beforeEach(() => {
    onClickMock = jest.fn()
    wrapper = mount(
      <BrowserRouter>
        <SearchResult
          key={recipe.id}
          recipe={recipe}
          handleSelectRecipe={onClickMock}
        />
      </BrowserRouter>
    )
  })

  it("renders an h4 tag with the recipe name", () => {
    expect(wrapper.find("h4").text()).toBe("Burger")
  })

  it('should invoke the click function from props when clicked', () => {
    let add = wrapper.find("button")
    add.simulate("click")
    expect(onClickMock).toHaveBeenCalled()
  })
})
