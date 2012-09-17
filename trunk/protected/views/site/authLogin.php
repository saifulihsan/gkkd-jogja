<?php
$loginUsername = isset($_POST["loginUsername"]) ? $_POST["loginUsername"] : "";
$loginUsername = "f"; 
if($loginUsername == "f"){
    echo "{success: true}";
} else {
    echo "{success: false, errors: { reason: 'Login failed. Try again.' }}";
}
?>