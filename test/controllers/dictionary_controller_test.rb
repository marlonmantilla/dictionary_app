require "test_helper"

class DictionaryControllerTest < ActionDispatch::IntegrationTest
  test 'assert_react_component' do
    get '/dictionary'
    assert_equal 200, response.status
    assert_react_component "Dictionary"
  end

  test 'assert_add_word' do
    post '/dictionary', params: { dictionary: { word: "Ahoy!" } }, as: :json
    assert_equal 200, response.status
    data = JSON.parse response.body
    assert_includes data["dictionary"], "Ahoy!"
  end

  test 'assert_remove_word' do
    post '/dictionary/delete', params: { dictionary: { word: "Ahoy!" } }, as: :json
    assert_equal 200, response.status
    data = JSON.parse response.body
    assert_not_includes data["dictionary"], "Ahoy!"
  end
end
