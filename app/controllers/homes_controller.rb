class HomesController < ApplicationController
  before_action :authenticate_user

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
end
