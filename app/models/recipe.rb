class Recipe < ApplicationRecord
  validates :name, presence: true

  has_many :ingredients, dependent: :destroy
  has_many :directions, dependent: :destroy
  has_many :mealrecipes
  has_many :mealplans, through: :mealrecipes

  belongs_to :user
end
