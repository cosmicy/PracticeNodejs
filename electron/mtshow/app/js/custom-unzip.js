
var entryList = null;

// FIXME: This function is super inefficient
function isValidImageType(file_name) {
    file_name = file_name.toLowerCase();
    return file_name.endsWith('.jpeg') ||
			file_name.endsWith('.jpg') ||
			file_name.endsWith('.png') ||
			file_name.endsWith('.bmp') ||
			file_name.endsWith('.webp') ||
			file_name.endsWith('.gif');
}

// FIXME: This function is super inefficient
function getFileMimeType(file_name) {
    file_name = file_name.toLowerCase();
    if (file_name.endsWith('.jpeg') || file_name.endsWith('.jpg')) {
        return 'image/jpeg';
    } else if (file_name.endsWith('.png')) {
        return 'image/png';
    } else if (file_name.endsWith('.bmp')) {
        return 'image/bmp';
    } else if (file_name.endsWith('.webp')) {
        return 'image/webp';
    } else if (file_name.endsWith('.gif')) {
        return 'image/gif';
    } else {
        // Uses jpeg as default mime type
        return 'image/jpeg';
    }
}

function toFriendlySize(size) {
    if (size >= 1024000000) {
        return (size / 1024000000).toFixed(2) + ' GB';
    } else if (size >= 1024000) {
        return (size / 1024000).toFixed(2) + ' MB';
    } else if (size >= 1024) {
        return (size / 1024).toFixed(2) + ' KB';
    } else if (size >= 1) {
        return (size / 1).toFixed(2) + ' B';
    } else if (size === 0) {
        return '0 B';
    }

    return '?';
}

function onClick(entry) {
    var img = document.getElementById('currentImage');
    img.src = '';

    entry.readData(function (data, err) {
        // Convert the data into an Object URL
        var blob = new Blob([data], { type: getFileMimeType(entry.name) });
        var url = URL.createObjectURL(blob);

        img.src = url;
        img.onload = function () {
            URL.revokeObjectURL(url);
        };
    });
}

function getbobl(entry,callback) {
    
    entry.readData(function (data, err) {
        // Convert the data into an Object URL
        var blob = new Blob([data], { type: getFileMimeType(entry.name) });
        var url = URL.createObjectURL(blob);
        callback(url);
        
    });
}




function createLinkForEachEntry(archive) {
    // Get only the entries that are images
    var entries = [];
    archive.entries.forEach(function (entry) {
        if (isValidImageType(entry.name)) {
            entries.push(entry);
        }
    });
    archive.entries = entries;

    archive.entries.forEach(function (entry) {
        if (entry.is_file) {
            // Add a BR to the document
            entryList.appendChild(document.createElement('br'));

            // Add a link to the Object URL
            var a = document.createElement('a');
            a.innerHTML = entry.name + ' (' + toFriendlySize(entry.size_uncompressed) + ')';
            a.href = '#' + entry.name;

            // Uncompress the entry when the link is clicked on
            a.addEventListener('click', function (e) {
                console.info('clicked .................');
                onClick(entry);
            });

            entryList.appendChild(a);
        }
    });

    //archiveClose(archive);
}


