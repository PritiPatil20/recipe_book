class CreateMealplans < ActiveRecord::Migration[5.2]
  def change
    create_table :mealplans do |t|
      t.datetime :mealday, null: false

      t.belongs_to :recipe, null:false
      t.belongs_to :user, null:false

      t.timestamps
    end
  end
end
