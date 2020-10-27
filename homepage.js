//step4-upload images
const wrapper = document.querySelector(".wrapper");
const fileName = document.querySelector(".file-name");
const cancelBtn = document.querySelector("#cancel-btn");
const defaultBtn = document.querySelector("#default-btn");
const customBtn = document.querySelector("#custom-btn");
const img = document.querySelector("#file-img");
let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_]+$/;

function defaultBtnActive() {
    defaultBtn.click();
}
defaultBtn.addEventListener("change",function () {
    const file=this.files[0];
    if (file){
        const reader=new FileReader();
        reader.onload = function () {
            const result = reader.result;
            img.src = result.toString();
            wrapper.classList.add("active");
        };
        cancelBtn.addEventListener("click",function () {
            img.src="";
            wrapper.classList.remove("active");
        });
        reader.readAsDataURL(file);
    }
    if (this.value){
        let valueStore = this.value.match(regExp);
        fileName.textContent = valueStore;
    }
});

//step3-slideshow
window.onload = function () {
    var container = document.getElementById('con');
    var list = document.getElementById('list');
    var listImg = document.getElementById('list').getElementsByTagName('img');
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var Public = 0;
    var timer;
    console.log('number',-listImg[0].width*(listImg.length-1));

//style为类型，2为小圆点,1为左右点击
    function animate(offset,style) {
//获取的是style.left，是相对左边获取距离，所以第一张图后style.left都为负值，
//且style.left获取的是字符串，需要用parseInt()取整转化为数字。
        var newLeft
        if(style==1){
            newLeft = parseInt(list.style.left) + offset;
        }
        if(style==2){
            newLeft = offset;
        }
        list.style.left = newLeft + 'px';
//无限滚动判断 +600 左
        if (newLeft >0) {
            list.style.left = -listImg[0].width*(listImg.length-1) + 'px';
        }
//-600 右
        if (newLeft < -listImg[0].width*(listImg.length-1)){
            list.style.left = 0 + 'px';
        }
    }


    function buttonsShow(num) {
//将之前的小圆点的样式清除
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className == "on") {
                buttons[i].className = "";
            }
            if(listImg[i].className=="turns"){
                listImg[i].className="";
            }
        }
        buttons[num].className = "on";
        listImg[num].className="turns";

    }

//左(没法移回去)
    prev.onclick = function () {
        if(Public==0){
            Public=Public+listImg.length;
        }
        animate(listImg[0].width,1);
        Public=Public-1;
        buttonsShow(Public);
    };
//右
    next.onclick = function () {
        if(Public==listImg.length-1){
            Public=Public-listImg.length;
        }
        animate(-listImg[0].width,1);
        Public=Public+1;
        buttonsShow(Public);
    };

    for (var i = 0; i < buttons.length; i++) {
        (function (i) {
            buttons[i].onclick = function () {
                console.log('buttons',-listImg[0].width*i);
                animate(-listImg[0].width*i,2);
                buttonsShow(i);
                Public=i;
                console.log('Public',Public)
            }
        })(i)
    }
}
