require 'rails_helper'

RSpec.describe Ingredient, type: :model do
  it { should belong_to :recipe }

  it { should have_valid(:name).when("garlic") }
  it { should_not have_valid(:name).when(nil, "") }
end
