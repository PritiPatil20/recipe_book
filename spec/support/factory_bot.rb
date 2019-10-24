require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:first_name) {|n| "user#{n}first_name" }
    sequence(:last_name) {|n| "user#{n}last_name" }
    sequence(:email) {|n| "user#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
  end

end
