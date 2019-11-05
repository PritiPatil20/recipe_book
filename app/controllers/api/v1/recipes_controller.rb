class Api::V1::RecipesController < ApiController
  before_action :authenticate_user!, except: [:index, :show]

  def index
    if params["/recipes"]
      if params["/recipes"][:name] == ""
        recipes = Recipe.all
      else
        recipes = Recipe.where("name ILIKE ?", "%#{params["/recipes"][:name]}%")
        if recipes.length==0
          recipes = Recipe.where(id:[Ingredient.select(:recipe_id).where("name ILIKE ?", "%#{params["/recipes"][:name]}%")])
        end
      end
    else
      recipes = Recipe.all
    end
    render json: recipes
  end

  def create
    recipe = Recipe.new(
      name: params["name"],
      recipe_photo: params["recipe_photo"],
      user: current_user
    )
    if recipe.save
      ingredientList = JSON.parse(params["ingredients"]).map{|ingredient|
        Ingredient.create!(name: ingredient["name"], recipe: recipe)
      }
      directionList = JSON.parse(params["directions"]).map{|direction|
        Direction.create(step: direction["step"], recipe: recipe)
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
      current_user: current_user
    }
  end

  def update
    recipe = Recipe.find(params[:id])
    Ingredient.where(recipe: recipe).delete_all
    Direction.where(recipe: recipe).delete_all
    if(recipe.update(name: params["name"], recipe_photo: params["recipe_photo"], user: current_user))
      ingredientList = JSON.parse(params["ingredients"]).map{|ingredient|
        Ingredient.create(name: ingredient["name"], recipe: recipe)
      }
      directionList = JSON.parse(params["directions"]).map{|direction|
        Direction.create(step: direction["step"], recipe: recipe)
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

  def search
    recipes = []
    recipes = Recipe.where("name ILIKE ?", "%#{params['search_string']}%")
    if recipes.length==0
      recipes = Recipe.where(id:[Ingredient.select(:recipe_id).where("name ILIKE ?", "%#{params['search_string']}%")])
    end
    render json: recipes
  end

  def destroy
    recipe = Recipe.find(params[:id])
    recipe.destroy
    recipes = Recipe.all

    render json: recipes
  end

  private

  def recipe_params
    params.require(:recipe).permit(:name)
  end
end
