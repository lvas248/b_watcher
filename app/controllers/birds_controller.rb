class BirdsController < ApplicationController


    def index
        render json: Bird.all.order(:name), status: :ok
    end

    private



end


