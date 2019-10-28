class Mealplan < ApplicationRecord
  validates :mealday, presence: true

  belongs_to :user
  has_many :mealrecipes
  has_many :recipes, through: :mealrecipes
end
