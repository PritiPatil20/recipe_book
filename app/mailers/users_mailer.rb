class UsersMailer < ApplicationMailer

  def reminder_email(user_id,mealplan_id)
    @user = User.find(user_id)
    mealplan = Mealplan.find(mealplan_id)
    @day = mealplan.mealday
    @recipes = mealplan.recipes
    mail(   to: @user.email,
            subject: "Welcome"
    )
  end
end
