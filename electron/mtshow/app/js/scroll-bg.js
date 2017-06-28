/*!
 * FileName   : dww3.js
 * WebSite    : http://duowan.com
 * Desc       :
 * $Author: johnny $
 * $Revision: 600 $
 * $Date: 2012-10-12 11:12:41 +0800 (Fri, 12 Oct 2012) $
 * */
(function(a){a.fn.Switchable=function(m){var b=a.extend({},a.fn.Switchable.Default,m);var i=a("."+b.nav+" > li",a(this)),e=a("."+b.btnNext,a(this)),c=a("."+b.btnPrev,a(this)),j=a("."+b.content,a(this));var h=1,g=j.children().size(),d=j.children(":first").width(),k=j.children(":first").height();var f,l;if(b.effect=="scrollY"||b.effect=="scrollLoopY"){l=j.children(":first").outerHeight(true)}else{if(b.effect=="scrollX"||b.effect=="scrollLoopX"){l=j.children(":first").outerWidth(true);j.css("width",g*l);j.children().css({"float":"left"});j.children().css({width:d})}}return this.each(function(){var n=function(){a.fn.Switchable.Effect[b.effect](j,i,h,l,b);if(++h*b.steps>=g){h=0}};if(!i.size()){if(e.size()){e.click(function(q){if(f){clearInterval(f)}a.fn.Switchable.Effect[b.effect](j,i,h,l,b);if(b.autoPlay){f=setInterval(n,b.timer)}q.preventDefault()});c.click(function(q){if(f){clearInterval(f)}a.fn.Switchable.Effect[b.effect](j,i,h,l,b,"prev");if(b.autoPlay){f=setInterval(n,b.timer)}q.preventDefault()})}}if(i.size()){if(e.size()&&!b.hasScroll){var p=i.size();e.click(function(r){for(var q=0;q<p;q++){if(i.eq(q).hasClass("hover")){h=(q+1==p)?0:q+1;break}}a.fn.Switchable.Effect[b.effect](j,i,h,l,b);if(f){clearInterval(f)}if(b.autoPlay){f=setInterval(n,b.timer)}return false});c.click(function(r){for(var q=0;q<p;q++){if(i.eq(q).hasClass("hover")){h=(q==0)?p-1:q-1;break}}a.fn.Switchable.Effect[b.effect](j,i,h,l,b);if(f){clearInterval(f)}if(b.autoPlay){f=setInterval(n,b.timer)}return false})}if(b.event=="click"){i.click(function(){if(f){clearInterval(f)}h=i.index(this);a.fn.Switchable.Effect[b.effect](j,i,h,l,b);i.eq(h).addClass("selected").siblings().removeClass("selected")}).hover(function(){a(this).addClass("hover")},function(){a(this).removeClass("hover")})}else{if(b.event=="hover"){var o=null;i.hover(function(){if(f){clearInterval(f)}h=i.index(this);if(!b.hoverInterval){a.fn.Switchable.Effect[b.effect](j,i,h,l,b)}else{o=setTimeout(function(){a.fn.Switchable.Effect[b.effect](j,i,h,l,b)},b.hoverInterval)}},function(){if(o){clearInterval(o)}if(f){clearInterval(f)}if(b.autoPlay){f=setInterval(n,b.timer)}})}}}if(b.autoPlay){f=setInterval(n,b.timer);j.hover(function(){if(f){clearInterval(f)}},function(){if(f){clearInterval(f)}if(b.autoPlay){f=setInterval(n,b.timer)}})}})};a.fn.Switchable.Default={event:"click",effect:"none",autoPlay:true,speed:"normal",timer:2000,nav:"J_nav",content:"J_content",steps:1,btnNext:"J_btnNext",btnPrev:"J_btnPrev"};a.fn.Switchable.Effect={none:function(d,c,e,b,f){d.children().eq(e).show().siblings().hide();if(c){c.eq(e).addClass("hover").siblings().removeClass("hover")}},fade:function(d,c,e,b,f){d.children().eq(e).stop(true,true).fadeIn(f.speed).siblings().hide();if(c){c.eq(e).addClass("hover").siblings().removeClass("hover")}},scrollX:function(d,c,e,b,f){d.stop().animate({"margin-left":-e*f.steps*b},f.speed);if(c){c.eq(e).addClass("hover").siblings().removeClass("hover")}},scrollY:function(c,b,e,d,f){c.stop().animate({"margin-top":-e*f.steps*d},f.speed);if(b){b.eq(e).addClass("hover").siblings().removeClass("hover")}},scrollLoopX:function(d,c,e,b,f,g){g=g||"next";a.fn.Switchable.ScrollLoop[g](d,c,e,b,f,"X")},scrollLoopY:function(c,b,e,d,f,g){g=g||"next";a.fn.Switchable.ScrollLoop[g](c,b,e,d,f,"Y")}};a.fn.Switchable.ScrollLoop={prev:function(c,b,d,e,f,g){if(c.is(":animated")){return}for(var d=0;d<f.steps;d++){c.children(":last").prependTo(c)}if(g=="X"){c.css({"margin-left":-f.steps*e});c.stop().animate({"margin-left":0},f.speed)}else{c.css({"margin-top":-f.steps*e});c.stop().animate({"margin-top":0},f.speed)}},next:function(c,b,d,e,f,g){if(c.is(":animated")){return}if(g=="X"){c.stop().animate({"margin-left":-f.steps*e},f.speed,function(){for(var h=0;h<f.steps;h++){c.children(":first").appendTo(c)}c.css({"margin-left":0})})}else{c.stop().animate({"margin-top":-f.steps*e},f.speed,function(){for(var h=0;h<f.steps;h++){c.children(":first").appendTo(c)}c.css({"margin-top":0})})}}}})(jQuery);var KISSDW={tabs:function(b,c){var a={nav:"J_nav:eq(0)",content:"J_content:eq(0)",autoPlay:false};if(c&&!c.hoverInterval&&c.event==="hover"){a.hoverInterval=300}var d=jQuery.extend({},a,c);jQuery(b).Switchable(d)},slide:function(b,c){var a={event:"hover",effect:"fade",timer:5000};var d=jQuery.extend({},a,c);jQuery(b).Switchable(d)},textScroll:function(b,c){var a={effect:"scrollLoopY",timer:4000};var d=jQuery.extend({},a,c);jQuery(b).Switchable(d)},imageScroll:function(b,c){var a={effect:"scrollLoopX"};var d=jQuery.extend({},a,c);jQuery(b).Switchable(d)},calendar:function(b,d){var a={event:"click",fromSunday:false};var e=jQuery.extend({},a,d);var c=new Date().getDay(),g=c;if(!e.fromSunday){g=c==0?6:c-1}var f="selected";if(e.event=="hover"){f="hover"}jQuery(b).find(".J_nav > li").eq(g).addClass(f);jQuery(b).find(".J_content > div").eq(g).removeClass("hide");jQuery(b).find(".J_content > li").eq(g).removeClass("hide");this.tabs(b,d)},embedSWF:function(b,d){var c=jQuery(b)[0];if(!c){return}var a={url:"",width:jQuery(c).width(),height:jQuery(c).height(),wmode:"transparent"};var e=jQuery.extend({},a,d);if(e.url===""){return}var f='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+e.width+'" height="'+e.height+'">';f+='<param name="movie" value="'+e.url+'">';f+='<param name="wmode" value="'+e.wmode+'">';f+="<!--[if !IE]>-->";f+='<object type="application/x-shockwave-flash" data="'+e.url+'" width="'+e.width+'" height="'+e.height+'">';f+='<param name="wmode" value="'+e.wmode+'">';f+="</object>";f+="<!--<![endif]-->";f+="</object>";c.innerHTML=f},preLoadImg:function(c){for(var b=0;b<c.length;b++){var a=new Image();a.src=c[b]}},accordion:function(a){if(!jQuery(a).is("div[class*='mod-accordion']")){return false}var c=jQuery(a),d=c.children("div:even"),b=c.children("div:odd"),e=d.length;d.click(function(){var g=d.index(this);var f=d.eq(g).hasClass("active");d.removeClass("active");b.removeClass("show");if(f){g=(e!=g+1)?++g:--g}d.eq(g).addClass("active");b.eq(g).addClass("show")})},popupBox:function(a,b){var c=jQuery(a);if(!c.length&&a!=="none"){return}if(!b||!b.boxSelector){return}if(c.length){c.click(function(){d();return false})}function d(){var g=jQuery(b.boxSelector)[0];if(!g){return}var m={existMask:true};var e=jQuery.extend({},m,b);this.open_popu=function(p,i){this.box.style.cssText=i;this.mask.style.cssText=p;if(!window.XMLHttpRequest){document.documentElement.scrollTop++;document.documentElement.scrollTop--}if(e.existMask){document.body.appendChild(this.mask)}},this.close_popu=function(){this.box.style.cssText="";this.box.style.display="none";if(e.existMask){document.body.removeChild(this.mask)}};this.box=g;this.mask=document.createElement("div");this.box.style.display="block";var h=this.box.clientWidth,k=this.box.clientHeight;var j="position:fixed;left:0;top:0;z-index:32766;width:100%;height:100%;filter:alpha(opacity=70);-moz-opacity:0.7;opacity:0.7;background:#000;",l="display:block;position:fixed;left:50%;top:50%;z-index:32767;margin:-"+k/2+"px 0 0 -"+h/2+"px;";if(!window.XMLHttpRequest){j+="position:absolute;top:expression(documentElement.scrollTop);height:expression(document.documentElement.clientHeight);";l+="position:absolute;top:expression(documentElement.scrollTop + document.documentElement.clientHeight/2);";if(document.getElementsByTagName("html")[0].style.backgroundImage==""){document.getElementsByTagName("html")[0].style.backgroundImage="url(blank)"}}this.open_popu(j,l);var o=this.box.getElementsByTagName("*");for(var f=0;f<o.length;f++){if(jQuery(o[f]).hasClass("J_btnClose")){var n=this;o[f].onclick=function(){n.close_popu();return false}}}return false}if(a==="none"){d()}},navTree:function(b,c){var a={showAll:false};var d=jQuery.extend({},a,c);if(jQuery(b).length){if(!-[1,]){jQuery(b+" ul").each(function(){jQuery(this).children("li:last-child").addClass("last-child")})}jQuery(b+">ul>li").each(function(){var e=jQuery(this).find("ul:first");if(!e.length){return}if(d.showAll){e.attr("class","show")}var f=jQuery("<span></span>");f.prependTo(e.siblings("b"));f.height=e.height();f.status="visible";if(e.attr("class")!=="show"){e.css("height","0");f.status="hidden"}f.click(function(){if(f.status==="hidden"){f.status="visible";e.animate({height:f.height},500)}else{f.status="hidden";e.animate({height:0},500)}})})}},navTree2:function(b,d){var a={showAll:false,effect:false,clickIcon:false,speed:"normal"};var e=jQuery.extend({},a,d);var f=jQuery(b);f.find("ul").each(function(){jQuery(this).children("li:last-child").addClass("last")});function c(i){var g=i.parent(),h=i.siblings("ul");if(e.effect){if(h.is(":visible")){h.slideUp(e.speed,function(){g.toggleClass("close")})}else{if(!h.attr("noFirst")){h.slideDown(e.speed,function(){g.toggleClass("close")})}else{g.toggleClass("close");h.slideDown(e.speed)}}h.attr("noFirst",true)}else{g.toggleClass("close")}}if(e.clickIcon){f.find("li:has(ul)").children("div").prepend("<i></i>").children("i").click(function(){c(jQuery(this).parent())})}else{f.find("li:has(ul)").children("div").prepend("<i></i>").click(function(){c(jQuery(this))})}if(!e.showAll){f.find("li li:has(ul):not(.open)").addClass("close")}},toolTips:function(l){var h={imgSrc:"",style:1,offset:{x:15,y:15}};var a=jQuery.extend({},h,l);if(a.style===1){var b="";if(a.imgSrc!=""){b=".data-tips-left, .data-tips-center, .data-tips-right{background-image:url("+a.imgSrc+")}"}document.write('<style type="text/css">'+b+"</style>")}var k=document.getElementsByTagName("a");for(var d=0;d<k.length;d++){if(k[d].getAttribute("data-tips")!=null){k[d].onmouseover=j;k[d].onmousemove=f;k[d].onmouseout=e}}function c(n,m){if(n.type!="mouseout"&&n.type!="mouseover"){return false}var i=n.relatedTarget?n.relatedTarget:n.type=="mouseout"?n.toElement:n.fromElement;while(i&&i!=m){i=i.parentNode}return(i!=m)}function j(){var o=window.event||arguments[0],m=o.srcElement||o.target;if(!c(o,this)){return}while(m&&!m.getAttribute("data-tips")){m=m.parentNode}var n="";switch(a.style){case 1:n='<div class="data-tips-top"><div class="data-tips-left"></div><div class="data-tips-center"></div><div class="data-tips-right"></div></div><div class="data-tips-middle"><div class="data-tips-left"></div><div class="data-tips-center">'+m.getAttribute("data-tips")+'</div><div class="data-tips-right"></div></div><div class="data-tips-bottom"><div class="data-tips-left"></div><div class="data-tips-center"></div><div class="data-tips-right"></div></div>';break;case 2:n='<div id="data-tips-bd">'+m.getAttribute("data-tips")+"</div>";break}var i=document.getElementById("data-tips");if(i){i.innerHTML=n;i.style.display="block"}else{i=document.createElement("div");i.id="data-tips";i.innerHTML=n;document.body.appendChild(i)}}function f(){var i=document.getElementById("data-tips");if(!i){return}var m=window.event||arguments[0];var n=g(m);i.style.left=(n.x+a.offset.x)+"px";i.style.top=(n.y+a.offset.y)+"px"}function e(){var m=window.event||arguments[0];if(!c(m,this)){return}var i=document.getElementById("data-tips");if(!i){return}i.style.display="none"}function g(i){if(i.pageX){return{x:i.pageX,y:i.pageY}}else{return{x:i.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft),y:i.clientY+(document.documentElement.scrollTop||document.body.scrollTop)}}}},formatPic:function(d,l){var f=(function(){var o=[],n=null,m=function(){var p=0;for(;p<o.length;p++){o[p].end?o.splice(p--,1):o[p]()}!o.length&&k()},k=function(){clearInterval(n);n=null};return function(q,v,x,u){var w,r,y,t,p,s=new Image();s.src=q;if(s.complete){v.call(s);x&&x.call(s);return}r=s.width;y=s.height;s.onerror=function(){u&&u.call(s);w.end=true;s=s.onload=s.onerror=null};w=function(){t=s.width;p=s.height;if(t!==r||p!==y||t*p>1024){v.call(s);w.end=true}};w();s.onload=function(){!w.end&&w();x&&x.call(s);s=s.onload=s.onerror=null};if(!w.end){o.push(w);if(n===null){n=setInterval(m,40)}}}})();var j=jQuery(d)[0];if(!j){return}var h={width:600,url:""};var b=jQuery.extend({},h,l);var c=j.getElementsByTagName("img"),g=j.getElementsByTagName("table");for(var e=0;e<c.length;e++){f(c[e].src,function(){i()})}function i(){for(var k=0;k<c.length;k++){if(c[k].scrollWidth>b.width){c[k].width=b.width;c[k].onclick=a;c[k].style.cursor="pointer";c[k].alt="点击放大"}}for(var k=0;k<g.length;k++){if(g[k].width>b.width){g[k].width=b.width}}}function a(){if(b.url===""){window.open(this.src)}else{window.open(b.url+"?"+this.src)}}},fixedPosition:function(e,k){var d=jQuery(e)[0];if(!d){return}if(isNaN(k.top)&&isNaN(k.bottom)){return}var i={obj:d};var a=jQuery.extend({},i,k);a.objHeight=a.obj.clientHeight;a.closeObj=jQuery(d).find(".J_btnClose")[0];if(!window.fixedPositionBox){window.fixedPositionBox=[]}window.fixedPositionBox.push(a);var h=window.fixedPositionBox.length-1;var g=window.fixedPositionBox[h].obj;var b=window.fixedPositionBox[h].closeObj;if(!!b){b.onclick=function(){g.parentNode.removeChild(g);for(var l=0;l<window.fixedPositionBox.length;l++){if(window.fixedPositionBox[l].obj==g){window.fixedPositionBox.splice(l,1);break}}}}if(window.XMLHttpRequest){return}window.onresize=function(){j()};window.onscroll=function(){j()};var c;function j(){if(window.fixedPositionBox.length==0){return}for(var m=0;m<window.fixedPositionBox.length;m++){var l=window.fixedPositionBox[m];l.obj.style.display="none"}if(c){clearTimeout(c)}c=setTimeout(function(){for(var o=0;o<window.fixedPositionBox.length;o++){var n=window.fixedPositionBox[o];n.obj.style.top=f(n);n.obj.style.display="block"}},400)}function f(n){var l=document.documentElement.scrollTop||document.body.scrollTop;if(!isNaN(n.top)){return l+n.top}else{if(!isNaN(n.bottom)){var m=document.documentElement.clientHeight||document.body.clientHeight;return l+m-n.objHeight-n.bottom}}}},showMenu:function(a){var b=jQuery(a);jQuery("li",b).hover(function(){jQuery(this).addClass("hover")},function(){jQuery(this).removeClass("hover")});jQuery(a).find("li li:has(ul)").addClass("parent")},setHomePage:function(f){var b=document.URL.split("/");var c="http://"+b[2]+"/";try{f.style.behavior="url(#default#homepage)";f.setHomePage(c)}catch(d){if(window.netscape){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")}catch(d){alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将[signed.applets.codebase_principal_support]设置为'true'")}var a=Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);a.setCharPref("browser.startup.homepage",c)}}},addFavorite:function(){var a=document.URL.split("/");var c="http://"+a[2]+"/";var b=document.title;try{window.external.AddFavorite(c,b)}catch(d){window.sidebar.addPanel(b,c,"")}},copyURL:function(){var b=top.location.href;var d=document.title;if(window.clipboardData){var a=d+"\n"+b;var c=window.clipboardData.setData("Text",a);if(c){alert("复制成功！按Ctrl+V ,粘贴到QQ或微博上发给你的好友们吧！")}}else{prompt("按Ctrl+C复制当前网址",b+" "+d)}},switchable:function(a,b){if(b.effect==="scrollTxt"){b.effect="scrollLoopY"}else{if(b.effect==="scrollLoopX"){jQuery(a).find("a.prev").addClass("J_btnPrev");jQuery(a).find("a.next").addClass("J_btnNext")}}jQuery(a).Switchable(b)},tab:function(b,c){var g=jQuery(b).find(".J_nav > li"),f=jQuery(b).find(".J_content > li");var e=c=="hover"?"hover":"selected";if(e=="hover"){var h;g.hover(function(){var j=g.index(this);h=setTimeout(function(){d(j,"hover");a(j)},300)},function(){if(h){clearTimeout(h)}})}else{g.hover(function(){var j=g.index(this);d(j,"hover")},function(){jQuery(this).removeClass("hover")}).click(function(){var j=g.index(this);d(j,"selected");a(j)})}function d(j,k){g.eq(j).addClass(k).siblings().removeClass(k)}function a(j){f.eq(j).show().siblings().hide()}},navtree:function(a){if(jQuery(".sitenav").length){if(!-[1,]){jQuery(".sitenav ul").each(function(){jQuery(this).children("li:last-child").addClass("last-child")})}jQuery(".sitenav>ul>li").each(function(){var b=jQuery(this).find("ul:first");if(!b.length){return}if(a){b.attr("class","show")}var c=jQuery("<span></span>");c.prependTo(b.siblings("b"));c.height=b.height();c.status="visible";if(b.attr("class")!=="show"){b.css("height","0");c.status="hidden"}c.click(function(){if(c.status==="hidden"){c.status="visible";b.animate({height:c.height},500)}else{c.status="hidden";b.animate({height:0},500)}})})}},popupbox:function(b,m){var d=document.getElementById(b);if(!d){return}var j={existMask:true};var a=jQuery.extend({},j,m);this.open=function(n,i){this.box.style.cssText=i;this.mask.style.cssText=n;if(!window.XMLHttpRequest){document.documentElement.scrollTop++;document.documentElement.scrollTop--}if(a.existMask){document.body.appendChild(this.mask)}},this.close=function(){document.getElementsByTagName("html")[0].style.backgroundImage="";this.box.style.cssText="";this.box.style.display="none";if(a.existMask){document.body.removeChild(this.mask)}};this.box=d;this.mask=document.createElement("div");this.box.style.display="block";var e=this.box.clientWidth,h=this.box.clientHeight;var f="position:fixed;left:0;top:0;z-index:32766;width:100%;height:100%;filter:alpha(opacity=70);-moz-opacity:0.7;opacity:0.7;background:#000;",g="display:block;position:fixed;left:50%;top:50%;z-index:32767;margin:-"+h/2+"px 0 0 -"+e/2+"px;";if(!window.XMLHttpRequest){f+="position:absolute;top:expression(documentElement.scrollTop);height:expression(document.documentElement.clientHeight);";g+="position:absolute;top:expression(documentElement.scrollTop + document.documentElement.clientHeight/2);";document.getElementsByTagName("html")[0].style.backgroundImage="url(blank)"}this.open(f,g);var l=this.box.getElementsByTagName("*");for(var c=0;c<l.length;c++){if(l[c].className=="btn-close"){var k=this;l[c].onclick=function(){k.close();return false};break}}},datatip:function(j){if(j){document.write('<style type="text/css">#data-tip b, #data-tip div{background-image:url('+j+")}</style>")}var a={x:15,y:15};var h=document.getElementsByTagName("a");for(var c=0;c<h.length;c++){if(h[c].getAttribute("data-tip")!=null){h[c].onmouseover=g;h[c].onmousemove=e;h[c].onmouseout=d}}function b(l,k){if(l.type!="mouseout"&&l.type!="mouseover"){return false}var i=l.relatedTarget?l.relatedTarget:l.type=="mouseout"?l.toElement:l.fromElement;while(i&&i!=k){i=i.parentNode}return(i!=k)}function g(){var k=window.event||arguments[0],i=k.srcElement||k.target;if(!b(k,this)){return}while(i&&!i.getAttribute("data-tip")){i=i.parentNode}html="<b></b><div>"+i.getAttribute("data-tip")+"</div>";var l=document.getElementById("data-tip");if(l){l.innerHTML=html;l.style.display="block"}else{var l=document.createElement("div");l.id="data-tip";l.innerHTML=html;document.body.appendChild(l)}}function e(){var k=document.getElementById("data-tip");if(!k){return}var i=window.event||arguments[0];var l=f(i);k.style.left=(l.x+a.x)+"px";k.style.top=(l.y+a.y)+"px"}function d(){var i=window.event||arguments[0];if(!b(i,this)){return}var k=document.getElementById("data-tip");if(!k){return}k.style.display="none"}function f(i){if(i.pageX){return{x:i.pageX,y:i.pageY}}else{return{x:i.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft),y:i.clientY+(document.documentElement.scrollTop||document.body.scrollTop)}}}},jsmenu:function(b){var d=jQuery(b);var a=jQuery(">ul>li",d).height();jQuery(">ul>li>ul",d).css({top:a});var c=jQuery("ul>li>ul",d).width();jQuery("ul ul ul",d).css({left:c}).siblings("a").addClass("expand");jQuery(">ul>li:last>ul",d).css({left:"auto",right:0}).find("ul").css({left:"auto",right:c});jQuery("li",d).hover(function(){jQuery(this).addClass("hover")},function(){jQuery(this).removeClass("hover")})}};jQuery(function(){jQuery("#J_BackToTop,#J_backToTop").click(function(){jQuery("html,body").animate({scrollTop:0},0);return false})});jQuery(function(){jQuery('.ui-button:not(".ui-button-disabled")').hover(function(){jQuery(this).addClass("ui-button-hover")},function(){jQuery(this).removeClass("ui-button-hover")});jQuery(".ui-button-disabled").click(function(){return false})});jQuery(function(){jQuery(".mod-msg .J_btnClose").click(function(){jQuery(this).parent(".mod-msg").fadeOut("fast")})});function setHomePage(f){var b=document.URL.split("/");var c="http://"+b[2]+"/";try{f.style.behavior="url(#default#homepage)";f.setHomePage(c)}catch(d){if(window.netscape){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")}catch(d){alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将[signed.applets.codebase_principal_support]设置为'true'")}var a=Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);a.setCharPref("browser.startup.homepage",c)}}}function addFavorite(){var a=document.URL.split("/");var c="http://"+a[2]+"/";var b=document.title;try{window.external.AddFavorite(c,b)}catch(d){window.sidebar.addPanel(b,c,"")}}function copyURL(){var b=top.location.href;var d=document.title;if(window.clipboardData){var a=d+"\n"+b;var c=window.clipboardData.setData("Text",a);if(c){alert("复制成功！按Ctrl+V ,粘贴到QQ或微博上发给你的好友们吧！")}}else{prompt("按Ctrl+C复制当前网址",b+" "+d)}};


/*cartoon_setting.js*/
$(function ($) {

    function init() {
        readModeInit(); //阅读模式初始化
        bgColorInit(); //背景颜色初始化
        tipsInit(); //tips初始化
        lightInit(); //关开灯初始化
        hotKeyInit(); //快捷键初始化	
		smoothInit();
        scrollStepInit();//步进初始化
    }
    init();

    //翻页事件处理
    function pageEvent(event) {
        var keyCode = event.keyCode;
        var pre_page_code = getSetting('pre_key') > 0 ? getSetting('pre_key') : 81;
        var next_page_code = getSetting('next_key') > 0 ? getSetting('next_key') : 65;
        //左右箭头翻页永远有效
        if (keyCode == pre_page_code || keyCode == 37) {
            prePage();
            return false;
        }
        if (keyCode == next_page_code || keyCode == 39) {
            nextPage();
            return false;
        }
    };

    //阅读模式初始化
    function readModeInit() {
        if (1 == getSetting('page_read_mode')) {
           // if (!isPageRead()) {
               // window.location.href = window.location.href.replace(/\.html.*$/, '.html') + '?mode=1';
           // }
        } else {
            if (isPageRead()) {
                window.location.href = window.location.href.replace(/\.html.*$/, '.html');
            }
        }
        if (isPageRead()) {
            $('#btn-read').parent().attr('class', 'read-1');
            $('#btn-read').html('打开新本子');
        }
		
		
    }

    
	$('#btn-read').click(function () {
        window.location.reload();
    });

    $('.btn-next-page').live('click', function () {
        window.location.reload();
    });

    $('.btn-drop-down').live('click', function () {
        window.location.reload();
    });
    //阅读模式end


    //观看设置
    $("#btn-setting").click(function () {
        if (1 == getSetting('image_auto_size_off')) {
            $("#setting_image_auto_size_off").attr('checked', false);
        }
		
		if (1 == getSetting('image_auto_smooth_on')) {
            $("#setting_image_auto_smooth_on").attr('checked', true);
        }
		
        //快捷键
        $("#pre_key").val(getKeyString(getSetting('pre_key')));
        $("#next_key").val(getKeyString(getSetting('next_key')));
        $(document).unbind("keydown", pageEvent);

        //每页显示图片
        var images_num = (null == getSetting('images_num')) ? 1 : getSetting('images_num');
        $("#setting_images_num input[value='" + images_num + "']").attr('checked', 'checked');

        //滚轮步进
        var scroll_step_input = (null == getSetting('scroll_step_input')) ? 0 : getSetting('scroll_step_input');
        $("#setting_scroll_step input[value='" + scroll_step_input + "']").attr('checked', 'checked');
		
        KISSDW.popupBox("none", { boxSelector: "#win-setting" });
        $(".actions-box .btn").click(); //关闭右下角设置框
    });


    //初始化滚轮步进
     function scrollStepInit() {
         if (null != getSetting("scroll_step_input")) {
             var _scroll_step = getSetting("scroll_step_input");
             //浏览器默认模式
             if (_scroll_step == 0)
             {
                 enableScroll();
             }
             else
             {
                 scrollstep = _scroll_step;
                 enableScroll();
                 disableScroll();
             }

         }
		 }
    //背景颜色初始化
    function bgColorInit() {
        if (null != getSetting("bg_color")) {
            switch (getSetting("bg_color")) {
                case 'body-white': bg_color = 'body-white'; break;
                case 'body-black': bg_color = 'body-black'; break;
                case 'body-gray': bg_color = 'body-gray'; break;
                case 'body-orange': bg_color = 'body-orange'; break;
                case 'body-blue': bg_color = 'body-blue'; break;
                case 'body-green': bg_color = 'body-green'; break;
                case 'body-pink': bg_color = 'body-pink'; break;
                default: bg_color = 'body-white'; break;
            }
            $("body").attr('class', bg_color);
        }
    }

    $("#setting_bg_color a").click(function () {
        var bg_color = $(this).attr('class').replace('bg', 'body');
        setSetting("bg_color", bg_color);
        $("body").attr('class', bg_color);
    });

    //大图自动缩小缩小设置
    $("#setting_image_auto_size_off").change(function () {
        if ('checked' == $(this).attr('checked')) {
            setSetting('image_auto_size_off', null);
        } else {
            setSetting('image_auto_size_off', 1);
        }
    });

    //滚轮平滑
    $("#setting_image_auto_smooth_on").change(function () {
        if ('checked' == $(this).attr('checked')) {
            setSetting('image_auto_smooth_on', 1);
        } else {
            setSetting('image_auto_smooth_on', null);
        }
		 scrollStepInit();
		
    });
	
	//平滑开关初始化	
    function smoothInit() {
        if (null != getSetting('image_auto_smooth_on')) {
            $('#setting_image_auto_smooth_on').attr("checked",true);
    }
	}
	
    //快捷键初始化	
    function hotKeyInit() {
        if (null == getSetting('pre_key')) {
            setSetting('pre_key', 81);
        }
        if (null == getSetting('next_key')) {
            setSetting('next_key', 65);
        }
        if (isPageRead()) {
            $(document).bind("keydown", pageEvent);
        }
    }

    $("#pre_key,#next_key").keydown(function (event) {
        var keyCode = event.keyCode;
        var keyString = getKeyString(keyCode);
        $(this).val(keyString);
        return false;
    });

    $("#pre_key,#next_key").keyup(function (event) {
        //错误提示
        var error = function (msg) {
            $("#win-setting-msg").html(msg);
            $("#win-setting-msg").show();
            $("#pre_key").val(getKeyString(getSetting('pre_key')));
            $("#next_key").val(getKeyString(getSetting('next_key')));
        };

        $("#win-setting-msg").hide(); //清空错误信息
        $("#win-setting-msg").html('');

        if ($("#pre_key").val() == "" || $("#next_key").val() == "") {
            error('快捷键不能为空！');
            return false;
        }
        if ($("#pre_key").val() == $("#next_key").val()) {
            error('快捷键不能相同！');
            return false;
        }
        setSetting($(this).attr('id'), event.keyCode);
        return false;
    });

    //每页显示图片
    $("#setting_images_num input[name='images_num']").change(function () {
        setSetting('images_num', $(this).val());
    });
	
	  //步进设置
    $("#setting_scroll_step input[name='scroll_step_input']").change(function () {
        setSetting('scroll_step_input', $(this).val());
        scrollStepInit();
    });
	
	

    //提交设置
    $("#setting_submit").click(function () {
        $("#setting_cancel").click();
        bengou_alert('观看设置', "设置成功！", function () { window.location.reload(); });
//        $.post('/post/setting',
//		   function (json) {
//		       $("#setting_cancel").click();
//		       if (json.status == 1) {
//		           $(document).bind("keydown", pageEvent);
//		           bengou_alert('观看设置', "设置成功！", function () { window.location.reload(); });
//		       } else {
//		           bengou_alert('观看设置', '设置失败，请稍后再试！');
//		       }
//		   },
//		   'json'
//	  	);
    });
    //观看设置end


    //开灯关灯
    function lightInit() {
        if (null != getSetting('light_bg_color')) {
            $("body").attr('class', 'body-black');
            $("#btn-light").parent().attr('class', 'light-2');
            $("#btn-light").html('开灯');
        }
    }

    $("#btn-light").click(function () {
        if ($(this).parent().attr('class') == 'light-1') { //关灯
            //关灯之前的背景颜色
            setSetting('light_bg_color', $("body").attr('class'));
            $("body").attr('class', 'body-black');
            $(this).parent().attr('class', 'light-2');
            $(this).html('开灯');
        } else { //开灯
            var bg_color = (null != getSetting('bg_color')) ? getSetting('bg_color') : getSetting('light_bg_color');
            bg_color = (null != bg_color) ? bg_color : 'body-gray';
            setSetting('light_bg_color', null);

            $("body").attr('class', bg_color);
            $(this).parent().attr('class', 'light-1');
            $(this).html('关灯');
            setSetting('light_on', null)
        }

        $(this).blur();
        return false;
    });


    //报错功能
    $("#btn-find").click(function () {
        $("#bug_title").html(document.title);
        $(document).unbind("keydown", pageEvent);
        KISSDW.popupBox("none", { boxSelector: "#win-find" });
        $(".actions-box .btn").click(); //关闭右下角设置框
    });

    //提交报错
    $("#bug_submit").click(function () {
        var title = document.title;
        var url = window.location.href.replace(/#.*$/, '');
        var type = '';
        $("#bug_type input:checked").each(function () {
            type += $(this).val() + '，';
        })
        var description = $('#bug_description').val();
        //获取浏览器类型及版本
        function getBrowser() {
            var userAgent = window.navigator.userAgent.toLowerCase();
            if (/(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test(userAgent)) {
                browser = RegExp.$1 + '-' + RegExp.$2
            } else if (/version\D+(\d[\d.]*).*safari/.test(userAgent)) { // safari
                browser = 'safari' + '-' + RegExp.$2
            } else {
                browser = 'unknown';
            }
            return browser;
        }
        var browser = getBrowser();
        $("#bug_cancel").click();
        $(document).bind("keydown", pageEvent);
        bengou_alert('我发现了', "提交成功！");

//        $.post('/post/bug',
//			   { 'title': title, 'url': url, 'type': type, 'description': description, 'browser': browser },
//			   function (json) {
//			       $("#bug_cancel").click();
//			       if (json.status == 1) {
//			           $(document).bind("keydown", pageEvent);
//			           bengou_alert('我发现了', "提交成功！");
//			       } else {
//			           bengou_alert('我发现了', '提交失败，请稍后再试！');
//			       }
//			   },
//			   'json'
//		  );
    });
    //报错功能end


    //分享功能
    $("#btn-share").click(function () {
        $("#chapter_url").val(window.location.href.replace(/\.html.*$/, '.html'))
        var open = window['open']
        KISSDW.popupBox("none", { boxSelector: "#win-share" });
        window['open'] = open; //修正系统的window.open()方法
        $(".actions-box .btn").click(); //关闭右下角设置框
    });

    function copyURL(url) {
        $("#win-share-close").click(); //关闭弹出层
        if (window.clipboardData) {
            if (window.clipboardData.setData("Text", url)) { bengou_alert('一键分享', "复制成功！"); }
        } else { prompt("按Ctrl+C复制当前网址", url); }
    };

    $("#copy_chapter_url").click(function () { copyURL($("#chapter_url").val()); });
    $("#copy_cartoon_url").click(function () { copyURL($("#cartoon_url").val()); });
    //分享功能end


    //tips
    //tips初始化
    function tipsInit() {
        //下拉模式去掉顶部提示
        if (!isPageRead()) {
            $("#tips_1").parent().hide();
        }
        //顶部提示
        if (1 == getSetting("tips_1")) {
            $("#tips_1").parent().hide();
        }
        //右下角提示
        if (1 == getSetting("tips_2")) {
            $("#tips_2").click();
        }
    }

    //顶部提示
    $("#tips_1").click(function () {
        setSetting("tips_1", 1);
        $(this).parent().hide();
        return false;
    });

    //右下角提示
    $("#tips_2").click(function () {
        setSetting("tips_2", 1);
        return false;
    });

    //最后一页的tips的“不在提示”
    $("#tips_page").click(function () {
        setSetting("tips_page", 1);
        if (isPageRead()) {
            nextChapter();
        }
        return false;
    });
    //tips end

});



/*totop.js*/
/**
 * @author Tuyo
 */


function BackToTop() {
    // 按钮
	if(/mode=1/.test(window.location.href)){
		var btnHtml = '<div id="backtotop"><a class="backtotop" href="#" ><i></i></a><a class="btn-drop-down" href="javascript:;"><i></i></a></div>';
	}else {
		var btnHtml = '<div id="backtotop"><a class="backtotop" href="#"><i></i></a><a class="btn-next-page" href="javascript:;"><i></i></a></div>';
	}
	$("body").append(btnHtml);

	var btn = $("#backtotop");
	btn.click(function(){$(this).hide()});

	// ie6
	if ( !window.XMLHttpRequest ) {
		btn.css({position: "absolute", bottom: "auto"});
	};

	// 显示隐藏
	function show() {
		btn.fadeIn();
	}
	function hide() {
		btn.fadeOut();
	}

	var aHeight = 800;
	$(window).scroll(function(){
		if ( getTop() > 800 ) {
			if ( btn.css("display") == "none" ) {
				btn.fadeIn();
			}

			// ie6
			if ( !window.XMLHttpRequest ) {
				setTop();
			}
		} else {
			btn.fadeOut();
		}
	});

	// 设置获取所需要高度
	function setTop() {
		var t = getTop();
		btn.css({top: t});
	}
	function getTop() {
		var t = document.documentElement.scrollTop || document.body.scrollTop,
			h = document.documentElement.clientHeight || document.body.clientHeight;

		return t + h - 190;
	}
}
var mobileweb=0;
$(document).ready(function(){
	if(mobileweb==0) BackToTop();
});