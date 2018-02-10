var img = new Image();
var imgFlg = 0;
var tx = [0, 0, 0, 4, 4, 4, 0, 4];
var ty = [0, 4, 8, 0, 4, 8, 12, 12];
window.onload = function(){
    img.addEventListener("load", function(){
        if(imgFlg){
            imgFlg=0;
            fromImg();
        }
    }, false);
    document.getElementById("selectfile").addEventListener("change", 
        function(evt){
            var file = evt.target.files;
            var reader = new FileReader();
            reader.readAsDataURL(file[0]);
            reader.onload = function(){
                imgFlg = 1;
                img.src = reader.result;
            }
        },
    false);
    var lstChara = "";
    function loop(){
        var curChara = document.forms.src.sampleChara.value;
        if(curChara == lstChara)return;
        lstChara = curChara;
        var dst = document.forms.dst;
        dst.ta.value = "";
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext('2d');
        canvas.width = 129;
        canvas.height = 129;
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fillRect(0, 0, 129, 129);
        ctx.font = "130px 'メイリオ'";
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillText(curChara[0],0,110,129);
        var Data = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = Data.data;
        var bin=[];
        for(var i=0;i<data.length;i+=4){
            if((data[i]+data[i+1]+data[i+2])/3>128)bin.push(1);
            else bin.push(0);
        }
        for(var h=0;h<7;h++){
            if(h)dst.ta.value += "\n";
            for(var w = 0; w < 12; w++){
                var bit = 0;
                for(var i=0,b=1;i<8;i++,b+=b){
                    var x = w * 11 + tx[i];
                    var y = h * 19 + ty[i];
                    var cnt = 0;
                    for(var dx = 0; dx < 3; dx++){
                        for(var dy = 0; dy < 3; dy++){
                            var idx = x + dx + (y + dy)*129;
                            if(bin[idx]==0)cnt++;
                        }
                    }
                    if(cnt)bit+=b;
                }
                dst.ta.value += String.fromCharCode(10240+bit);
            }
        }
    }
    setInterval(loop,1000);
}

function fromImg(){
    var dst = document.forms.dst;
    dst.ta.value = "";
    var canvas = document.createElement("canvas");
	var ctx = canvas.getContext('2d');
	canvas.width = 129;
	canvas.height = 129;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    var Data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = Data.data;
    var bin=[];
    for(var i=0;i<data.length;i+=4){
        if((data[i]+data[i+1]+data[i+2])/3>100)bin.push(1);
        else bin.push(0);
    }
    for(var h=0;h<7;h++){
        if(h)dst.ta.value += "\n";
        for(var w = 0; w < 12; w++){
            var bit = 0;
            for(var i=0,b=1;i<8;i++,b+=b){
                var x = w * 11 + tx[i];
                var y = h * 19 + ty[i];
                var cnt = 0;
                for(var dx = 0; dx < 3; dx++){
                    for(var dy = 0; dy < 3; dy++){
                        var idx = x + dx + (y + dy)*129;
                        if(bin[idx]==0)cnt++;
                    }
                }
                if(cnt>4)bit+=b;
            }
            dst.ta.value += String.fromCharCode(10240+bit);
        }
    }
}

function tweet(){
    var str = document.forms.dst.ta.value;
    str += "\n";
    str += "https://kagasan.github.io/dot/"; 
    window.open('http://twitter.com/home?status='+encodeURI(str),'_blank');
}