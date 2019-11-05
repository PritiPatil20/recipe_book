class AddRecipePhotoToRecipe < ActiveRecord::Migration[5.2]
  def up
    add_column :recipes, :recipe_photo, :string
  end
  def down
    remove_column :recipes, :recipe_photo
  end
end
