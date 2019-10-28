class Api::V1::MealplansController < ApiController
  def index
    mealplans = Mealplan.where(user: current_user)
    render json: mealplans
  end

  def create
    mealplan = Mealplan.new(mealday: params.require(:mealday))
    mealplan.user = current_user
    if mealplan.save
      mealrecipeList = params.require(:recipes).map{|recipe|
        recipe1 = Recipe.find(recipe["id"])
        Mealrecipe.create(mealplan: mealplan, recipe: recipe1)
      }
      render json: {
        mealplan: mealplan,
      }
    else
      render json: {
        errors: mealplan.errors.messages
      }
    end
  end
end
