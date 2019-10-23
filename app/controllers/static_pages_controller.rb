class StaticPagesController < ApplicationController
  before_action :authenticate_user!, except: [:index]
  
  def index
  end

  def new
    render :'/static_pages/index'
  end

  def edit
    render :'/static_pages/index'
  end
end
