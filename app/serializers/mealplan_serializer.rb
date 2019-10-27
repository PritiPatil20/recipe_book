class MealplanSerializer < ActiveModel::Serializer
  attributes :id, :day, :recipe

  belongs_to :recipe

  def day
    "#{object.mealday.strftime("%B %d, %Y")}"
  end
end
