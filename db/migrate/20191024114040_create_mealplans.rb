class CreateMealplans < ActiveRecord::Migration[5.2]
  def change
    create_table :mealplans do |t|
      t.date :mealday, null: false

      t.belongs_to :user, null:false

      t.timestamps
    end
  end
end
