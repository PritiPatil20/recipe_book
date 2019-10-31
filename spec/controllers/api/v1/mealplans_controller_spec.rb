require "rails_helper"

RSpec.describe Api::V1::MealplansController, type: :controller do
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
    name: "Pizza",
    user: user1
  ) }
  let!(:mealplan1) { Mealplan.create(
    mealday: Time.now,
    user: user1
  ) }
  let!(:mealrecipe1) { Mealrecipe.create(
    mealplan: mealplan1,
    recipe: recipe1
  ) }

  describe "GET#index" do
    it "should return a list of all the mealplans" do
      user1.confirm
      sign_in user1
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 1
      expect(returned_json["mealplans"][0]["day"]).to eq mealplan1.mealday.strftime("%B %d, %Y")
    end

    it "should show recipe for the mealplan" do
      user1.confirm
      sign_in user1
      get :index
      returned_json = JSON.parse(response.body)

      expect(returned_json["mealplans"][0]["mealrecipes"][0]["recipe"]["name"]).to eq "Fried Rice"
    end
  end

  describe "POST#create" do
    it "creates a new mealplan" do
      user = FactoryBot.create(:user)
      user.confirm
      sign_in user
      post_json = {
        mealday: Time.now,
        recipes: [recipe1]
      }
      prev_count = Mealplan.count
      post :create, params: post_json, as: :json

      expect(Mealplan.count).to eq(prev_count + 1)
    end
  end

  describe "PUT#update" do
    it "edit a mealplan" do
      user = FactoryBot.create(:user)
      user.confirm
      sign_in user
      post_json = {
        id: mealplan1.id,
        mealday: Time.now,
        recipes: [recipe2]
      }

      prev_count = Mealplan.count
      put :update, params: post_json, as: :json
      expect(Mealplan.count).to eq(prev_count)
    end
  end
end
