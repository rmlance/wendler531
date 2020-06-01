require 'rails_helper'

RSpec.describe Workout, type: :model do
  let!(:user) { FactoryBot.create(:user) }
  let!(:lift) { Lift.create(name: "Bench Press", user_id: user.id) }
  let!(:workout) { Workout.create(format: "5-3-1", projected_1rm: 225, lift_id: lift.id) }

  describe "workouts" do
    it "should validate that a workout record exists" do
      expect(Workout.all.length).to eq(1)
    end

    it "should persist a valid workout record" do
      good_record = workout
      expect(good_record).to be_valid
    end

    it "should not allow an invalid workout record to persist" do
      bad_record = Workout.create(format: "3x5")
      expect(bad_record).to_not be_valid
    end
  end
end
