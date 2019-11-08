Feature: Profile
  Scenario: Get some user profil
    When I purge database
    And I load fixture
    And I add "Content-Type" header equal to "application/json"
    And I add "Accept" header equal to "application/json"
    And I send a "GET" request to "/api/profile/Stanford"
    Then the response status code should be 200
    And the response should be in JSON
    And the header "Content-Type" should be equal to "application/json"
    And the JSON nodes should be equal to:
      | first_name | Stanford |
