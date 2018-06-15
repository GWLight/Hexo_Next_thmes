function render(template, context) {

    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;

    return template.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {  
            return word.replace('\\', '');
        }

        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;

        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
}
String.prototype.render = function (context) {
    return render(this, context);
};

var re = /x/;
console.log(re);
re.toString = function() {
    showMessage('哈哈，你打开了控制台，是想要看看我的秘密吗？', 5000);
    return '';
};

$(document).on('copy', function (){
    showMessage('你都复制了些什么呀，转载要记得加上出处哦', 5000);
});

function getStyle(obj,styleName){
    if(obj.currentStyle){
        return obj.currentStyle[styleName];
    }else{
        return getComputedStyle(obj,null)[styleName];
    }
}

$.ajax({
    cache: true,
    url: "/js/src/waifu-tips.json",
    dataType: "json",
    success: function (result){
        $.each(result.mouseover, function (index, tips){
            $(document).on("mouseover", tips.selector, function (){
                var text = tips.text;
                if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                text = text.render({text: $(this).text()});
				if(tips.selector == ".waifu #live2d" && document.getElementById("wifu-tips-display").style.opacity == 1){
				
				}else if(tips.selector == ".waifu #live2d" ){
				 showMessage(text, 2000);
				}else if(tips.selector == "#fa-times-commenting"){
					if(document.getElementById("waifu-input-div").style.opacity == 1){
						showMessage(tips.text[tips.text.length-1],3000);
					}else{
						showMessage(tips.text[0],3000);
					}
				}
				else{
				 showMessage(text, 3000);
				}
            });
        });
        $.each(result.click, function (index, tips){
            $(document).on("click", tips.selector, function (){
				if(tips.selector == ".waifu #live2d" || tips.selector == "#fa-times-circle"){
					
					var text = tips.text;
					if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
					text = text.render({text: $(this).text()});
					showMessage(text, 3000);
				}else if(tips.selector == "#fa-times-plane"){
					window.location.href = "/";
				}else if(tips.selector == "#fa-times-card"){
					window.location.href = "/about/";
				}else if(tips.selector == "#fa-times-commenting"){
					if(document.getElementById("waifu-input-div").style.opacity == 1){
						$('.waifu-input-div').stop().css('opacity',0);
					}else{
						$('.waifu-input-div').stop().css('opacity',1);
					}
				}
            });
        });
    }
});



(function (){
    var text;
    if(document.referrer !== ''){
        var referrer = document.createElement('a');
        referrer.href = document.referrer;
        text = 'Hello! 来自 <span style="color:#0099cc;">' + referrer.hostname + '</span> 的朋友';
        var domain = referrer.hostname.split('.')[1];
        if (domain == 'baidu') {
            text = 'Hello! 来自 百度搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">' + referrer.search.split('&wd=')[1].split('&')[0] + '</span> 找到的我吗？';
        }else if (domain == 'so') {
            text = 'Hello! 来自 360搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">' + referrer.search.split('&q=')[1].split('&')[0] + '</span> 找到的我吗？';
        }else if (domain == 'google') {
            text = 'Hello! 来自 谷歌搜索 的朋友<br>欢迎阅读<span style="color:#0099cc;">『' + document.title.split(' - ')[0] + '』</span>';
        }
    }else {
        if (window.location.href == '/') { //如果是主页
            var now = (new Date()).getHours();
            if (now > 23 || now <= 5) {
                text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛';
            } else if (now > 5 && now <= 7) {
                text = '早上好！一日之计在于晨，美好的一天就要开始了';
            } else if (now > 7 && now <= 11) {
                text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
            } else if (now > 11 && now <= 14) {
                text = '中午了，工作了一个上午，现在是午餐时间！';
            } else if (now > 14 && now <= 17) {
                text = '午后很容易犯困呢，今天的运动目标完成了吗？';
            } else if (now > 17 && now <= 19) {
                text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~';
            } else if (now > 19 && now <= 21) {
                text = '晚上好，今天过得怎么样？';
            } else if (now > 21 && now <= 23) {
                text = '已经这么晚了呀，早点休息吧，晚安~';
            } else {
                text = '嗨~ 快来逗我玩吧！';
            }
        }else {
            text = '欢迎阅读<span style="color:#0099cc;">『' + document.title.split(' - ')[0] + '』</span>';
        }
    }
    showMessage(text, 6000);
})();

window.setInterval(showHitokoto,30000);
//加载鸡汤文=-= https://api.imjad.cn/hitokoto/?cat=&charset=utf-8&length=55&encode=json
function showHitokoto(){
    $.getJSON('/js/src/saying.json',function(result){
        showMessage(result[Math.floor(Math.random()*result.length)], 5000);
    });
}

//添加enter按键
$("#AIuserText").keyup(function(event){
if(event.keyCode == 13){
//call send data function here
 sendData_tuling();


//给服务器发送数据
function sendData_tuling() {
	/*获取输入框数据，并拼接成url*/
	
	var url = '/openapi/api';
	var getText = $("#AIuserText").val();
	var mess = "说点什么吧";
	var adr = "";
	
	
	var code_1 = 100000; //正常
	var code_2 = 200000; //链接
	var code_3 = 302000; //新闻
	var code_4 = 308000; //菜谱
	var code_5 = 313000; //儿歌
	var code_6 = 314000; //诗词
	
	if(returnCitySN["cip"] !== ''){
        adr = returnCitySN["cip"];
	}
	
	//var tx = "<a href='https://www.c3zj.com/aff.php?aff=362'>链接</a>"
	//showMessage(tx, 5000);
	if (getText != null && getText != "") {
		showMessage("正在思考。。。", 5000);
		  $.post(url,
		 {
			  key:"",
			  info:getText,
			  userid:adr
			  
		},function(result){
		    var msg_text = "";
			if(result.code == code_1){
				msg_text = result.text;
			}else if(result.code == code_2){
				msg_text = "<a href='"+result.url+"'  target='view_window'>☜点我查看☞</a>"+result.text;
			}else if(result.code == code_3){
				msg_text = "<img src='"+result.list[0].icon+"'  width='25px' height='25px'/><a href='"+result.list[0].detailurl+"'  target='view_window'>☜点我查看☞</a>"+result.list[0].article;
			}else if(result.code == code_4){
				msg_text = "<a href='"+result.list[0].detailurl+"'  target='view_window'>☜点我查看☞</a>"+result.list[0].name+"介绍："+result.list[0].info;
			}else if(result.code == code_5){
				msg_text = result.function.song + "(⊙o⊙)…";
			}else if(result.code == code_6){
				msg_text = result.function.name;
			}else{
				showMessage("这是秘密不能说~", 5000);
			}
			
			
			showMessage(msg_text, 5000);
			delText();
		  });

	 }else{
		 showMessage(mess, 5000);
	 }
}

function delText(){
	$("#AIuserText").val("");
}

function showMessage(text, timeout){
    if(Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1)-1];
    console.log(text);
    $('.waifu-tips').stop();
    $('.waifu-tips').html(text).fadeTo(200, 1);
    if (timeout === null) timeout = 5000;
    hideMessage(timeout);
}
function hideMessage(timeout){
    $('.waifu-tips').stop().css('opacity',1);
    if (timeout === null) timeout = 5000;
    $('.waifu-tips').delay(timeout).fadeTo(200, 0);
}