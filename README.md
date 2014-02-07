myBackend
=========

script to talk to any backend using httpRequest and JSON

Flow
====

This script pushes your request on a queue then issues 
an async request to the server for the very first member of that
queue.

If the request finished (good or bad) the next element from the queue
is processed  until it is empty.

If you don't want to queue requests call  setNoQueue(true)

While a request is sent and not finished an invisible veil is put
on top of the html page to block any interaction by the user with the 
page. This somehow mimics a synchronius request at least for the user. 

If you don't want to black the page call useVeil(false)
