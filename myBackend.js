function myBackend(v)
{
    'use strict';
    var
            qelem, request, backEnd, sendPkg, respondAction,
            queue = [], timeOut = 0,
            setVeil = true, noQueue = false,
            veil = myVeil(), reveal = {};
    //
    // these functions will be returned to the caller of this module
    //
    reveal = {
        useVeil: useVeil, // (true||false);
        callDirect: callDirect, //(backEndScript, sendPkg, respondAction)    
        setTimeout: setTimeout, //(milliSeconds) default=1000
        setNoQueue: setNoQueue //(true||false) 
    };
    if (typeof v !== 'undefined') {
        setVeil = false;
    }
    request = new XMLHttpRequest();


    function callDirect(backEnd, sendPkg, respondAction) {
        queue.push({
            'backEnd': backEnd,
            'sendPkg': JSON.stringify(sendPkg),
            'respondAction': respondAction
        });
        if (queue.length === 1 || noQueue) {
            callCore(); // very first request or no queueing
        }
    }
    //
    // send request imediatly
    //
    function callCore() {

        if (queue.length === 0) {

            return;
        }

        if (!request || (request.readyState !== 4 && request.readyState !== 0)) {
            queue.length = 0;
            return;
        }
        //************************************************
        // process first request in queue
        //************************************************
        sendPkg = queue[0].sendPkg;
        respondAction = queue[0].respondAction;
        backEnd = queue[0].backEnd;

        request.open("POST", backEnd, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.onreadystatechange = onChange;
        request.timeout = timeOut;
        request.ontimeout = timedOut;
        //
        // activate veil. to avoid any user interaction until request 
        // is finished or timed out;
        //   
        veil.veilOn();
        request.send(sendPkg);
    }
    function onChange() {
        var js;
        if (this.readyState !== 4 || this.status !== 200) {
            if (this.readyState === 4) {
                queue.shift();
                veil.veilOff();
                respondAction({'error': this.responseText});
                callCore();// process any remaining requests in queue
            }
            return;
        }
        // request comes back, take away veil. to allow user action
        this.onreadystatechange = '';
        veil.veilOff();
        queue.shift();
        try {
            js = JSON.parse(this.responseText);
        } catch (e) {
            respondAction({'error': '<div style="width:60%;word-wrap: break-word;">' + this.responseText + e.message + '</div>'});
            callCore();// process any remaining requests in queue
            return;
        }
        respondAction(js);
        callCore();// process any remaining requests in queue
    }
    function timedOut() {
        // request timed out, take away veil.;
        queue.shift();
        veil.veilOff();
        request.abort();
        respondAction({'error': 'Backend script ' + backEnd + ' timed out after ' + timeOut + ' milliseconds: no responds '});
        callCore();// process any remaining requests in queue
    }

    function setTimeout(n) {
        timeOut = n;
    }
    function setNoQueue(flag) {
        noQueue = flag;
    }
    function useVeil(flag) {
        setVeil = flag;//  true || false
    }
    return reveal;
}