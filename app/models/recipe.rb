class Recipe < ApplicationRecord
  validates :name, presence: true

  has_many :ingredients
  has_many :directions

  belongs_to :user
end
