class Api::V1::LiftsController < ApplicationController
skip_before_action :verify_authenticity_token

  def index
    lifts = Lift.all
    render json: lifts
  end

  def show
    render json: Lift.find(params[:id]), include: '**'
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

  def update
    associated_lift = Lift.find(params[:id])
    set_updates = [params["set1"], params["set2"], params["set3"], params["reps"]]
    WorkoutComplete.new(associated_lift, set_updates).make_updates
    render json: associated_lift
  end

end
