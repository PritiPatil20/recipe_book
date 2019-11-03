class StoresController < ApplicationController
  def index
    ip_address = request.remote_ip
    search = Geocoder.search(ip_address)
    client = GooglePlaces::Client.new("AIzaSyDVoRwOYkVV_9S6WNDIBW7rAr80niME_hA")
    @stores = client.spots(42.4851,-71.4328, :types => 'grocery_or_supermarket', :radius => 5000)

    render :index
  end
end
