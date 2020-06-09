class Api::V1::LiftsController < ApplicationController
skip_before_action :verify_authenticity_token

  def index
    lifts = Lift.all
    render json: lifts
  end

  def create
    new_weight_array = [params["squat"], params["bench"], params["deadlift"], params["press"]]
    if Lift.all.empty?
      ProgressionBuilder.new(new_weight_array).build_progression
    else
      ProgressionBuilder.new(new_weight_array).build_workouts
    end
    lifts = Lift.all
    render json:lifts
  end

end
