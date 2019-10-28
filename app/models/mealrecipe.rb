class Mealrecipe < ApplicationRecord
  belongs_to :recipe
  belongs_to :mealplan
end
