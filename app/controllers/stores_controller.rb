class StoresController < ApplicationController
  def index
    @ip_address = request.remote_ip
    @location = request.location
    @search = Geocoder.search(@ip_address)
    render :index
  end
end
