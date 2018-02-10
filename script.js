window.onload = function(){
    var dst = document.forms.dst;
    dst.ta.value = "";
    for(var i=0;i<10;i++){
        dst.ta.value += String.fromCharCode(10240+i);
    }
    
}