class User < ApplicationRecord
  validates :first_name, presence: true
  validates :last_name, presence: true

  has_many :recipes
  has_many :mealplans

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
