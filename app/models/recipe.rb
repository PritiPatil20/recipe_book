class Recipe < ApplicationRecord
  validates :name, presence: true

  has_many :ingredients
  has_many :directions
end
