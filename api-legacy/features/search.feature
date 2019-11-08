Feature: Search
  Scenario: Search for authenticated User
    When I purge database
    And I load fixture
    And I create authenticated user test
    And I send a "GET" request to "/api/client/matchs?latitude=45.75&longitude=4.85"
    Then the response status code should be 200
    And the response should be in JSON
    And the header "Content-Type" should be equal to "application/json"
    And the JSON node root should have 6 element
    And the JSON node "root[0].0.username" should be equal to "Stanford0"
