require 'rails_helper'

RSpec.describe Api::V1::LiftsController, type: :controller do
  let!(:user) { FactoryBot.create(:user) }
  let!(:lift) { Lift.create(name: "Bench Press", user_id: user.id) }

  describe "GET#index" do
    it "returns a sucessful response status and a content type of json" do
      get :index

      expect(response.status).to eq 200
      expect(response.content_type).to eq 'application/json'
    end

    it "returns all stocks in the database" do
      sign_in user

      get :index

      response_body = JSON.parse(response.body)

      expect(response_body[0].length).to eq 3

      expect(response_body[0]["id"]).to eq lift.id
      expect(response_body[0]["name"]).to eq lift.name
    end
  end
end
