class Api::V1::LiftsController < ApplicationController

  def index
    lifts = Lift.all
    render json: lifts
  end
end
