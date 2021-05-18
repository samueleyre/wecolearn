<?php

namespace App\Services\User\Constant;


class TokenConstant {
  public static $types = [
    "CONFIRMEMAIL" => 0,
    "CONFIRMEMAILPASSWORD" => 1,
    "ANDROID_NOTIFICATION_SUBSCRIPTION" => 2,
    "COMMUNITY_INVITE" => 3,
  ];
}
