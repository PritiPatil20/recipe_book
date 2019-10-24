require "rails_helper"

RSpec.describe Api::V1::RecipesController, type: :controller do
  let!(:user1) { User.create(
    first_name: "Jay",
    last_name: "Karasawa",
    email: "john@gmail.com",
    password: "john123"
  ) }
  let!(:recipe1) { Recipe.create(
    name: "Fried Rice",
    user: user1
  ) }
  let!(:recipe2) { Recipe.create(
    name: "Fried chicken",
    user: user1
  ) }
  let!(:ingredient1) { Ingredient.create(
    name: "rice",
    recipe: recipe1
  ) }
  let!(:ingredient2) { Ingredient.create(
    name: "onions",
    recipe: recipe1
  ) }
  let!(:direction1) { Direction.create(
    step: "Saute vegetables",
    recipe: recipe1
  ) }
  let!(:direction2) { Direction.create(
    step: "Add soya sauce",
    recipe: recipe1
  ) }

  describe "GET#index" do
    it "should return a list of all the recipes" do
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 2

      expect(returned_json[0]["name"]).to eq "Fried Rice"

      expect(returned_json[1]["name"]).to eq "Fried chicken"
    end
  end

  describe "GET/show" do
    it "should return an individual recipe" do
      get :show, params: {id: recipe1.id}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 3
      expect(returned_json["recipe"]["name"]).to eq "Fried Rice"
    end

    it "should show ingredients for the selected recipe" do
      get :show, params: {id: recipe1.id}
      returned_json = JSON.parse(response.body)

      expect(returned_json["ingredients"][0]["name"]).to eq "rice"
      expect(returned_json["ingredients"][1]["name"]).to eq "onions"
    end

    it "should show directions for the selected recipe" do
      get :show, params: {id: recipe1.id}
      returned_json = JSON.parse(response.body)

      expect(returned_json["directions"][0]["step"]).to eq "Saute vegetables"
      expect(returned_json["directions"][1]["step"]).to eq "Add soya sauce"
    end
  end

  describe "POST#create" do
    it "creates a new recipe" do
      user = FactoryBot.create(:user)
      sign_in user
      post_json = {
        recipe: {
          name: "Onion Fritters"
        },
        ingredients: [
          {
            name: "Onions"
          },
          {
            name: "Chickpea Flour"
          }
        ],
        directions: [
          {
            step: "Cut onions into thin slices"
          },
          {
            name: "Add all spices"
          }
        ]
      }

      prev_count = Recipe.count
      post :create, params: post_json, format: :json
      expect(Recipe.count).to eq(prev_count + 1)
    end

    it "returns the json of the newly posted recipe" do
      user = FactoryBot.create(:user)
      sign_in user
      post_json = {
        recipe: {
          name: "Onion Fritters"
        },
        ingredients: [
          {
            name: "Onions"
          },
          {
            name: "Chickpea Flour"
          }
        ],
        directions: [
          {
            step: "Cut onions into thin slices"
          },
          {
            step: "Add all spices"
          }
        ]
      }

      post :create, params: post_json, format: :json
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["recipe"]["name"]).to eq "Onion Fritters"
      expect(returned_json["ingredientList"][0]["name"]).to eq "Onions"
      expect(returned_json["ingredientList"][1]["name"]).to eq "Chickpea Flour"
      expect(returned_json["directionList"][0]["step"]).to eq "Cut onions into thin slices"
      expect(returned_json["directionList"][1]["step"]).to eq "Add all spices"
    end
  end

  describe "PUT#update" do
    it "edit a recipe" do
      user = FactoryBot.create(:user)
      sign_in user
      post_json = {
        id: recipe1.id,
        recipe: {
          name: "Potato Fritters"
        },
        ingredients: [
          {
            name: "Potato"
          },
          {
            name: "Chickpea Flour"
          }
        ],
        directions: [
          {
            step: "Cut potatoes into thin slices"
          },
          {
            name: "Add all spices"
          }
        ]
      }

      prev_count = Recipe.count
      put :update, params: post_json, format: :json
      expect(Recipe.count).to eq(prev_count)
    end

    it "returns the json of the updated ecipe" do
      user = FactoryBot.create(:user)
      sign_in user
      post_json = {
        id: recipe1.id,
        recipe: {
          name: "Potato Fritters"
        },
        ingredients: [
          {
            name: "Potato"
          },
          {
            name: "Chickpea Flour"
          }
        ],
        directions: [
          {
            step: "Cut potatoes into thin slices"
          },
          {
            step: "Add all spices"
          }
        ]
      }

      put :update, params: post_json, format: :json
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["recipe"]["name"]).to eq "Potato Fritters"
      expect(returned_json["ingredientList"][0]["name"]).to eq "Potato"
      expect(returned_json["ingredientList"][1]["name"]).to eq "Chickpea Flour"
      expect(returned_json["directionList"][0]["step"]).to eq "Cut potatoes into thin slices"
      expect(returned_json["directionList"][1]["step"]).to eq "Add all spices"
    end
  end
end
