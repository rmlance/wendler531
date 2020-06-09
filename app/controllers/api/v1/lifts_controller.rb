class Api::V1::LiftsController < ApplicationController
skip_before_action :verify_authenticity_token

  def index
    lifts = Lift.all
    render json: lifts
  end

  def create
    new_weight_array = [params["squat"], params["bench"], params["deadlift"], params["press"]]
    ProgressionBuilder.new(new_weight_array).build_progression
    lifts = Lift.all
    render json:lifts
  end

end
