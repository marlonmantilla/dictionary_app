module DictionaryManager
  extend ActiveSupport::Concern
  FILE_PATH = "#{Rails.root}/public/dictionary.txt".freeze

  def read_dictionary
    file = File.read FILE_PATH
    @dictionary = @dictionary || file.split
  end

  def add_to_dictionary(word:)
    lookup = word.strip.downcase
    return if @dictionary.map(&:downcase).include? lookup

    @dictionary << word
    File.write(FILE_PATH, @dictionary.join("\n"), mode: "w")
  end

  def remove_from_dictionary(word:)
    lookup = word.strip.downcase
    return unless @dictionary.map(&:downcase).include? lookup

    @dictionary = @dictionary.delete_if {|w| w.downcase == lookup}
    File.write(FILE_PATH, @dictionary.join("\n"), mode: "w")
  end
end
