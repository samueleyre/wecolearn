Feature: User create
  Scenario: Create a user
    When I purge user
    And I add "Content-Type" header equal to "application/json"
    And I add "Accept" header equal to "application/json"
    And I send a "POST" request to "/api/newuser/" with body:
    """
    {
      "id":null,
      "email":"edouard.touraille@gmail.com",
      "password":"b1otope",
      "created":null,
      "first_name":"edouard",
      "last_name":"",
      "profil_url":"http://",
      "biographie":"",
      "intensity":null,
      "atmosphere":null,
      "learn_tags":[],
      "know_tags":[],
      "teach_tags":[],
      "tags":[],
      "messages":[],
      "sent_messages":null,
      "received_messages":null,
      "latitude":null,
      "longitude":null,
      "image":{
          "id":null,
           "filename":"app_img/default_avatar_200px.png",
           "version":null,
           "public_id":null
       },
       "show_profil":false,
       "email_notifications":true,
       "slack_accounts":[],
       "user_notified":null
    }
    """
    Then the response status code should be 200
    And the response should be in JSON
    And the header "Content-Type" should be equal to "application/json"
    And the JSON nodes should be equal to:
      | email | edouard.touraille@gmail.com |
  Scenario: Create tow user with same name and try to log
    When I purge user
    And I add "Content-Type" header equal to "application/json"
    And I add "Accept" header equal to "application/json"
    And I send a "POST" request to "/api/newuser/" with body:
    """
    {
      "id":null,
      "email":"edouard.touraille@gmail.com",
      "password":"b1otope",
      "created":null,
      "first_name":"edouard",
      "last_name":"",
      "profil_url":"http://",
      "biographie":"",
      "intensity":null,
      "atmosphere":null,
      "learn_tags":[],
      "know_tags":[],
      "teach_tags":[],
      "tags":[],
      "messages":[],
      "sent_messages":null,
      "received_messages":null,
      "latitude":null,
      "longitude":null,
      "image":{
          "id":null,
           "filename":"app_img/default_avatar_200px.png",
           "version":null,
           "public_id":null
       },
       "show_profil":false,
       "email_notifications":true,
       "slack_accounts":[],
       "user_notified":null
    }
    """
    And I add "Content-Type" header equal to "application/json"
    And I add "Accept" header equal to "application/json"
    And I send a "POST" request to "/api/newuser/" with body:
    """
    {
      "id":null,
      "email":"edouard.touraille+1@gmail.com",
      "password":"b1otope",
      "created":null,
      "first_name":"edouard",
      "last_name":"",
      "profil_url":"http://",
      "biographie":"",
      "intensity":null,
      "atmosphere":null,
      "learn_tags":[],
      "know_tags":[],
      "teach_tags":[],
      "tags":[],
      "messages":[],
      "sent_messages":null,
      "received_messages":null,
      "latitude":null,
      "longitude":null,
      "image":{
          "id":null,
           "filename":"app_img/default_avatar_200px.png",
           "version":null,
           "public_id":null
       },
       "show_profil":false,
       "email_notifications":true,
       "slack_accounts":[],
       "user_notified":null
    }
    """
    Then the response status code should be 200
  Scenario: Reset Password
    When I purge database
    And I create authenticated user test
    And I add "Content-Type" header equal to "application/json"
    And I add "Accept" header equal to "application/json"
    And I send a "GET" request to "/api/resetPassword/email?email=edouard.touraille@gmail.com"
    Then the response status code should be 200
    And the response should be in JSON
    And the header "Content-Type" should be equal to "application/json"
    And the JSON nodes should be equal to:
      | success | Email envoyé |
  Scenario: Change email
    When I purge database
    And I create authenticated user test
    And I add "Content-Type" header equal to "application/json"
    And I add "Accept" header equal to "application/json"
    And I send a "POST" request to "/api/client/changesettings" with body:
    """
    {"email":"edouard@wecolearn.com"}
    """
    Then the response status code should be 200
    And the response should be in JSON
    And the header "Content-Type" should be equal to "application/json"
    And the JSON nodes should be equal to:
      | email | edouard@wecolearn.com |
  Scenario: create to user with identic email
    When I purge database
    And I add "Content-Type" header equal to "application/json"
    And I add "Accept" header equal to "application/json"
    And I send a "POST" request to "/api/newuser/" with body:
    """
    {
      "id":null,
      "email":"edouard.touraille@gmail.com",
      "password":"b1otope",
      "created":null,
      "first_name":"edouard",
      "last_name":"",
      "profil_url":"http://",
      "biographie":"",
      "intensity":null,
      "atmosphere":null,
      "learn_tags":[],
      "know_tags":[],
      "teach_tags":[],
      "tags":[],
      "messages":[],
      "sent_messages":null,
      "received_messages":null,
      "latitude":null,
      "longitude":null,
      "image":{
          "id":null,
           "filename":"app_img/default_avatar_200px.png",
           "version":null,
           "public_id":null
       },
       "show_profil":false,
       "email_notifications":true,
       "slack_accounts":[],
       "user_notified":null
    }
    """
    And I add "Content-Type" header equal to "application/json"
    And I add "Accept" header equal to "application/json"
    And I send a "POST" request to "/api/newuser/" with body:
    """
    {
      "id":null,
      "email":"edouard.touraille@gmail.com",
      "password":"b1otope",
      "created":null,
      "first_name":"edouard",
      "last_name":"",
      "profil_url":"http://",
      "biographie":"",
      "intensity":null,
      "atmosphere":null,
      "learn_tags":[],
      "know_tags":[],
      "teach_tags":[],
      "tags":[],
      "messages":[],
      "sent_messages":null,
      "received_messages":null,
      "latitude":null,
      "longitude":null,
      "image":{
          "id":null,
           "filename":"app_img/default_avatar_200px.png",
           "version":null,
           "public_id":null
       },
       "show_profil":false,
       "email_notifications":true,
       "slack_accounts":[],
       "user_notified":null
    }
    """
    Then the response status code should be 409
    And the JSON nodes should be equal to:
      | error | resource already used |
  Scenario: Subscribe to notification
    When I purge database
    And I create authenticated user test
    And I add "Content-Type" header equal to "application/json"
    And I add "Accept" header equal to "application/json"
    And I send a "POST" request to "/api/client/notification/check-if-exist-or-add-and-subscribe" with body:
    """
    {
      "endpoint":"https://fcm.googleapis.com/fcm/send/esFSIJpnOaM:APA91bF855HBTwazv3CJCOCwdMZFGajvH4namf_q-1zCniRFYw00jcOskGNWbLKSI_0ykVxZfExy-aup1YH8NuiMJC_AtjDhQNo6c9Gxb1Efj8VyUzyqNkj4YJn9YNUILBVtKeGSUJta",
      "expirationTime":null,
      "keys":{
        "p256dh":"BPD4bv6Q8gk1zBw8u0whhWNvZsqZO16N0EOfwit3m5tU5DCOyE_0JCIFe8yUiv2IwgaerRtV6mHVNUaop9u7ztA=",
        "auth":"x8Ht6Qv63y_960tjTmmudQ=="
      }
    }
    """
    Then the response status code should be 200
    And the response should be in JSON
    And the header "Content-Type" should be equal to "application/json"

