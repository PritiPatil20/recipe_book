class Api::V1::MealplansController < ApiController
  def index
    mealplans = Mealplan.where(user: current_user).order(:mealday)
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

  def show
    mealplan = Mealplan.find(params[:id])
    render json: {
      mealday: mealplan.mealday,
      recipes: mealplan.recipes
    }
  end

  def update
    mealplan = Mealplan.find(params[:id])
    Mealrecipe.where(mealplan: mealplan).delete_all
    if mealplan.update(mealday: params.require(:mealday))
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
