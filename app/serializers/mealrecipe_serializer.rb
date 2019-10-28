class MealrecipeSerializer < ActiveModel::Serializer
  attributes :id, :recipe

  belongs_to :recipe
end
