class Api::V1::LiftsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  # before_action :authenticate_user

  def index
    lifts = current_user.lifts
    render json: lifts
  end

  def show
    render json: Lift.find(params[:id]), include: '**'
  end

  def create
    if params["new_max"]
      binding.pry
      let new_max = params["new_max"]
      SingleBuild.new(new_max, current_user)
    else
      new_weight_array = [params["squat"], params["bench"], params["deadlift"], params["press"]]
      if current_user.lifts.all.empty?
        ProgressionBuilder.new(new_weight_array, current_user).build_progression
      else
        ProgressionBuilder.new(new_weight_array, current_user).build_workouts
      end
    end
    lifts = current_user.lifts.all
    render json: lifts
  end

  def update
    associated_lift = Lift.find(params[:id])
    set_updates = [params["set1"], params["set2"], params["set3"], params["reps"]]
    WorkoutComplete.new(associated_lift, set_updates).make_updates
    render json: associated_lift
  end

  protected

  def authenticate_user
    if !user_signed_in?
      render json: { error: "You do not have access to this action."}
      redirect_to new_user_session_path
    end
  end
end
