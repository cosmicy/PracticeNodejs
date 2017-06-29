
var template = "default";
var comicid = 1;
var viewid = 1;
var allpage = 1;
var cid = 1;
var webImgUrl = "http://wusagi.pw/";
var WebimgServer = new Array();
var WebimgServerURL = new Array();
WebimgServer[0] = "普通";


var chapterTree = ['preview'];

picTree = ['\/preview.JPG'];
var pic_base = '';

var chapter_base = 'http://wusagi.pw';
var currentPageIndex = 0;
var currentPic = 0;
var currentChapterid = 'preview.html';


function reloadmyson() {

    picTree = fileList2;

    var jsElem = document.createElement('script');
    jsElem.src = 'js/cartoon_detail_scroll.js';

    $("#layoutbt").fadeOut();
    $("#pic-list").hide();
    $("#_logo").fadeOut();
    $("#hidediv").fadeOut();
    $("#pic-list").fadeIn(2000);
    $("#welcometitle").fadeIn(1000);
    document.getElementsByTagName('head')[0].appendChild(jsElem);
}


//支持拖入的文件列表
var supportTypes = ['image/png', 'image/jpeg', 'image/gif', 'application/zip', 'application/rar', 'application/tar']

window.requestFileSystem = window.requestFileSystem ||
    window.webkitRequestFileSystem;
window.resolveLocalFileSystemURL = window.webkitResolveLocalFileSystemURL ||
    window.webkitResolveLocalFileSystemURL;
var fileList2 = [];


var DONE_MSG = '载入完成';
var NOT_IMG_MSG = '这玩意儿根本不是图片啊..';
//轮询标记位
var lunxun = 0;
var lunxunCount = 0;
var lunxunCountIncludingZIP = 0;
function setLoadingTxt(obj) {
    var el = document.querySelector('aside');
    if (obj && obj.txt) {
        var stayOpen = obj.stayOpen || false;
        var isError = obj.error || false;

        if (isError) {
            el.classList.add('red');
        }

        el.textContent = obj.txt;
        el.classList.add('show');

        if (!stayOpen) {
            window.setTimeout(setLoadingTxt, 3000);
        }
    } else {
        el.classList.remove('show');
        el.classList.remove('red');
    }
}


// 递归调用
function readDirectory(entries) {

    //文件总数 不包括文件夹
    lunxunCount += entries.length;

    for (i = 0; i < entries.length; i++) {

        if (entries[i].isDirectory == null) continue;

        if (entries[i].isDirectory) {
            lunxunCount -= 1;

            var directoryReader = entries[i].createReader();
            getAllEntries(
                directoryReader,
                readDirectory
            );

        } else {
            entries[i].file(appendFile, errorHandler);
        }
    }
}


function appendFile(file) {

    console.log(file.name);

    if (file.type === 'text/plain')
        appendTextFile(file);

    if (supportTypes.indexOf(file.type) > -1)
        appendImageFile(file);
    else {

        if (isSupportType(file.name))
            appendImageFile(file);
    }
}


function appendImageFile(file) {


    //  console.log(window.URL.createObjectURL(file));

    //fileList2.push(window.URL.createObjectURL(file));

    pushIntoList(file);
    lunxun += 1;

    // console.log(fileList2.length);

}



// This is needed to get all directory entries as one
// call of readEntries may not return all items. Works a
// bit like stream reader.
function getAllEntries(directoryReader, callback) {
    var entries = [];
    var readEntries = function () {
        directoryReader.readEntries(function (results) {
            if (!results.length) {
                //entries.sort();
                callback(entries);
            } else {
                entries = entries.concat(toArray(results));
                readEntries();
            }
        }, errorHandler);
    };

    readEntries();
}


function toArray(list) {
    return Array.prototype.slice.call(list || [], 0);
}

function errorHandler(e) {
    console.log('FileSystem API error code: ' + e.code)
}


