<?php
/**
 * Created by PhpStorm.
 * User: danna
 * Date: 28/09/2016
 * Time: 09:43
 */

require_once __DIR__ . '/vendor/autoload.php';

$fb = new Facebook\Facebook([
  'app_id' => '781751771966575',
  'app_secret' => 'c5b6e0ebaa233b5c018e4e38b177ff82',
  'default_graph_version' => 'v2.7',
]);

$helper = $fb->getRedirectLoginHelper();
$permissions = ['email', 'read_mailbox'];
$loginUrl = $helper->getLoginUrl('http://localhost/fbmessagesexporter/login-callback.php', $permissions);

echo '<a href="' . $loginUrl . '">Log in with Facebook!</a>';