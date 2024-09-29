function my$(id) {
    return document.getElementById(id);
}

// 获取各元素，方便操作
var box = my$("box");
var inner = box.children[0];
var ulObj = inner.children[0];
var list = ulObj.children;
var olObj = inner.children[1];
var arr = my$("arr");
var imgWidth = inner.offsetWidth;
var right = my$("right");
var left = my$("left");
var pic = 0;

// 根据li个数，创建小按钮
for (var i = 0; i < list.length; i++) {
    var liObj = document.createElement("li");
    olObj.appendChild(liObj);
    liObj.innerText = (i + 1);
    liObj.setAttribute("index", i);

    // 为按钮注册mouseover事件
    liObj.onmouseover = function () {
        // 清除所有按钮的样式
        clearButtonStyles();
        this.className = "current";
        pic = this.getAttribute("index");
        animate(ulObj, -pic * imgWidth);
    }
}

// 设置ol中第一个li有背景颜色
olObj.children[0].className = "current";
// 克隆一个ul中第一个li,加入到ul中的最后
ulObj.appendChild(ulObj.children[0].cloneNode(true));

var timeId = setInterval(onMouseClickHandle, 1000);

// 左右焦点实现点击切换图片功能
box.onmouseover = function () {
    arr.style.display = "block";
    clearInterval(timeId);
};
box.onmouseout = function () {
    arr.style.display = "none";
    timeId = setInterval(onMouseClickHandle, 1000);
};

right.onclick = onMouseClickHandle;
left.onclick = function () {
    if (pic == 0) {
        pic = list.length - 1;
        ulObj.style.left = -pic * imgWidth + "px";
    }
    pic--;
    animate(ulObj, -pic * imgWidth);
    updateButtonStyles();
};

function onMouseClickHandle() {
    if (pic == list.length - 1) {
        pic = 0;
        ulObj.style.left = 0 + "px";
    }
    pic++;
    animate(ulObj, -pic * imgWidth);
    updateButtonStyles();
}

function clearButtonStyles() {
    for (var i = 0; i < olObj.children.length; i++) {
        olObj.children[i].removeAttribute("class");
    }
}

function updateButtonStyles() {
    clearButtonStyles();
    if (pic == list.length - 1) {
        olObj.children[0].className = "current";
    } else {
        olObj.children[pic].className = "current";
    }
}

// 设置任意的一个元素, 移动到指定的目标位置
function animate(element, target, delay = 5000) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        var current = element.offsetLeft;
        var step = (target - current) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        current += step;
        if (current !== target) {
            element.style.left = current + "px";
        } else {
            clearInterval(element.timeId);
            element.style.left = target + "px";
            setTimeout(function () {
                // 在延迟后执行下一次动画
            }, delay);
        }
    }, 10);
}