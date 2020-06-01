require 'rails_helper'

RSpec.describe Lift, type: :model do
  let!(:user) { Factorybot.create(:user) }
  let!(:bench_press) { Lift.create(name: "Bench Press", user_id: user) }

  it "should validate that a record exists" do
    expect(bench_press).to exist
  end

  it "should allow a record to persist if all info is valid" do
    good_record = Lift.create(name: "Back Squat", user_id: user)
    expect(good_record).to be_valid
  end

  it "should not allow a record to persist if all info is valid" do
    bad_record = Lift.create(name: "Back Squat")
    expect(bad_record).to_not be_valid
  end
end
