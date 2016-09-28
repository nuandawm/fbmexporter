<?php
/**
 * Created by PhpStorm.
 * User: danna
 * Date: 28/09/2016
 * Time: 10:23
 */
require_once __DIR__ . '/vendor/autoload.php';

$helper = $fb->getRedirectLoginHelper();
try {
  $accessToken = $helper->getAccessToken();
} catch(Facebook\Exceptions\FacebookResponseException $e) {
  // When Graph returns an error
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
  // When validation fails or other local issues
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}

if (isset($accessToken)) {
  // Logged in!
  $_SESSION['facebook_access_token'] = (string) $accessToken;

  echo "Puppa ".$accessToken;
  // Now you can redirect to another page and use the
  // access token from $_SESSION['facebook_access_token']
}