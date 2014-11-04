myBackend
=========

script to talk to any backend using httpRequest and JSON

A demo is locate here <a href='http://hgsweb.de/myBackend'>hgsweb.de/myBackend</a>

Flow
====

```yourVar= myBackend();```

Calling ```yourVar.callDirect(backEndScript, sendPkg, respondAction)```, the script
pushes your request parameters on a queue then issues an async request to 
the server for the very first member of that queue.

If the request finished (good or bad) the next element from the queue
is processed  until it is empty.

If you don't want to queue requests call  ```yourVar.setNoQueue(true)```

While a request is sent and not finished an invisible veil is put
on top of the html page to block any interaction by the user with the 
page. This somehow mimics a synchronius request at least for the user. 

If you don't want to block the page call ```yourVar.useVeil(false)```

By default the timeout for a single request is set to 1000ms.
You can change this value by calling  ```yourVar.setTiemut(number)```


Usage
=====

Here is an excerpt from index.html that shows the usage
```
callPhp = myBackend();
callPhp.setTimeout(3000);        
function sendToBackend() {
     var task, message;
     task = document.getElementById('task').value;
     message = document.getElementById('msg').value;
     callPhp.callDirect('backend-2.php', {'task': task, 'message': message, 'sendValue': 22000}, respondFunc2);
     function respondFunc2(pkg)
     {
         if (pkg.error !== '') {
             dialogs.myAlert(pkg.error);
         }
         document.getElementById('div').innerHTML = '<p>' + JSON.stringify(pkg);
     }
}
  ```

With the a call to 

```  
callPhp.callDirect('backend-2.php', 
{'task': task, 'message': message, 'sendValue': 22000}, 
respondFunc2);
``` 

we send  parameters as JSON (requiered) to a php backend script called backend-2.php, and 
set the name of our respond function respondFunc2 to be executed when the call is completed.

When the respond function is called it is passed a JSON (requiered) package with the answer from the server.

The definition and usage/interpretation of the content of the JSON packages is up to you .

Below is the part of the php backend file that decodes JSON in order to use the data within the php script
```
$json = file_get_contents('php://input');
$request = json_decode($json, true);
```

For the rest of the processing please have a look at backend-2.php
