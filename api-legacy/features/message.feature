Feature: Message
  Scenario: Get message for user
    When I purge database
    And I create authenticated user test
    And I send a "GET" request to "/api/messages/new"
    Then the response status code should be 200
    And the response should be in JSON
    And the header "Content-Type" should be equal to "application/json"
    And the JSON should be equal to:
    """
    []
    """
  Scenario: Send message to user
    When I purge database
    And I create authenticated user test
    And I create user test "1"
    And I create user test "2"
    And I authenticate as "2"
    And I add "Content-Type" header equal to "application/json"
    And I add "Accept" header equal to "application/json"
    And I send a "POST" request to "/api/client/notification/check-if-exist-or-add-and-subscribe" with body:
    """
    {"endpoint":"https://fcm.googleapis.com/fcm/send/e1Zbb-QgsX4:APA91bEmsCN7ZyC6m73hJkY-J0Qx8i0UDYizeln7iRDOms7x_7MlffJt3cy6BznMUzseaocxOTmmV3q4Z11mutmA-fnw9BhkSBQjiO0RKdeTn1RzSMExx2yYgdtrMCKXS0it4MXctJ-O","expirationTime":null,"keys":{"p256dh":"BLKQTprXfzn5usCkjIZc5Lt1E1WQ2zkJWGya5biRzI_tVsHN4nyAJ9ASiX6u8Bk777iib2_1gN2MbnZ_hrR5nJI=","auth":"7KpvAAytArMyt4bWubFkMA=="}
    """
    And I authenticate as "1"
    And I add "Content-Type" header equal to "application/json"
    And I add "Accept" header equal to "application/json"
    And I send a "POST" request to "/api/message" with body:
    """
    {"id":null,"is_read":false,"created":"2019-03-28T15:35:05.593Z","sender":null,"message":"Hello","receiver":{"id":2,"email":"","password":"","created":null,"first_name":"","last_name":"","profil_url":"http://","biographie":"","intensity":null,"atmosphere":null,"learn_tags":[],"know_tags":[],"teach_tags":[],"tags":[],"messages":[],"sent_messages":null,"received_messages":null,"latitude":null,"longitude":null,"public_id":"default_avatar_200px.png","image":{"id":null,"filename":"app_img/default_avatar_200px.png","version":null,"public_id":null},"show_profil":false,"email_notifications":true,"slack_accounts":[],"user_notified":null,"notification_subscribe":false},"thread":null}
    """
    Then the response status code should be 200
    And the response should be in JSON
    And the header "Content-Type" should be equal to "application/json"
    ##And the JSON should be equal to:

