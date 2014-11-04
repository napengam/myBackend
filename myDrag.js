function makeDrag(obj) {
    'use strict';
    var xy = {};

    if (obj.style.position !== 'absolute') {
        xy = absPos(obj);
        obj.style.top = xy.y + 'px';
        obj.style.left = xy.x + 'px';
        obj.style.position = 'absolute';
        
    }
    obj.onmousedown = start;

    function absPos(obj)
    {// return absolute x,y position of obj
        var ob, x = 0, y = 0;
        x = obj.offsetLeft;
        y = obj.offsetTop;
        ob = obj.offsetParent;
        while (ob !== null && ob.tagName !== 'BODY') {
            x += ob.offsetLeft;
            y += ob.offsetTop;
            ob = ob.offsetParent;
        }
        return {'x': x, 'y': y};
    }
    function start(e)
    {
        if (e.ctrlKey) {
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
            this.onmousemove = drag;
            this.onmouseup = end;
            this.style.cursor='move';
            return false;
        }
    }
    function drag(e)
    {
        var y = parseInt(this.style.top, 10),
                x = parseInt(this.style.left, 10);

        x = x + (e.clientX - this.lastMouseX);
        y = y + (e.clientY - this.lastMouseY);

        this.style.left = x + "px";
        this.style.top = y + "px";
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
        return false;
    }
    function end()
    {
        this.onmousemove = null;
        this.onmouseup = null;
         this.style.cursor='';
    }
}