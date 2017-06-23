var currentPageIndex = 0; //当前页下标
var currentChapterIndex = 0; //当前章节下标
var pageSize = 1;
var imageMaxWidth = window.screen.width >= 1280 ? 1280 : 1024;//根据分辨率大小，设定图片自适应宽度
var scrollSteop = 0; //
//获取参数
function getSetting(name){
	return $.cookie('bg_setting_' + name);
}

//设置参数
function setSetting(name, value, day){
	if(typeof day == 'undefined') day = 30;
	$.cookie('bg_setting_' + name, value, {expires: day*3600*24, path: '/'});
}
	
//弹出框输出信息
function bengou_alert(title, msg, fn){
	$("#win-alert-title").html( title );
	$("#win-alert-msg").html( msg );
	if( typeof fn == 'function' ){
		$("#win-alert-close,#win-alert-ok").unbind('click');
		$("#win-alert-close,#win-alert-ok").bind('click', fn);
	}
	KISSDW.popupBox("none", {boxSelector: "#win-alert"});	
}

//判断是否是翻页模式
function isPageRead(){
	return 	( /mode=1/.test(window.location.href) );
}

//通过键值获取字符
function getKeyString(code) {
	var hotKeys = {
		specialKeys: { 8: 'backspace',27: 'esc', 9: 'tab', 32:'space', 13: 'return', 145: 'scroll', 
		20: 'capslock', 144: 'numlock', 19:'pause', 45:'insert', 36:'home', 46:'del',
		35:'end', 33: 'pageup', 34:'pagedown', 37:'←', 38:'↑', 39:'→',40:'↓',109: '-', 
		112:'f1',113:'f2', 114:'f3', 115:'f4', 116:'f5', 117:'f6', 118:'f7', 119:'f8', 
		120:'f9', 121:'f10', 122:'f11', 123:'f12', 191: '/' , 16:"shift" , 17:"ctrl",18:"alt"},
		shiftNums: { "`":"~", "1":"!", "2":"@", "3":"#", "4":"$", "5":"%", "6":"^", "7":"&", 
		"9":"(", "0":")", "-":"_", "=":"+", ";":":", "'":"\"", ",":"<", 
		".":">",  "/":"?",  "\\":"|" },
		 numKeys : { 106: '*', 
			107: '+', 109: '-', 110: '.', 111 : '/'
			}
	};
	for(var keyString in hotKeys) {
			for(var codeKeys in hotKeys[keyString]){
					if(codeKeys == code)
						return hotKeys[keyString][codeKeys];
			}
	}
	var character = String.fromCharCode(code).toUpperCase();
	var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
	if(str.indexOf(character) != -1){
		return character;
	}else{
		return "";
	}
}
	
//漫画数据初始化
function cartoon_init(){
    currentPageIndex = getPageIndex();
    currentChapterIndex = getChapterIndex();
	pageSize = getSetting('images_num') > 0 ? parseInt(getSetting('images_num')) : pageSize;
	imageMaxWidth = ( 1 == getSetting('image_auto_size_off') ) ?  2048 : imageMaxWidth;

	if( null == currentPageIndex && null == currentChapterIndex ) {
		bengou_alert('出错了', '该漫画不存在或者已被删除！', function(){ window.location.href = '/'; } );
	}
	
	if( null !== currentPageIndex && null == currentChapterIndex ) {
		bengou_alert('提示', '该漫画已被替换为清晰版！', function(){ window.location.href = $('#cartoon_url').attr('href'); } );
	}	
}

//获取当前页下标
function getPageIndex(){	
	for(var i =0; i < picTree.length; i++){
		if(currentPic == picTree[i]){
			return i - parseInt(i%1);	
		}
	}
	return null;
}

//获取当前章节下标
function getChapterIndex(){	
	for(var i =0; i < chapterTree.length; i++){
	    if (chapterTree[i].indexOf(currentChapterid)>0) {
			return i;
		}	
	}
	return null;
}

//获取页面地址
function getPageUrl(page) {
    var curPage = parseInt(page) + 1;
    var url = chapter_base + '_' + curPage + '.html';
	if( isPageRead() ){
		url += '?mode=1';
	}
	return url;
}

//页面跳转
function goPage(page){
	window.location.href = getPageUrl(page);
}

//章节跳转
function goChapter(chapter){
	var url = chapterTree[ chapter ];
	if( isPageRead() ){
		url += '?mode=1';
	}
	window.location.href = url;
}

//最后一页提示
function lastPageTips(){
	if( currentChapterIndex < chapterTree.length - 1 ){
		if( 1 == getSetting('tips_page') ){
			//翻页模式自动跳转
			if( isPageRead() ) {
				nextChapter();
			}
		}else{
			KISSDW.popupBox("none", {boxSelector: "#win-page-last"});
		}
	}else{
		lastChapterTips();//最后一话
	}
}

//最后一话提示
function lastChapterTips(){
	KISSDW.popupBox("none", {boxSelector: "#win-hua-last"});
}

//上一页
function prePage(){
	if( currentPageIndex  - pageSize >= 0 ) {
		goPage( currentPageIndex - pageSize );
	} else {
		$("#win-first-title").html('这是第一页了！');
		KISSDW.popupBox("none", {boxSelector: "#win-first"});
	}
}

//下一页
function nextPage(){
	if( currentPageIndex < picTree.length - pageSize ) {
		goPage( currentPageIndex + pageSize );
	} else {
		lastPageTips();
	}
}

//首页
function firstPage(){
	goPage(0);
}

//末页
function lastPage(){
	mod = picTree.length % pageSize;
	page = ( mod == 0 ) ? picTree.length-pageSize : picTree.length-mod;
	goPage( page );
}

//上一话
function preChapter(){
	if( currentChapterIndex > 0 ) {
		goChapter( currentChapterIndex - 1 );
	} else {
		$("#win-first-title").html('这是第一话了！');
		KISSDW.popupBox("none", {boxSelector: "#win-first"});
	}
}

//下一话
function nextChapter(){
	if( currentChapterIndex < chapterTree.length - 1 ) {
		goChapter( currentChapterIndex + 1 );
	} else {
		lastChapterTips();
	}
}
	
function getUserActionData(num){
	var data = [];
	data[0]=[$("#cartoon_url").attr('href'), $("#cartoon_url").html()];
	data[1]=[getPageUrl(0), $("#chapter_title").html().replace(/\s共\d+页$/, '')];
	data[2]=[getPageUrl(num), '第' + (num+1) + '页'];
	return data;
}

/*commentpinglun*/


function switchServer(id) {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/common/ajax.aspx?action=switchserver",
        data: "id=" + id,
        success: function (data) {
            window.location.reload();
        },
        error: function (data) {
        }
    });
}

