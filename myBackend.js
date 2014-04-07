function myBackend()
{
    'use strict';
    var queue = [], timeOut = 1000, setVeil = true, noQueue=false, veil = '', reveal={};
    //
    // these functions will be returned to the caller of this module
    //
    reveal = {
        useVeil: useVeil, // (true||false);
        callDirect: callDirect, //(backEndScript, sendPkg, respondAction)    
        setTimeout: setTimeout, //(milliSeconds) default=1000
        setNoQueue: setNoQueue //(true||false) 
    };
    //
    //  entire page is overlaid with this veil for the duration of an async request.
    //  Paranoid, but I want no interaction by the user as long as the request is
    //  not finished or timed out. Trun this off by calling useVeil(false);
    //
    veil = document.getElementById('veilFromBackend');
    if (veil === null) {
        veil = document.createElement('DIV');
        veil.id = 'veilFromBackend';
        veil.style.width = '100%';
        veil.style.hight = '100%';
        veil.style.zindex = -1;
        veil.style.background = 'white';
        veil.style.visibility = 'hidden';
        veil.style.position = 'fixed';
        veil.style.top = '0px';
        veil.style.left = '0px';
        veil.style.opacity = 0.2;
        veil.style.textalign = 'left';
        veil.innerHTML = '<hr style="margin:0;padding:0;width:1px;height:2000px">';
        document.body.appendChild(veil);
    }
    function veilOn() {
        if (veil && setVeil) {
            veil.style.visibility = 'visible';
            veil.style.zindex = 5;
        }
    }
    function veilOff() {
        if (veil && setVeil) {
            veil.style.visibility = 'hidden';
            veil.style.zindex = -1;
        }
    }
    //
    // send very first request imediatly
    // then queue requests
    //
    function callDirect(backEnd, sendPkg, respondAction) {
        queue.push((JSON.stringify(sendPkg)));
        queue.push(respondAction);
        queue.push(backEnd);
        if (queue.length === 3 || noQueue) {
            callCore(); // very first request or no queueing
        }
    }
    //
    // send request imediatly
    //
    function callCore() {
        var request, backEnd, sendPkg, respondAction;

        if (queue.length === 0) {
            veilOff();
            return;
        }
        function onChange() {
            if (this.readyState !== 4 || this.status !== 200) {
                if (this.readyState === 4) {
                    veilOff();
                    respondAction({'error': this.responseText});
                    callCore();// process any remaining requests in queue
                }
                return;
            }
            // request comes back, take away veil to allow user action
            this.onreadystatechange = '';
            veilOff();
            try {// try to decode jason for the respond action               
                respondAction(JSON.parse(this.responseText));
            } catch (e) {// backend delivered bogus json       
                veilOff();
                respondAction({'error': this.responseText});
            }
            callCore();// process any remaining requests in queue
        }
        function timedOut() {
            // request timed out, take away veil;
            veilOff();
            request.abort();
            respondAction({'error': 'Backend script ' + backEnd + ' timed out after ' + timeOut + ' milliseconds: no responds '});
            callCore();// process any remaining requests in queue
        }
        //////////////////////////////////////////////////////////////
        ////////////////// here we go ////////////////////////////////
        //////////////////////////////////////////////////////////////
        request = new XMLHttpRequest();
        if (!request || (request.readyState !== 4 && request.readyState !== 0)) {
            queue.length = 0;
            return;
        }
        sendPkg = queue.shift();
        respondAction = queue.shift();
        backEnd = queue.shift();
        request.open("POST", backEnd, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.onreadystatechange = onChange;
        request.timeout = timeOut;
        request.ontimeout = timedOut;
        //
        // activate veil to avoid any user interaction until request 
        // is finished or timed out;
        //   
        veilOn();
        try {
            request.send(sendPkg);
        } catch (e) {
            veilOff();
            respondAction({'error': e});
            callCore();// process any remaining requests in queue
        }
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