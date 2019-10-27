require 'rails_helper'

RSpec.describe Mealplan, type: :model do
  it { should belong_to :user }
  it { should belong_to :recipe }

  it { should have_valid(:mealday).when(Time.now) }
  it { should_not have_valid(:mealday).when(nil, "") }
end
