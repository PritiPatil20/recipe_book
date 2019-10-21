class Api::V1::RecipesController < ApiController
  def index
    render json: Recipe.all
  end

  def create
    recipe = Recipe.new(recipe_params)
    if recipe.save
      ingredientList = params.require(:ingredients).map{|ingredient|
        Ingredient.create(name: ingredient[:name], recipe: recipe)
      }
      directionList = params.require(:directions).map{|direction|
        Direction.create(step: direction[:step], recipe: recipe)
      }
      render json: {
        recipe: recipe,
        ingredientList: ingredientList,
        directionList: directionList
      }
    else
      render json: {
        errors: recipe.errors.messages,
        fields: recipe
      }
    end
  end

  def show
    recipe = Recipe.find(params[:id])
    render json: {
      recipe: recipe,
      ingredients: recipe.ingredients,
      directions: recipe.directions,
    }
  end

  def update
    binding.pry
    recipe = Recipe.find(params[:id])
    Ingredient.where(recipe: recipe).delete_all
    Direction.where(recipe: recipe).delete_all
    if recipe.update(recipe_params)
      ingredientList = params.require(:ingredients).map{|ingredient|
      Ingredient.create(name: ingredient[:name], recipe: recipe)
    }
    directionList = params.require(:directions).map{|direction|
      Direction.create(step: direction[:step], recipe: recipe)
    }
    render json: {
      recipe: recipe,
      ingredientList: ingredientList,
      directionList: directionList
    }
    else
      render json: {
        errors: recipe.errors.messages,
        fields: recipe
      }
    end
  end

  private

  def recipe_params
    params.require(:recipe).permit(:name)
  end
end