function onChange(e) {
    e.stopPropagation();
    e.preventDefault();


    var files = e.target.files;
    lunxunCount = files.length;

    setLoadingTxt({
        txt: '正在预读图片...',
        stayOpen: true
    });


    for (var i = 0, len = files.length; i < len; i++) {

        appendFile(files.item(i));


    }

    temp = 0;

    goo = self.setInterval("clock()", 100)

}

function onError(e) {
    switch (e.code) {
        case FileError.INVALID_MODIFICATION_ERR:
            setLoadingTxt({
                txt: 'Error: that directory path already exists',
                error: true
            });
            break;
        default:
            setLoadingTxt({ txt: 'Error code: ' + e.code, error: true });
            break;
    }
}

function showtip() {

    if (fileList2.length >= 1000) {

        setLoadingTxt({
            txt: '前方检测到核能反应！已载入' + fileList2.length + '张图片',
            stayOpen: false,
            error: true
        });

    } else if (fileList2.length >= 300) {
        setLoadingTxt({
            txt: '要升天了！已载入' + fileList2.length + '张图片',
            stayOpen: false,
        });
    }
    else {
        setLoadingTxt({
            txt: '已载入:' + fileList2.length + '张图片',
            stayOpen: false,

        });
    }

}

var temp = 0;
var chaoshi = 0;


function clock() {
    chaoshi++;
    //如果半秒内数组不再增加 则判定结束
    if (fileList2.length > 0) {




        clearTimeout(goo);
        // console.log('获取结束总共');
        // console.log(fileList2.length);
        showtip();
        // console.log(fileList2.length);
        //var filesDiv = document.querySelector('#files');
        // filesDiv.innerHTML = fileList2.join('\n');
        reloadmyson();


    }
    else {
        temp = fileList2.length;
    }

    if (chaoshi > 50) {
        clearTimeout(goo);

        setLoadingTxt({
            txt: '失败！载入了不可接受的文件！',
            stayOpen: false,
            error: true

        });

        chaoshi = 0;


    }



}


function onDrop(e) {
    e.preventDefault();
    e.stopPropagation();


    setLoadingTxt({
        txt: '正在预读图片...',
        stayOpen: true
    });



    //业界毒瘤ie无法支持文件夹拖放 
    if (!!window.ActiveXObject || "ActiveXObject" in window) { // IE 


        var files = e.dataTransfer.files

        lunxunCount = files.length;

        setLoadingTxt({
            txt: '正在预读图片...',
            stayOpen: true
        });


        for (var i = 0, len = files.length; i < len; i++) {

            appendFile(files.item(i));


        }

        temp = 0;

        goo = self.setInterval("clock()", 1000)



        return;



    }







    var length = e.dataTransfer.items.length;
    if (length > -1) {

    }

    for (var i = 0; i < length; i++) {
        var entries = [];
        entries[0] = e.dataTransfer.items[i].webkitGetAsEntry();
        readDirectory(entries);
    }

    temp = 0;

    goo = self.setInterval("clock()", 100)

}

function init() {
    document.querySelector('input[type="file"]').addEventListener('change', onChange);

    var dropZone = document.querySelector('[dropzone]');

    dropZone.addEventListener('drop', onDrop);

    dropZone.addEventListener('dragover', function (e) {
        e.preventDefault(); // Necessary. Allows us to drop.

        var imgPre = document.getElementById('logo_pic');
        imgPre.src = 'img/logo_02.png';

    });

    dropZone.addEventListener('dragenter', function (e) {
        e.target.classList.add('active');
    });

    dropZone.addEventListener('dragleave', function (e) {
        e.target.classList.remove('active');


        var imgPre = document.getElementById('logo_pic');
        imgPre.src = 'img/logo_01.png';

    });

    window.addEventListener('keydown', function (e) {
        if (e.keyCode == 27) { // ESC
            document.querySelector('details').open = false;
        }
    });


}

init();