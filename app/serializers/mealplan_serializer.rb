class MealplanSerializer < ActiveModel::Serializer
  attributes :id, :day

  has_many :mealrecipes
  def day
    "#{object.mealday.strftime("%B %d, %Y")}"
  end
end
