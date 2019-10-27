class Api::V1::MealplansController < ApiController
  def index
    render json: Mealplan.where(user: current_user)
  end
end
