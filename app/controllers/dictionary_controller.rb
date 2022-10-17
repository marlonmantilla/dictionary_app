class DictionaryController < ApplicationController
  include DictionaryManager
  before_action :read_dictionary

  def index
    render component: "Dictionary", props: { dictionary: @dictionary }
  end

  def create
    word = dictionary_params[:word]
    add_to_dictionary(word: word)

    render json: { dictionary: @dictionary }, status: :ok
  end

  def delete
    word = dictionary_params[:word]
    word = word.strip.downcase

    remove_from_dictionary(word: word)

    render json: { dictionary: @dictionary }, status: :ok
  end

  private
  def dictionary_params
    params.require(:dictionary).permit(:word)
  end
end
