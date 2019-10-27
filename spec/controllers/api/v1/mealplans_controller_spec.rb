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
  let!(:mealplan1) { Mealplan.create(
    mealday: Time.now,
    recipe: recipe1,
    user: user1
  ) }

  describe "GET#index" do
    it "should return a list of all the mealplans" do
      sign_in user1
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json.length).to eq 1
      expect(returned_json["mealplans"][0]["day"]).to eq mealplan1.mealday.strftime("%B %d, %Y")
    end

    it "should show recipe for the mealplan" do
      sign_in user1
      get :index
      returned_json = JSON.parse(response.body)

      expect(returned_json["mealplans"][0]["recipe"]["name"]).to eq "Fried Rice"
    end
  end
end
