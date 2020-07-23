(function(doc,win){
    // html
    var html = doc.documentElement;
    // 二元运算符
    var resizeEvt = "orientationchange"in window ? "orientationchange" : "resize";
    var recalc = ()=>{
        var clientWidth = html.clientWidth;
        if(!clientWidth) return;
        if(clientWidth>=640) clientWidth = 640;
        if(clientWidth<=320) clientWidth = 320;
        html.style.fontSize = 16 * (clientWidth/320)+"px";
    }
    if(!doc.addEventListener) return;
    win.addEventListener(resizeEvt,recalc,false);
    doc.addEventListener("DOMContentLoaded",recalc,false);
})(document,window)