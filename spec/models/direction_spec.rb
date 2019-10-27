require 'rails_helper'

RSpec.describe Direction, type: :model do
  it { should belong_to :recipe }

  it { should have_valid(:step).when("Fry onions") }
  it { should_not have_valid(:step).when(nil, "") }
end
