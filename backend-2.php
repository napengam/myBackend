<?php
function exception_error_handler($errno, $errstr, $errfile, $errline) {
    throw new ErrorException($errstr, $errno, 0, $errfile, $errline);
}
set_error_handler("exception_error_handler");
$responds = (object) array();
$json = file_get_contents('php://input');
$request = json_decode($json, true);
$task = $request['task'];
try {
    if ($task == 'error') {
        $responds->task = $task;
        $responds->message = $request['message'] . '@ timestamp' . time();
        $responds->result = $request['sendValue'] + 1;
        $responds->error = 'You asked for a Fatal Error in backend';
    } else if ($task == 'timeout') {
        sleep(5);
        $responds->task = $task;
        $responds->message = $request['message'] . '@ timestamp ' . time();
        $responds->result = $request['sendValue'] + 1;
        $responds->error = 'timed out';
    } else if ($task=='chaos' ){
        $responds->task = $request['task'];
        $responds->message = 'forced divison by zero';
        $responds->result = $request['sendValue'] + 1;
        $i=1/0;
    }  else if($task=='bogus') {
       echo 'non json respond'; // should lead to an error in client
        //sleep(2);
    } else {
        $responds->task = $request['task'];
        $responds->message = $request['message'] . '@ timestamp ' . time();
        $responds->result = $request['sendValue'] + 1;
        $responds->error = '';
        //sleep(2);
    }
    echo json_encode($responds);
} catch (ErrorException $e) {
    $e->getMessage();
    $responds->error = 'Exception : ' . $e->getMessage() .'<br> in file : '. basename($e->getFile()) .'<br>at line : '. $e->getLine();
    echo json_encode($responds);
}
exit;
?>