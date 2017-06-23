$(function () {
    var jPicList = $('#pic-list');
    var sTimer = null;

    cartoon_init();

    $(window).scroll(function scrollHandler() {
        clearTimeout(sTimer);
        sTimer = setTimeout(function () {
            if (window.loaded == 1) {
                $(window).unbind("scroll", scrollHandler);
            }
            var c = document.documentElement.clientHeight || document.body.clientHeight, t = $(document).scrollTop();
            if (t + c >= jPicList.offset().top + jPicList.height()) {
                loadMore();
            }
        },
							100
						);
    });

    function loadMore() {
        if (window.loaded == 1) return;
        if (currentPageIndex >= lunxunCountIncludingZIP) return;
        if (currentPageIndex < picTree.length) {
            showPic();
        } else {
            window.loaded = 1;
            $("#bottom_chapter").show(); //底部显示上一话下一话
        }
    }



  
    function showpreview(blobURL,tmp)
    {
        $.preLoadImg(pic_base + picTree[loadPageIndex], function () { showPic2(); });
    }


    //加载图片
    var loadPageIndex = -1;
	var currentPageIndex=0;
    var intervalHandle = setInterval(function loadPic() {
        if ((currentPageIndex + 1) == loadPageIndex) {
            return false;
        }
        loadPageIndex = currentPageIndex + 1;

        if (loadPageIndex >= picTree.length) {
            clearInterval(intervalHandle);
            return;
        }
        var c = document.documentElement.clientHeight || document.body.clientHeight, t = $(document).scrollTop();
        if (t + c + 6000 >= jPicList.offset().top + jPicList.height()) {
            //加载图片，加载完之后立即显示

            if (archiveTypeList[loadPageIndex] == 'null')
                 $.preLoadImg(pic_base + picTree[loadPageIndex], function () { showPic(); });
            else
            {

                if (archiveTypeList[loadPageIndex] == 'archive')
                {
      
                    getbobl(picTree[loadPageIndex], function (blobURL) {
        
                        picTree[loadPageIndex] = blobURL;
                        archiveTypeList[loadPageIndex] = 'null';
                        //console.log callback over
                        showpreview(blobURL);

   

                    });

                   // showPic();

                }

                //再说
                if (archiveTypeList[loadPageIndex] == 'application/rar') {

                }

                //再说
                if (archiveTypeList[loadPageIndex] == 'application/7z') {

                }

            }


        }
    },
				100);





    var lastPageIndex = -1;



    function showPic() {
        
      
     //   if (Object.prototype.toString.call(picTree[currentPageIndex]) != "[object String]")
        //    return;
       // console.log("show:" + picTree[currentPageIndex] + 'page:' + currentPageIndex);

        if (archiveTypeList[currentPageIndex] == 'archive') {
            console.log('show:no zip star archive');
            getbobl(picTree[currentPageIndex], function (blobURL) {

                picTree[currentPageIndex] = blobURL;
                archiveTypeList[currentPageIndex] = 'null';
                //console.log callback over
                showpreview(blobURL);
     

            });

            // showPic();

            return;

        }



        //当前图片尚未加载完之前，不显示下一张图片
        if (currentPageIndex == lastPageIndex) {
            return false;
        }


        lastPageIndex = currentPageIndex;

        var num = currentPageIndex + 1;
        var imgStr = '<img src="' + pic_base + picTree[currentPageIndex] + '" alt="" />';
        var imgInfo = '<p class="img_info">(' + num + '/' + picTree.length + ')</p>';
        jPicList.append(imgStr);

        var lastImgObj = $('#pic-list img').last();
        lastImgObj.hide();
        $('#loading').show();
        //自适应大小
        lastImgObj.imgAutoSize(imageMaxWidth,
								0,
								function () {
								    $('#loading').hide();
								    lastImgObj.show();
								    jPicList.append(imgInfo);
								    currentPageIndex++;
								}
							);

    }


    function showPic2() {

       // console.log(currentPageIndex);
       //    if (Object.prototype.toString.call(picTree[currentPageIndex]) != "[object String]")
          //  return;
      //  console.log("show:" + picTree[currentPageIndex] + 'page:' + currentPageIndex);

        if (archiveTypeList[currentPageIndex] != 'null') return;

        //当前图片尚未加载完之前，不显示下一张图片
        if (currentPageIndex == lastPageIndex) {
            return false;
        }


        lastPageIndex = currentPageIndex;

        var num = currentPageIndex + 1;
        var imgStr = '<img src="' + pic_base + picTree[currentPageIndex] + '" alt="" />';
        var imgInfo = '<p class="img_info">('+ num + '/' + picTree.length + ')</p>';
        jPicList.append(imgStr);

        var lastImgObj = $('#pic-list img').last();
        lastImgObj.hide();
        $('#loading').show();
        //自适应大小
        lastImgObj.imgAutoSize(imageMaxWidth,
								0,
								function () {
								    $('#loading').hide();
								    lastImgObj.show();
								    jPicList.append(imgInfo);
								    currentPageIndex++;
								}
							);

    }



    showPic();

    $("#pic-list").drag(); //图片拖拽功能
    $("#chapter_title").append('  共' + picTree.length + '页');

    //观看记录与记号
   // addHistory(cid, getUserActionData(currentPageIndex));
    var lastHistoryPageIndex = currentPageIndex;
    var startHistoryPageIndex = lastHistoryPageIndex;
    function getPageindex() {
        var images_height = jPicList.offset().top; ;
        var c = document.documentElement.clientHeight || document.body.clientHeight, t = $(document).scrollTop();
        var scroll_height = t + c;
        var pageIndex = startHistoryPageIndex;
        $('#pic-list img').each(function (i) {
            images_height += $(this).height();
            if (images_height > scroll_height) {
                var num = startHistoryPageIndex + i - 2;
                num = (num > startHistoryPageIndex) ? num : startHistoryPageIndex;
                pageIndex = (num < picTree.length) ? num : picTree.length - 1;
                return false;
            }
        });
        return pageIndex;
    }
    setInterval(function () {
        var num = getPageindex()
        if (num > lastHistoryPageIndex) {
            lastHistoryPageIndex = num;
           // addHistory(cid, getUserActionData(num));
        }
        return false;
    }, 3000);

    $(".btn-mark").click(function () {
        addMark(cid, getUserActionData(getPageindex()));
        bengou_alert('做个记号', '记号做好了！');
        return false;
    });
});
