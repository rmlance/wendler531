require 'rails_helper'

RSpec.describe Lift, type: :model do
  let!(:user1) { FactoryBot.create(:user) }
  let!(:bench_press) { Lift.create(name: "Bench Press", initial_1rm: 225, user_id: user1.id) }

  it "should validate that a record exists" do
    expect(Lift.all.length).to eq(1)
  end

  it "should allow a record to persist if all info is valid" do
    good_record = Lift.create(name: "Back Squat", initial_1rm: 265, user_id: user1.id)
    expect(good_record).to be_valid
  end

  it "should not allow a record to persist if all info is valid" do
    bad_record = Lift.create(name: "Back Squat")
    expect(bad_record).to_not be_valid
  end
end
