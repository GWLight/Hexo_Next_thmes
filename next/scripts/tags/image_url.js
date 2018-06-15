var img_path = "https://lightliin.oss-cn-shenzhen.aliyuncs.com/";

hexo.extend.tag.register('img_url', function(args){
	   return '<img src="'+img_path +args[0]+'" width="'+args[1]+'" height="'+args[2]+'"/>';
});