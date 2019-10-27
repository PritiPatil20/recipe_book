class Mealplan < ApplicationRecord
  validates :mealday, presence: true

  belongs_to :recipe
  belongs_to :user
end
