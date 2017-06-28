
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
  
          
            //����ȷ������ ����ѹ
            fileList2.push(entry);
            //���ΪZIP��ѹ
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
       

        //���д���ѹ���ļ�

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


                ////��������ǰ��������ʾ
                ////��ͼƬѹ��ջ
                ////��Ҳ��֪��Ϊʲô������forѭ��
                //if (fileList2.length>=1)
                //getZIPbobl(fileList2[0], function (blobURL) {

                //    //����ȷ������ ����ѹ
                //    fileList2[0] = blobURL;
                //    zipcount += 1;
                //    //���ΪZIP��ѹ
                //    archiveTypeList[0] = 'null';

                //});
                //if (fileList2.length >= 2)
                //getZIPbobl(fileList2[1], function (blobURL) {

                //    //����ȷ������ ����ѹ
                //    fileList2[1] = blobURL;
                //    zipcount += 1;
                //    //���ΪZIP��ѹ
                //    archiveTypeList[1] = 'null';

                //});
                //if (fileList2.length >= 3)
                //getZIPbobl(fileList2[2], function (blobURL) {

                //    //����ȷ������ ����ѹ
                //    fileList2[2] = blobURL;
                //    zipcount += 1;
                //    //���ΪZIP��ѹ
                //    archiveTypeList[2] = 'null';

                //});

                //entries.forEach(function (entry) {
       



                //    //������ͼƬ��ڷ�������
                //    if (isSupportType(entry.filename))
                //    {
                //        //����ȷ������ ����ѹ
                //        fileList2.push(entry);
                //        //���ΪZIP��ѹ
                //        archiveTypeList.push('application/zip');

                //    }
                //  //  console.log("shuzuleath:" + fileList2.length);
                   

                //});
              //  console.log("shuzuleddssath:" + entriesList.length);

                //getbobl(entriesList[2], function (blobURL) {

                //    console.info(blobURL);

                //});

            

        }
            //ͼƬ�ļ��ӽ�ȥ
        else if (isSupportTypeLittle(file.name))
        {
            fileList2.push(window.URL.createObjectURL(file));
            archiveTypeList.push('null');
            lunxunCountIncludingZIP++;
        }
    

        //return;



    }
    

    function isSupportType(filepath) {

        //�����ʽ
        var tp = "jpg,gif,bmp,png,zip,rar,tar";

        //Ϊ�˱���ת�巴б�ܳ����⣬���ｫ�������ת��
        var re = /(\\+)/g;
        var filename = filepath.replace(re, "#");
        //��·���ַ������м��н�ȡ
        var one = filename.split("#");
        //��ȡ���������һ�������ļ���
        var two = one[one.length - 1];
        //�ٶ��ļ������н�ȡ����ȡ�ú�׺��
        var three = two.split(".");
        //��ȡ��ȡ�����һ���ַ�������Ϊ��׺��
        var last = three[three.length - 1];
        //�����Ҫ�жϵĺ�׺������
        //���ط��������ĺ�׺�����ַ����е�λ��
        var rs = tp.indexOf(last.toLowerCase());
        //������صĽ�����ڻ����0��˵�����������ϴ����ļ�����
        if (rs >= 0) {
            return true;
        } else {
            //alert("��ѡ����ϴ��ļ�������Ч��ͼƬ�ļ���");
            return false;
        }
    }



    function isSupportTypeLittle(filepath) {

        //�����ʽ
        var tp = "jpg,gif,bmp,png";

        //Ϊ�˱���ת�巴б�ܳ����⣬���ｫ�������ת��
        var re = /(\\+)/g;
        var filename = filepath.replace(re, "#");
        //��·���ַ������м��н�ȡ
        var one = filename.split("#");
        //��ȡ���������һ�������ļ���
        var two = one[one.length - 1];
        //�ٶ��ļ������н�ȡ����ȡ�ú�׺��
        var three = two.split(".");
        //��ȡ��ȡ�����һ���ַ�������Ϊ��׺��
        var last = three[three.length - 1];
        //�����Ҫ�жϵĺ�׺������
        //���ط��������ĺ�׺�����ַ����е�λ��
        var rs = tp.indexOf(last.toLowerCase());
        //������صĽ�����ڻ����0��˵�����������ϴ����ļ�����
        if (rs >= 0) {
            return true;
        } else {
            //alert("��ѡ����ϴ��ļ�������Ч��ͼƬ�ļ���");
            return false;
        }
    }



    function getMMEtype(filepath)
    {
        //�����ʽ
       


        //Ϊ�˱���ת�巴б�ܳ����⣬���ｫ�������ת��
        var re = /(\\+)/g;
        var filename = filepath.replace(re, "#");
        //��·���ַ������м��н�ȡ
        var one = filename.split("#");
        //��ȡ���������һ�������ļ���
        var two = one[one.length - 1];
        //�ٶ��ļ������н�ȡ����ȡ�ú�׺��
        var three = two.split(".");
        //��ȡ��ȡ�����һ���ַ�������Ϊ��׺��
        var last = three[three.length - 1];
        //�����Ҫ�жϵĺ�׺������
        //���ط��������ĺ�׺�����ַ����е�λ��
        var rs = 'zip'.indexOf(last.toLowerCase());
        //������صĽ�����ڻ����0��˵�����������ϴ����ļ�����
        if (rs >= 0) {
            return 'application/zip';
        }

        rs = 'rar'.indexOf(last.toLowerCase());
        //������صĽ�����ڻ����0��˵�����������ϴ����ļ�����
        if (rs >= 0) {
            return 'application/rar';
        }

        rs = 'tar'.indexOf(last.toLowerCase());
        //������صĽ�����ڻ����0��˵�����������ϴ����ļ�����
        if (rs >= 0) {
            return 'application/tar';
        }


        return last.toLowerCase();

    }


    window.onload = function () {
        // Load all the archive formats
        loadArchiveFormats(['rar', 'zip', 'tar']);


    };