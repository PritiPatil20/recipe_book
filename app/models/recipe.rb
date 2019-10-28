class Recipe < ApplicationRecord
  validates :name, presence: true

  has_many :ingredients
  has_many :directions
  has_many :mealrecipes
  has_many :mealplans, through: :mealrecipes

  belongs_to :user
end
