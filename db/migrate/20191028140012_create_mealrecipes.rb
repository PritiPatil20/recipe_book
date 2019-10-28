class CreateMealrecipes < ActiveRecord::Migration[5.2]
  def change
    create_table :mealrecipes do |t|
      t.belongs_to :mealplan, null: false
      t.belongs_to :recipe, null:false

      t.timestamps
    end
  end
end
