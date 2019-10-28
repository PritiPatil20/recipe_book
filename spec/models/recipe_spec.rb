require 'rails_helper'

RSpec.describe Recipe, type: :model do
  it { should belong_to :user }
  it { should have_many :ingredients }
  it { should have_many :directions }
  it { should have_many :mealplans }
  it { should have_many :mealrecipes }

  it { should have_valid(:name).when("Pizza") }
  it { should_not have_valid(:name).when(nil, "") }
end
