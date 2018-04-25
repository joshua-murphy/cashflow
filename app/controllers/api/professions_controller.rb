class Api::ProfessionsController < ApplicationController

  def random_profession
    @profession = Profession.all.shuffle.first
    render json: { profession: @profession }
  end

  def select_profession
    @profession = Profession.where(title: params[:title]).first
    render json: { profession: @profession }
  end

end
