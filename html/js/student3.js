       // File构造函数
       function File(obj) {
        // 文件总个数
        this.fileLength = 0;
        // 文件数组
        this.fileList = [];
        // 对象参数配置文件
        this.config = {
            // 最大文件个数
            maxFileLength: obj.maxFileLength || 2,
            // 最大文件大小
            maxFileSize: obj.maxFileSize || 1024,
            // 允许的文件后缀
            fileSuffix: obj.fileSuffix || ['xlsx'],
            // 是否阻止默认打开弹窗
            StopDialog: obj.StopDialog || false,
            // 弹窗的样式  宽 高
            shadeDialogStyle: obj.shade || [null, null],
            // 是否开启按钮样式
            showBtnImgStyle: obj.showBtn || false,
        };
        // fileDom中存储的唯一的dom节点
        this.dom = {
            // input 文件选中输入框dom
            inputDom: null,
            // append-item 添加点击dom
            imageItemDom: null,
            // 要向hj-append-item节点后面追加图片的dom
            appendItemDom: null,
            // 要向hj-file-list节点后面添加图片列表的dom
            appendListDom: null,

        };
        // 事件处理对象
        this.event = {
                // append-item点击事件处理
                imageItemClick: () => {
                    this.dom.inputDom.click();
                },
                // input 文件选中输入框选择完图片之后事件处理
                changeLoadFile: (file) => {
                    this.method.filterFile(file.target.files);
                },
                // 图片删除事件
                imgDeleteClick: (id) => {
                    for (let index = 0; index < this.fileList.length; index++) {
                        if (this.fileList[index].id == id) {
                            let _before = this.fileList.slice(0, index == this.fileList.length ? index - 1 :
                                index);
                            let _after = this.fileList.slice(index + 1);
                            _before = _before.concat(_after);
                            // 删除图片
                            this.method.deleteImg(id);

                            setTimeout(() => {
                                this.fileList[index].dom.remove();
                                this.fileList[index].listDom.remove();
                                this.fileLength--;
                                this.fileList = _before;
                            }, 600);
                            break;
                        }
                    }
                    1

                },
                // 图片放大事件
                imgLargeClick: (id) => {
                    let imgFile = this.privateUtils.foreachFileListToId(id);
                    console.log(imgFile);
                    this.callBack.onlargeClickCallBack(imgFile, this);
                    if (this.config.StopDialog) return;
                    let hjShadeDiv = document.getElementsByClassName('hj-shade');
                    if (hjShadeDiv.length != 0) return;
                    let div = document.createElement('div');
                    div.className = 'hj-shade';
                    let div2 = document.createElement('div');
                    div2.className = 'hj-box';
                    let img = document.createElement('img');
                    img.className = 'hj-img';
                    img.src = imgFile.base64;
                    div2.appendChild(img);
                    div.addEventListener('click', (event) => {
                        this.callBack.ondialogBeforeClose({
                            event: event,
                            imgFile: imgFile,
                        });
                        div.className = div.className + ' hj-shade-hidden';
                        setTimeout(() => {
                            document.body.removeChild(div);
                        }, 500);
                    })
                    // 防止在按钮模式下，会出现第一次没有加载完成，高长为0的不正常情况
                    img.onload = () => {
                        div.appendChild(div2);
                        document.body.appendChild(div);
                        this.privateUtils.computeDialogWH(img, div2);
                    }

                },
            },
            this.method = {
                // 过滤图片
                filterFile: (list) => {
                    for (let index = 0; index < list.length; index++) {
                        let size = parseInt(list[index].size / 1024);
                        let suffix = list[index].name.substring(list[index].name
                            .lastIndexOf('.') + 1);
                        // 是否符合后缀
                        let isTrue = false;
                        // 判断文件大小
                        if (size > this.config.maxFileSize) {
                            console.log("文件太大");
                            alert("文件太大！")
                            break;
                        }
                        for (let j = 0; j < this.config.fileSuffix.length; j++) {
                            if (suffix == this.config.fileSuffix[j]) {
                                isTrue = true;
                                break;
                            }
                        }
                        if (isTrue) {
                            let id = parseInt(Math.random() * 100000);
                            this.fileList.push({
                                id: id,
                                file: list[index],
                                base64: '',
                                dom: '',
                                listDom: '',
                            });
                            console.log(this.fileList);
                            this.method.streamToImgBase64(list[index], id);
                        } else {
                            console.log("文件后缀不符合,请上传.xlsx文件！");
                            alert("文件后缀不符合,请上传.xlsx文件！");
                        }
                    }
                },
                // 处理图片展示
                streamToImgBase64: (file, id) => {
                    var fileReader = new FileReader();
                    fileReader.onload = (data) => {
                        this.method.appendImage(data.target.result, id);
                    }
                    fileReader.readAsDataURL(file);

                },
                // 追加图片到dom节点中
                appendImage: (url, id) => {
                    let div = document.createElement('div');
                    div.className = 'image-item margin-class';
                    div.style.backgroundImage = 'url(' + url + ')';
                    for (let index = 0; index < this.fileList.length; index++) {
                        if (this.fileList[index].id == id) {
                            this.fileList[index].dom = div;
                            this.fileList[index].base64 = url;
                            break;
                        }
                    }
                    // 创建删除dom,全部使用addEventListener
                    let largeDom = document.createElement('div');
                    largeDom.className = 'largeImg z-index-promote';
                    largeDom.innerHTML = `<img src="./img/big.png" >`;
                    largeDom.addEventListener('click', () => {
                        this.event.imgLargeClick(id);
                    })
                    let deleteDom = document.createElement('div');
                    deleteDom.className = 'deleteImg z-index-promote';
                    deleteDom.innerHTML = `<img src="./img/delete.png" >`;
                    deleteDom.addEventListener('click', () => {
                        this.event.imgDeleteClick(id);
                    })
                    div.appendChild(largeDom);
                    div.appendChild(deleteDom);
                    this.dom.appendItemDom.appendChild(div);
                    this.fileLength++;
                    // 添加图片列表
                    this.method.addImgList(id);
                },
                // 删除图片
                deleteImg: (id) => {
                    for (let index = 0; index < this.fileList.length; index++) {
                        if (this.fileList[index].id == id) {
                            let item = this.fileList[index];
                            let cless = item.dom.getAttribute('class');
                            let clessList = item.listDom.getAttribute('class');
                            this.fileList[index].dom.setAttribute("class", cless + " image-item-delete");
                            this.fileList[index].listDom.setAttribute("class", clessList + " hj-list-hidden ")
                            break;
                        }
                    }
                },
                // 添加图片列表
                addImgList: (id) => {
                    let file = this.privateUtils.foreachFileListToId(id);
                    this.callBack.onaddImgList(file, this);
                    let div = document.createElement('div');
                    div.className = ' hj-file-list-item '
                    let div$left = document.createElement('div');
                    let div$right = document.createElement('div');
                    let file$img = document.createElement('img');
                    let fileSize = this.privateUtils.computeFileSize(file.file.size);
                    file$img.src = './img/delete.png';
                    div$left.className = ' hj-left ';
                    div$right.className = ' hj-right ';
                    div$left.innerHTML = `<span>${file.file.name}</span>`
                    div$right.innerHTML = `<span>${fileSize}</span>`;
                    div$left.addEventListener('click', () => {
                        this.event.imgLargeClick(id);
                    })
                    file$img.addEventListener('click', () => {
                        this.event.imgDeleteClick(id);
                    })
                    div$right.appendChild(file$img);
                    div.appendChild(div$left);
                    div.appendChild(div$right);
                    for (let index = 0; index < this.fileList.length; index++) {
                        if (id == this.fileList[index].id) {
                            this.fileList[index].listDom = div;
                            break;
                        }
                    }
                    this.dom.appendListDom.appendChild(div);

                },
            }
        // 暴露的监听Api
        this.callBack = {
                // 阻止默认自带的打开弹窗
                onlargeClickCallBack: (img, that) => {},
                // 自带的弹窗被关闭时的回调
                // {event: 点击的源事件对象 imgFile: 被关闭的那张图片的全局file对象信息}
                ondialogBeforeClose: (object) => {},
                // 每一次添加图片列表时的回调
                onaddImgList: (file, that) => {},
            },
            this.privateUtils = {
                foreachFileListToId: (id) => {
                    for (let index = 0; index < this.fileList.length; index++) {
                        if (id == this.fileList[index].id) {
                            return this.fileList[index];
                        }
                    }
                },
                computeFileSize: (size) => {
                    let result = parseInt(size / 1024);
                    if (result < 1024) {
                        return result + '.KB';
                    } else if (result >= 1024) {
                        return parseInt(result / 1024) + ".MB";
                    }
                },
                // 计算弹窗的高度和长度
                computeDialogWH: (img, dom) => {
                    let w = this.config.shadeDialogStyle[0];
                    let h = this.config.shadeDialogStyle[1];
                    let w2 = img.naturalWidth;
                    let h3 = img.naturalHeight;
                    if (w2 > window.innerWidth * 0.9) {
                        w2 = window.innerWidth * 0.7;
                        h3 = window.innerHeight * 0.7;
                    }
                    dom.style.width = w == null ? w2 + "px" : w;
                    dom.style.height = h == null ? h3 + "px" : h;
                }
            }
    }
    var file = new File({
        maxFileLength: 2,
        maxFileSize: 1024,
        fileSuffix: ['xlsx'],
        StopDialog: false,
        showBtn: false
    });
    initHJFile(file);
    // 如果不想使用自带的弹窗，可以选择监听file对象的onlargeClickCallBack函数
    file.callBack.onlargeClickCallBack = function (img, that) {}
    file.callBack.ondialogBeforeClose = function (event) {}
    file.callBack.onaddImgList = function () {}
    // 加载初始信息，比如dom节点的添加
    function initHJFile(file) {
        console.log(file);
        let input_dom = document.getElementsByClassName('hj-file-input')[0];
        let imageItem_dom = document.getElementsByClassName('append-item')[0];
        let appendItem_dom = document.getElementsByClassName('hj-append-item')[0];
        let appendList_dom = document.getElementsByClassName('hj-file-list')[0];
        file.dom.inputDom = input_dom;
        file.dom.imageItemDom = imageItem_dom;
        file.dom.appendListDom = appendList_dom;
        if (file.config.showBtnImgStyle) {
            // 开启按钮模式
            appendItem_dom.style.display = 'none';
            let btn = document.getElementsByClassName('hj-btn-box');
            console.log(btn);
            if (btn.length != 0) {
                btn[0].className = 'hj-btn-box';
                btn[0].children[0].addEventListener('click', file.event.imageItemClick);
            } else {
                console.log("没有找到btn Class");
                throw new Error('未定义按钮模式所需的HTML')
            }
        }
        file.dom.appendItemDom = appendItem_dom;
        file.dom.imageItemDom.addEventListener('click', file.event.imageItemClick);
        file.dom.inputDom.addEventListener('change', file.event.changeLoadFile)
    }