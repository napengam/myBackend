function myDialogs() {
    'use strict';
    var
            veil,
            divClass, // will hold a css class
            cdDiv, // div for confirm dialog to hold the HTML below
            confirmDialog = ['<div  id="hgsmodc_veil" >',
                '<span  id="hgsmodc_bbb">you should never see this</span><hr>',
                '<div style="text-align:center"><input class=DuMmY_HGS type=text size=1 maxlength=1 style="font-size:0.1em">',
                '<button id="modal_confirm_yes" >Yes</button>',
                '<button id="modal_confirm_no" >No</button>',
                '<input class=DuMmY_HGS type=text size=1 maxlength=1 style="font-size:0.1em"></div>',
                '</div>'].join(''),
            alDiv, //div for alert box to hold HTML below
            alertDialog = ['<div  id="hgsmoda_veil">',
                '<span style="float:right;color:#ff6200;font-weight:bold">Alert<br></span>',
                '<hr style="clear:both">',
                '<span  id="hgsmoda_bbb"> you should never see this </span><hr>',
                '<div style="text-align:center" ><input class=DuMmY_HGS type=text size=1 maxlength=1 style="font-size:0.1em">',
                '<button  id="hgsmoda_bbb_ok" >OK</button>',
                '<input class=DuMmY_HGS type=text size=1 maxlength=1 style="font-size:0.1em;"></div>',
                ''].join(''),
            prDiv, //div for prompt by eenter box to hold HTML below
            promptDialog = ['<div  id="hgsmodp_veil" style="text-align:center">',
                '<span style="float:right;color:#ff6200;font-weight:bold">Prompt<br></span>',
                '<hr style="clear:both">',
                '<span  id="hgsmodp_bbb"> you should never see this </span><hr>',
                '<div style="text-align:center"><input class=DuMmY_HGS type=text size=1 maxlength=1 style="font-size:0.1em">',
                '<input id=hgsmodp_ccc type=text size=40 maxlength=40></div>',
                '<div id=hgsmodp_ddd  style="text-align:center"><button>OK</button>',
                '<input class=DuMmY_HGS type=text size=1 maxlength=1 style="font-size:0.1em"> </div>'].join(''),
            slDiv, //div for prompt by select box to hold HTML below
            selectDialog = ['<div  id="hgsmods_veil">',
                '<span style="float:right;color:#ff6200;font-weight:bold">Prompt<br></span>',
                '<hr style="clear:both">',
                '<span  id="hgsmods_bbb"> you should never see this </span><hr>',
                '<div style="text-align:center"><input class=DuMmY_HGS type=text size=1 maxlength=1 style="font-size:0.1em">',
                '<select id=hgsmods_ccc  size=1></select></div><hr>',
                '<div style="text-align:center"><br><button id=hgsmods_ddd >OK</button>',
                '<input class=DuMmY_HGS type=text size=1 maxlength=1 style="font-size:0.1em">',
                '</div>'].join('');


    function gebi(id) {
        return document.getElementById(id);
    }

    function vailOnClick(id) {
        veil.onclick = function() {
            gebi(id).focus();
        };
    }
    function createDialogBox(id, HTML) {
        var aDiv, dd;
        aDiv = document.createElement('DIV');
        aDiv.id = id;
        aDiv.style.display = 'none';
        aDiv.className = 'divClass';
        aDiv.style.zindex = 10;
        aDiv.innerHTML = HTML;
        document.body.appendChild(aDiv);
        dd = aDiv.querySelectorAll('.DuMmY_HGS');
        if (dd.length === 2) {
            dd[0].onfocus = function() {
                dd[0].nextSibling.focus();
            };
            dd[1].onfocus = function() {
                dd[1].previousSibling.focus();
            };
            dd[0].style.position = 'absolute';
            dd[0].style.top = '-2000px';
            dd[1].style.position = 'absolute';
            dd[1].style.top = '-2000px';
        }
        aDiv.onclick = function() {
            dd[0].focus();
        };

        return aDiv;

    }
    function positionDialog(id) {
        var aDiv, x, y, cw, ch;
        veil.style.visibility = 'visible';
        veil.style.zindex = 5;
        aDiv = gebi(id);
        aDiv.style.display = 'block';
        x = window.innerWidth;
        y = window.innerHeight;
        cw = aDiv.clientWidth;
        ch = aDiv.clientHeight;
        aDiv.style.top = (y - ch) / 2 + 'px';
        aDiv.style.left = (x - cw) / 2 + 'px';
    }
    /*
     * this will cover the entire screen
     * Probably already created by myBackend.js
     * 
     */
    veil = document.getElementById('veilFromBackend');
    if (veil === null) {
        veil = document.createElement('DIV');
        veil.id = 'veilFromBackend';
        veil.style.width = '100%';
        veil.style.zindex = -1;
        veil.style.background = 'white';
        veil.style.visibility = 'hidden';
        veil.style.position = 'fixed';
        veil.style.top = '0px';
        veil.style.left = '0px';
        veil.style.opacity = 0.2;
        veil.style.background = '';
        veil.innerHTML = '<hr style="visibility:hidden;margin:0;padding:0;width:1px;height:2000px">';
        document.body.appendChild(veil);
    }
    if (gebi('hgsmodc_aaa') === null && gebi('hgsmoda_aaa') === null && gebi('hgsmodp_aaa') === null && gebi('hgsmods_aaa') === null) {
        /*
         * create a class for the dialog boxes
         */
        divClass = document.createElement('style');
        divClass.type = 'text/css';
        divClass.innerHTML = '.divClass{width:auto;background:#dddbd1; border: 1px solid rgb(88, 121, 224);z-index:2000;' +
                ' position:fixed;top:200px;left:400px;border-radius: 5px;padding:8px; }';
        document.getElementsByTagName('head')[0].appendChild(divClass);
        /*
         * create a dummy class for locating elements 
         */
        divClass = document.createElement('style');
        divClass.type = 'text/css';
        divClass.innerHTML = '.DuMmY_HGS{/*keep emtpy*/}';
        document.getElementsByTagName('head')[0].appendChild(divClass);
        /*
         * create  dialog boxes
         */
        cdDiv = createDialogBox('hgsmodc_aaa', confirmDialog);
        alDiv = createDialogBox('hgsmoda_aaa', alertDialog);
        prDiv = createDialogBox('hgsmodp_aaa', promptDialog);
        slDiv = createDialogBox('hgsmods_aaa', selectDialog);
    }
    /*
     * The action within the alert box is just an OK button
     * In fact if you click anywhere within the alert box it will
     * disapear.
     */
    function myAlert(a_text) {
        if (veil) {
            positionDialog('hgsmoda_aaa');
            gebi('hgsmoda_bbb').innerHTML = a_text.replace(/\n/gi, "<br>");
            alDiv.onclick = function() {
                alDiv.style.display = 'none';
                veil.style.zindex = -1;
                veil.style.visibility = 'hidden';
            };
            gebi('hgsmoda_bbb_ok').focus();
            vailOnClick('hgsmoda_bbb_ok');
        } else {
            alert(a_text); // fall back
        }
        return;
    }
    /*
     * The action within the confirm box 
     * If the Yes button is pressed the callYes function is executed
     * If the No button is pressed the  callno function is executed
     * In both cases the dialog will disapear.
     */
    function myConfirm(a_text, callYes, callNo) {
        var ret;
        if (veil) {
            positionDialog('hgsmodc_aaa');
            gebi('hgsmodc_bbb').innerHTML = a_text.replace(/\n/gi, "<br>");
            gebi('modal_confirm_yes').onclick = function() {
                cdDiv.style.display = 'none';
                veil.style.zindex = -1;
                veil.style.visibility = 'hidden';
                callYes();
            };
            gebi('modal_confirm_no').onclick = function() {
                cdDiv.style.display = 'none';
                veil.style.zindex = -1;
                veil.style.visibility = 'hidden';
                callNo();
            };
            gebi('modal_confirm_no').focus();
            vailOnClick('modal_confirm_no');
        } else {
            ret = confirm(a_text);  // fall back
            if (ret) {
                callYes();
            } else {
                callNo();
            }
        }
        return;
    }
    /*
     * The action within the prompt by enter box 
     * If the OK button is pressed the callOnEnter function is called
     * with value of the input box as a parameter
     * 
     * */
    function myPrompt(a_text, defaultValue, callOnEnter) {
        if (veil) {
            positionDialog('hgsmodp_aaa');
            gebi('hgsmodp_bbb').innerHTML = a_text.replace(/\n/gi, "<br>");
            gebi('hgsmodp_ccc').value = defaultValue;
            gebi('hgsmodp_ddd').onclick = function() {
                prDiv.style.display = 'none';
                veil.style.zindex = -1;
                veil.style.visibility = 'hidden';
                callOnEnter(gebi('hgsmodp_ccc').value);
            };
            gebi('hgsmodp_ccc').focus();
            vailOnClick('hgsmodp_ccc');
        }
        return;
    }
    /*
     * The action within the prompt by select box 
     * If the OK button is pressed the callOnSelect function is called
     * with the selected option object
     * 
     * */
    function myPromptSelect(a_text, options, callOnSelect) {
        var n, i, sel, o0, o1, v, o, d, op, that;
        if (veil) {
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
                op.text = o;
                op.title = d;
                sel.options.add(op);
            }
            sel.selectedIndex = 0;

            gebi('hgsmods_ddd').onclick = function() {
                slDiv.style.display = 'none';
                veil.style.zindex = -1;
                veil.style.visibility = 'hidden';
                that = gebi('hgsmods_ccc');
                callOnSelect(that.options[that.selectedIndex]);
            };
            gebi('hgsmods_ccc').focus();
            vailOnClick('hgsmods_ccc');
        }
        return;
    }
    /*
     * Here we  reveal the dialogs/functions to the caller
     */
    return {
        myAlert: myAlert, //(text)
        myConfirm: myConfirm, //(text,callYes,callNo)
        myPrompt: myPrompt, //(text,default Value,callOnEnter)
        myPromptSelect: myPromptSelect //(text,option-list,callOnSelect)
    };
}