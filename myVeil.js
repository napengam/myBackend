
//************************************************
//  create a veil to block any interaction with page elements.
// A div is created that covers the entire inner  browser window
// in order to prevent any mouse events on  page elements
//************************************************

function myVeil() {
    var veil = null, state = 'off', snapObj = null, reveal = null;
    veil = document.getElementById('veilVeil');

    //************************************************
    // do we already exist ?
    //************************************************

    if (veil) {
        return veil.selfFunctions;
    }
    //************************************************
    // create the div 
    //************************************************

    if (veil === null) {
        veil = document.createElement('DIV');
        veil.tabIndex = 1;
        veil.id = 'veilVeil';
        veil.style.width = '100%';
        veil.style.zIndex = -1;
        veil.style.background = 'rgba(255, 255, 255, 0.18)';
        veil.style.visibility = 'hidden';
        veil.style.display = 'nones';
        veil.style.position = 'fixed';
        veil.style.top = '0px';
        veil.style.left = '0px';
        veil.style.opacity = 0.2;
        veil.style.background = '';
        veil.style.height = window.innerHeight + 'px';
        document.body.appendChild(veil);
    }

    function veilOn() {
        //************************************************
        // turn on
        //************************************************
        veil.style.visibility = 'visible';
        veil.style.display = 'block';
        veil.style.height = window.innerHeight + 'px';
        veil.style.zIndex = 55;
        state = 'on';
        window.addEventListener('resize', trackInnerHeight, false);
    }

    function veilOff() {
        //************************************************
        // turn off
        //************************************************
        veil.style.visibility = 'hidden';
        veil.style.display = 'none';
        veil.style.height = window.innerHeight + 'px';
        veil.style.zIndex = -1;
        state = 'off';
        window.removeEventListener('resize', trackInnerHeight, false);
        snapObj = null;
    }
    function veilSnapToCenter(obj) {
        //************************************************
        // snap given object, usualy a dialogbox,  to the
        //  center of the vail and above itself
        //************************************************
        var ow, oh, ww, wh;
        if (state === 'off') {
            return;
        }
        ow = obj.clientWidth;
        oh = obj.clientHeight;
        ww = veil.style.height = window.innerWidth;
        wh = veil.style.height = window.innerHeight;
        obj.style.position = 'absolute';
        obj.style.top = (wh / 2 - oh / 2) + 'px';
        obj.style.left = (ww / 2 - ow / 2) + 'px';
        obj.style.zIndex = veil.style.zIndex + 1;
        snapObj = obj;

    }
    //
    //************************************************
    // function to  take care of window resize event
    //************************************************

    function trackInnerHeight() {
        if (state === 'on') {
            veil.style.height = window.innerHeight + 'px';
        }
        veilSnapToCenter(snapObj);
    }
    window.onfocus = function (e) {
        var h = e;
    };
    reveal = {
        veil: function () {// expose the veil object 
            return veil;
        }(),
        veilOn: veilOn, //()
        veilOff: veilOff, //()
        veilSnapToCenter: veilSnapToCenter //(obj)
    }; 
    veil.selfFunctions = reveal;
    return reveal;
}


