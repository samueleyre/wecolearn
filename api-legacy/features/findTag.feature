Feature: Find Tag
  Scenario: Find empty tags
    When I purge database
    And I create authenticated user test
    And I send a "GET" request to "/api/findTag?tagLetters=dev"
    Then the response status code should be 200
    And the response should be in JSON
    And the header "Content-Type" should be equal to "application/json"
    And the JSON should be equal to:
    """
    []
    """
