<?php
require_once 'config/database.php';
require_once 'includes/auth.php';

logout();
header('Location: login.php');
exit();
?>
