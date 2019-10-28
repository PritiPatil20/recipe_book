require 'rails_helper'

RSpec.describe Mealrecipe, type: :model do
  it { should belong_to :recipe }
  it { should belong_to :mealplan }
end
