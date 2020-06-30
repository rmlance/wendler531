class HomesController < ApplicationController
  before_action :authenticate_user
  before_action :new_user?

  def index
  end

  def authenticate_user
    if request.path == "/"
      if user_signed_in? == false
        flash[:notice] = "You must sign in or create an account to access your workout data."
        redirect_to new_user_session_path
      end
    end
  end

  def new_user?
    if current_user.lifts.empty?
      flash[:notice] = "Thanks for joining the Wendler community!"
    end
  end
end
