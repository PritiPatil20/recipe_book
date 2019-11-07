class StoresController < ApplicationController
  def index
    # ip_address = request.remote_ip
    ip_address = "71.184.147.233"
    result = Geocoder.search(ip_address)
    client = GooglePlaces::Client.new(ENV['API_KEY'])
    @stores = client.spots(result.first.latitude,result.first.longitude, :types => 'grocery_or_supermarket', :radius => 5000)

    render :index
  end
end