function putintoForEachEntry(archive) {
    // Get only the entries that are images
    var entries = [];
    archive.entries.forEach(function (entry) {
        if (isValidImageType(entry.name)) {
            entries.push(entry);
        }
    });
    archive.entries = entries;

    archive.entries.forEach(function (entry) {
        if (entry.is_file) {
  
          
            //这边先放入入口 不解压
            fileList2.push(entry);
            //标记为ZIP解压
            archiveTypeList.push('archive');

            lunxunCountIncludingZIP++;
        
        }
    });

    //archiveClose(archive);
}























    var archiveTypeList = [];
   
    var zipini = false;
    var zipcount = 0;
    var zipfileamount = 0;

    function pushIntoList(file)
    {
       

        //集中处理压缩文件

        console.log(getMMEtype(file.name));
        if (getMMEtype(file.name) === 'application/zip' || getMMEtype(file.name) === 'application/rar' || getMMEtype(file.name) === 'application/tar')
        {
 

                archiveOpenFile(file, function (archive, err) {
                    if (archive) {
                        console.info('Uncompressing ' + archive.archive_type + ' ...');
                      
                        putintoForEachEntry(archive);

                    } else {
                        console.info('not a  archive');
                    }
                });

                //zipfileamount = fileList2.length <=3 ? fileList2.length : 3;


                ////优先载入前三张再显示
                ////把图片压入栈
                ////我也不知道为什么不能用for循环
                //if (fileList2.length>=1)
                //getZIPbobl(fileList2[0], function (blobURL) {

                //    //这边先放入入口 不解压
                //    fileList2[0] = blobURL;
                //    zipcount += 1;
                //    //标记为ZIP解压
                //    archiveTypeList[0] = 'null';

                //});
                //if (fileList2.length >= 2)
                //getZIPbobl(fileList2[1], function (blobURL) {

                //    //这边先放入入口 不解压
                //    fileList2[1] = blobURL;
                //    zipcount += 1;
                //    //标记为ZIP解压
                //    archiveTypeList[1] = 'null';

                //});
                //if (fileList2.length >= 3)
                //getZIPbobl(fileList2[2], function (blobURL) {

                //    //这边先放入入口 不解压
                //    fileList2[2] = blobURL;
                //    zipcount += 1;
                //    //标记为ZIP解压
                //    archiveTypeList[2] = 'null';

                //});

                //entries.forEach(function (entry) {
       



                //    //将所有图片入口放入数组
                //    if (isSupportType(entry.filename))
                //    {
                //        //这边先放入入口 不解压
                //        fileList2.push(entry);
                //        //标记为ZIP解压
                //        archiveTypeList.push('application/zip');

                //    }
                //  //  console.log("shuzuleath:" + fileList2.length);
                   

                //});
              //  console.log("shuzuleddssath:" + entriesList.length);

                //getbobl(entriesList[2], function (blobURL) {

                //    console.info(blobURL);

                //});

            

        }
            //图片文件扔进去
        else if (isSupportTypeLittle(file.name))
        {
            fileList2.push(window.URL.createObjectURL(file));
            archiveTypeList.push('null');
            lunxunCountIncludingZIP++;
        }
    

        //return;



    }
    

    function isSupportType(filepath) {

        //定义格式
        var tp = "jpg,gif,bmp,png,zip,rar,tar";

        //为了避免转义反斜杠出问题，这里将对其进行转换
        var re = /(\\+)/g;
        var filename = filepath.replace(re, "#");
        //对路径字符串进行剪切截取
        var one = filename.split("#");
        //获取数组中最后一个，即文件名
        var two = one[one.length - 1];
        //再对文件名进行截取，以取得后缀名
        var three = two.split(".");
        //获取截取的最后一个字符串，即为后缀名
        var last = three[three.length - 1];
        //添加需要判断的后缀名类型
        //返回符合条件的后缀名在字符串中的位置
        var rs = tp.indexOf(last.toLowerCase());
        //如果返回的结果大于或等于0，说明包含允许上传的文件类型
        if (rs >= 0) {
            return true;
        } else {
            //alert("您选择的上传文件不是有效的图片文件！");
            return false;
        }
    }



    function isSupportTypeLittle(filepath) {

        //定义格式
        var tp = "jpg,gif,bmp,png";

        //为了避免转义反斜杠出问题，这里将对其进行转换
        var re = /(\\+)/g;
        var filename = filepath.replace(re, "#");
        //对路径字符串进行剪切截取
        var one = filename.split("#");
        //获取数组中最后一个，即文件名
        var two = one[one.length - 1];
        //再对文件名进行截取，以取得后缀名
        var three = two.split(".");
        //获取截取的最后一个字符串，即为后缀名
        var last = three[three.length - 1];
        //添加需要判断的后缀名类型
        //返回符合条件的后缀名在字符串中的位置
        var rs = tp.indexOf(last.toLowerCase());
        //如果返回的结果大于或等于0，说明包含允许上传的文件类型
        if (rs >= 0) {
            return true;
        } else {
            //alert("您选择的上传文件不是有效的图片文件！");
            return false;
        }
    }



    function getMMEtype(filepath)
    {
        //定义格式
       


        //为了避免转义反斜杠出问题，这里将对其进行转换
        var re = /(\\+)/g;
        var filename = filepath.replace(re, "#");
        //对路径字符串进行剪切截取
        var one = filename.split("#");
        //获取数组中最后一个，即文件名
        var two = one[one.length - 1];
        //再对文件名进行截取，以取得后缀名
        var three = two.split(".");
        //获取截取的最后一个字符串，即为后缀名
        var last = three[three.length - 1];
        //添加需要判断的后缀名类型
        //返回符合条件的后缀名在字符串中的位置
        var rs = 'zip'.indexOf(last.toLowerCase());
        //如果返回的结果大于或等于0，说明包含允许上传的文件类型
        if (rs >= 0) {
            return 'application/zip';
        }

        rs = 'rar'.indexOf(last.toLowerCase());
        //如果返回的结果大于或等于0，说明包含允许上传的文件类型
        if (rs >= 0) {
            return 'application/rar';
        }

        rs = 'tar'.indexOf(last.toLowerCase());
        //如果返回的结果大于或等于0，说明包含允许上传的文件类型
        if (rs >= 0) {
            return 'application/tar';
        }


        return last.toLowerCase();

    }


    window.onload = function () {
        // Load all the archive formats
        loadArchiveFormats(['rar', 'zip', 'tar']);


    };