function myDialogs() {
    'use strict';
    var
            veil = myVeil(),
            openDialogs = [],
            keyDown = window.onkyedown,
            divClass, // will hold a css class
            d = new Date(),
            t = d.getTime(),
            gdDiv, // div for confirm dialog to hold the HTML below
            generalDialog = ['<div style="text-align:center">',
                '<span  id="hgsgdText">you should never see this</span><p>',
                '<div  id=hgsgdActions style="text-align:center">',
                '</div>',
                '</div>'].join(''),
            cdDiv, // div for confirm dialog to hold the HTML below
            confirmDialog = ['<div  id="hgsmodc_veil" ><div class=moveHandle>&nbsp;</div>',
                '<hr style="clear:both">',
                '<span  id="hgsmodc_bbb">you should never see this</span><hr>',
                '<div style="text-align:center">',
                '<button id="modal_confirm_yes" tabindex=1 >Yes</button>',
                '<button id="modal_confirm_no" tabindex=2 >No</button>',
                '</div>',
                '</div>'].join(''),
            alDiv, //div for alert box to hold HTML below
            alertDialog = ['<div  id="hgsmoda_veil"><div  class=moveHandle>&nbsp;</div>',
                '<hr style="clear:both">',
                '<span  id="hgsmoda_bbb"> you should never see this </span><hr>',
                '<div style="text-align:center" >',
                '<button  id="hgsmoda_bbb_ok" tabindex=1 >OK</button>',
                '</div>',
                ''].join(''),
            prDiv, //div for prompt by eenter box to hold HTML below
            promptDialog = ['<div  id="hgsmodp_veil" style="text-align:center"><div  class=moveHandle >&nbsp;</div>',
                '<hr style="clear:both">',
                '<span  id="hgsmodp_bbb"> you should never see this </span><hr>',
                '<div style="text-align:center">',
                '<input id=hgsmodp_ccc type=text size=40 maxlength=40></div>',
                '<div id=hgsmodp_ddd  style="text-align:center"><button  tabindex=1 >OK</button>',
                '</div>'].join(''),
            slDiv, //div for prompt by select box to hold HTML below
            selectDialog = ['<div  id="hgsmods_veil"><div class=moveHandle>&nbsp;</div>',
                '<hr style="clear:both">',
                '<span  id="hgsmods_bbb"> you should never see this </span><hr>',
                '<div style="text-align:center">',
                '<select id=hgsmods_ccc  size=1></select></div><hr>',
                '<div style="text-align:center"><br><button id=hgsmods_ddd  tabindex=1 >OK</button>',
                '</div>'].join(''),
            inDiv, //div for alert box to hold HTML below
            informDialog = ['<div  id="hgsmodi_veil"><div  class=moveHandle>&nbsp;</div>',
                '<hr style="clear:both">',
                '<span  id="hgsmodi_bbb"> you should never see this </span><hr>',
                '<div style="text-align:center" >',
                '<button  id="hgsmodi_bbb_ok" tabindex=1 >OK</button>',
                '</div>',
                ''].join(''),
            poDiv, //div for alert box to hold HTML below
            progressDialog = ['<div  id="hgsmodpo_veil"><div  class=moveHandle>&nbsp;</div>',
                '<hr style="clear:both">',
                '<span  id="hgsmodpo_bbb"> you should never see this </span><hr>',
                '<div style="text-align:center" >', '</div>',
                ''].join(''),
            loDiv, //div for login box to hold HTML below
            loginDialog = ['<div  id="hgsmodl_veil"><div  class=moveHandle>&nbsp;</div>',
                '<hr>',
                '<span  id="hgsmodl_bbb" style="text-align:center;"> you should never see this </span><hr><br>',
                '<div style="text-align:left"><p>',
                '<form id=logon name=logonf  method=post>',
                '<b>User:</b> <input tabindex=1  name=user style="float:right;margin-right:0px;" id=user type=text><p>',
                '<b>Password:</b> <input tabindex=1  name=passwd style="float:right;margin-right:0px;" id=pass type=password>',
                '<p id=passwd2hide style="display:none"><b>Repeat Password:</b> <input id=passwd2id tabindex=1  name=passwd2 style="float:right;margin-right:0px;" type=password>',
                '<hr><p style="text-align:center;" ><input type=submit value=Anmelden id="hgsmodl_bbb_ok" tabindex=1 ></form>',
                '</div>',
                ''].join('');
    /*
     */
    if (document.querySelector(".divClass") === null) {
        divClass = document.createElement('style');
        divClass.type = 'text/css';
        divClass.innerHTML = '.divClass' + t + '{box-shadow: 9px 9px 28px 0px gray; width:auto;background:#dbd9e0; border: 0px solid blue;' +
                'padding:8px; }';
        document.getElementsByTagName('head')[0].appendChild(divClass);
    }


    alDiv = createDialogBox('hgsmoda_aaa', alertDialog);
    cdDiv = createDialogBox('hgsmodc_aaa', confirmDialog);
    prDiv = createDialogBox('hgsmodp_aaa', promptDialog);
    slDiv = createDialogBox('hgsmods_aaa', selectDialog);
    inDiv = createDialogBox('hgsmodi_aaa', informDialog);
    loDiv = createDialogBox('hgsmodl_aaa', loginDialog);
    poDiv = createDialogBox('hgsmodpo_aaa', progressDialog);
    gdDiv = createDialogBox('hgsmodgd', generalDialog);
    /*
     ************************************************
     * functions below
     ************************************************
     */

    function gebi(id) {
        return document.getElementById(id);
    }

    function vailOnClick(id) {
        veil.onclick = function () {
            gebi(id).focus();
        };
    }
    function createDialogBox(id, HTML) {
        var to, le, aDiv = document.createElement('DIV');
        aDiv.id = id;
        aDiv.style.display = 'none';
        aDiv.className = 'divClass' + t;
        // aDiv.style.zIndex = 22;
        aDiv.style.position = 'absolute';
        aDiv.innerHTML = HTML;
        document.body.appendChild(aDiv);
        aDiv.draggable = true;
        aDiv.style.draggable = true;
        aDiv.addEventListener("dragend", function (event) {
            event.target.style.position = "absolute";
            to = event.target.offsetTop + (event.screenY - this.hgsY);
            le = event.target.offsetLeft + (event.screenX - this.hgsX);
            event.target.style.top = to + 'px';
            event.target.style.left = le + 'px';
        }, false);
        aDiv.addEventListener("dragstart", function (event) {
            //save current screen position;
            this.hgsX = event.screenX;
            this.hgsY = event.screenY;
        }, false);
        return aDiv;
    }

    function dialogsClean() {
        openDialogs.forEach(function (elem) {
            elem.style.display = 'none';
        });
        veil.veilOff();
        openDialogs = [];
    }

    function positionDialog(id) {
        var aDiv;
        dialogsClean();
        veil.veilOn();
        aDiv = gebi(id);
        aDiv.style.display = 'block';
        veil.veilSnapToCenter(aDiv);
        openDialogs.push(aDiv);
    }
    //************************************************
    // most general dialogbox
    //************************************************

    function myDialogBox(cfg) {
        var html = [], st, elem = gdDiv.querySelector('#hgsgdText');
        elem.innerHTML = cfg.text;
        elem = gdDiv.querySelector('#hgsgdActions');
        cfg.actions.forEach(function (action) {
            html.push('<span style="cursor:pointer;\n\
background-color:white;\n\
padding:4px;\n\
margin:8px;\n\
border-radius:4px 4px 4px 4px" class=c' + t + '>' + action.text + '</span>');
        });
        elem.innerHTML = html.join('');
        positionDialog('hgsmodgd');
        elem = gdDiv.querySelectorAll('.c' + t);
        [].forEach.call(elem, function (sp) {
            sp.addEventListener('click', cfg.actions.shift().func, false);
        });
        return gdDiv;
    }

    /****
     Information dialog
     ****/
    function myInform(a_text) {

        gebi('hgsmodi_bbb').innerHTML = '';
        gebi('hgsmodi_bbb').innerHTML = '<b>' + a_text.replace(/\n/gi, "<br>") + '</b>';
        positionDialog('hgsmodi_aaa');
        veil.veilOff()
        gebi('hgsmodi_bbb_ok').onclick = function () {
            inDiv.style.display = 'none';
        };
        gebi('hgsmodi_bbb_ok').focus();
    }
    /*
     * The action within the login box is just an OK button
     * In fact if you click anywhere within the alert box it will
     * disapear.
     */
    function myLogin(a_text, action, repeat, user) {

        gebi('hgsmodl_bbb').innerHTML = '';
        gebi('hgsmodl_bbb').innerHTML = '<h1 style=text-align:center;">' + a_text.replace(/\n/gi, "<br>") + '</h1>';
        positionDialog('hgsmodl_aaa');
        if (repeat) {
            gebi('passwd2hide').style.display = '';
            gebi('user').value = user;
        }
        gebi('hgsmodl_bbb_ok').form.action = action;
        gebi('hgsmodl_bbb_ok').onclick = function () {
            loDiv.style.display = 'none';
            veil.veilOff();
            window.onkeydown = keyDown;
        };
        gebi('hgsmodl_bbb_ok').focus();
        window.onkeydown = handleKeyDown;
        return;
    }
    /*
     * The action within the alert box is just an OK button
     * In fact if you click anywhere within the alert box it will
     * disapear.
     */
    function myAlert(a_text) {


        gebi('hgsmoda_bbb').innerHTML = '';
        gebi('hgsmoda_bbb').innerHTML = '<b>' + a_text.replace(/\n/gi, "<br>") + '</b>';
        positionDialog('hgsmoda_aaa');
        gebi('hgsmoda_bbb_ok').onclick = function () {
            alDiv.style.display = 'none';
            veil.veilOff();
            window.onkeydown = keyDown;
        };
        gebi('hgsmoda_bbb_ok').focus();
        window.onkeydown = handleKeyDown;
        return;
    }/*
     *
     *Progress.
     */
    function myProgress(a_text) {
        gebi('hgsmodpo_bbb').innerHTML = '';
        gebi('hgsmodpo_bbb').innerHTML = '<b>' + a_text.replace(/\n/gi, "<br>") + '</b>';
        positionDialog('hgsmodpo_aaa');
        return;
    }
    /*
     * The action within the confirm box 
     * If the Yes button is pressed the callYes function is executed
     * If the No button is pressed the  callno function is executed
     * In both cases the dialog will disapear.
     */
    function myConfirm(a_text, callYes, callNo) {

        //a_text = htmlentity(a_text);

        positionDialog('hgsmodc_aaa');
        gebi('hgsmodc_bbb').innerHTML = a_text.replace(/\n/gi, "<br>");
        gebi('modal_confirm_yes').onclick = function () {
            cdDiv.style.display = 'none';
            veil.veilOff();
            window.onkeydown = keyDown;
            callYes();
        };
        gebi('modal_confirm_no').onclick = function () {
            cdDiv.style.display = 'none';
            veil.veilOff();
            window.onkeydown = keyDown;
            callNo();
        };
        gebi('modal_confirm_no').focus();
        vailOnClick('modal_confirm_no');
        window.onkeydown = handleKeyDown;
        return;
    }
    /*
     * The action within the prompt by enter box 
     * If the OK button is pressed the callOnEnter function is called
     * with value of the input box as a parameter
     * 
     * */
    function myPrompt(a_text, defaultValue, callOnEnter) {
        //a_text = htmlentity(a_text);

        positionDialog('hgsmodp_aaa');
        gebi('hgsmodp_bbb').innerHTML = a_text.replace(/\n/gi, "<br>");
        gebi('hgsmodp_ccc').value = defaultValue;
        gebi('hgsmodp_ddd').onclick = function () {
            prDiv.style.display = 'none';
            veil.veilOff();
            window.onkeydown = keyDown;
            callOnEnter(gebi('hgsmodp_ccc').value);
        };
        gebi('hgsmodp_ccc').focus();
        vailOnClick('hgsmodp_ccc');
        window.onkeydown = handleKeyDown;
        return;
    }
    /*
     * The action within the prompt by select box 
     * If the OK button is pressed the callOnSelect function is called
     * with the selected option object
     * 
     * */
    function myPromptSelect(a_text, options, callOnSelect) {
        //a_text = htmlentity(a_text);
        var n, i, sel, o0, o1, v, o, d, op, that;
        positionDialog('hgsmods_aaa');
        gebi('hgsmods_bbb').innerHTML = a_text.replace(/\n/gi, "<br>");
        sel = gebi('hgsmods_ccc');
        n = sel.options.length;
        for (i = 0; i < n; i++) {
            sel.options.remove(0);
        }
        o0 = options.split(',');
        n = o0.length;
        for (i = 0; i < n; i++) {
            o1 = o0[i].split('|');
            if (o1.length === 0) {
                v = o = d = '';
            } else if (o1.length === 1) {
                v = o = d = o1[0];
            } else if (o1.length === 2) {
                v = o1[0];
                o = o1[1];
                d = o1[1];
            } else if (o1.length === 3) {
                v = o1[0];
                o = o1[1];
                d = o1[2];
            }
            op = document.createElement("option");
            op.value = v;
            op.text = (o);
            op.title = (d);
            sel.options.add(op);
        }
        sel.selectedIndex = 0;
        gebi('hgsmods_ddd').onclick = function () {
            slDiv.style.display = 'none';
            veil.veilOff();
            that = gebi('hgsmods_ccc');
            window.onkeydown = keyDown;
            callOnSelect(that.options[that.selectedIndex]);
        };
        gebi('hgsmods_ccc').focus();
        vailOnClick('hgsmods_ccc');
        return;
    }
    function handleKeyDown(e) {
        var keyCode = e.keyCode || e.which;
        if ([9, 13, 32, 27].indexOf(keyCode) === -1) {
            // Don't do work on keys we don't care about.
            return;
        }
        if (keyCode === 9) {
            if (e.target.id === 'user') {
                gebi('pass').focus();
            }
            if (e.target.id === 'pass' && gebi('passwd2id') !== NULL) {
                gebi('passwd2id').focus();
            }
            if (typeof e.stopPropagation === 'function') {
                e.stopPropagation();
                e.preventDefault();
            } else if (window.event && window.event.hasOwnProperty('cancelBubble')) {
                window.event.cancelBubble = true;
            }
        }
    }
    function htmlentity(value) {
        value = value.replace(/&/gi, "&amp;");
        value = value.replace(/</gi, "&lt;");
        value = value.replace(/>/gi, "&gt;");
        value = value.replace(/"/gi, "&quot;");
        value = value.replace(/'/gi, "&#039;");
        return value;
    }
    /*
     * Here we  reveal the dialogs/functions to the caller
     */
    return {
        myDialogBox: myDialogBox, //(text)
        myInform: myInform, //(text)
        myLogin: myLogin, //(text,actionScript,reset)
        myAlert: myAlert, //(text)
        myConfirm: myConfirm, //(text,callYes,callNo)
        myPrompt: myPrompt, //(text,default Value,callOnEnter)
        myProgress: myProgress, //(text)
        myPromptSelect: myPromptSelect, //(text,option-list,callOnSelect),
        dialogsClean: dialogsClean
    };
}