require 'rails_helper'

RSpec.describe Sett, type: :model do
  let!(:user) { FactoryBot.create(:user) }
  let!(:lift) { Lift.create(name: "Bench Press", initial_1rm: 225, user_id: user.id) }
  let!(:workout) { Workout.create(format: "5-3-1", projected_1rm: 225, lift_id: lift.id) }
  let!(:sett) { Sett.create(reps: 5, weight: 185, projected_1rm: 225, workout_id: workout.id) }


  describe "validates sett model" do
    it "should validate that a record exists" do
      expect(Sett.all.length).to eq(1)
    end

    it "should allow a sett record with valid attributes persist" do
      good_record = sett
      expect(good_record).to be_valid
    end

    it "should not allow an invalid sett record to persist" do
      bad_record = Sett.create(reps: 5)
      expect(bad_record).to_not be_valid
    end
  end
end
