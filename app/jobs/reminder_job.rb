class ReminderJob < ApplicationJob
  queue_as :default

  def perform(mealplan_id)
    mealplan = Mealplan.find(mealplan_id)
    user = User.find(mealplan.user_id)
    mail = UsersMailer.reminder_email(user.id, mealplan_id)
    mail.deliver_now
  end
end
