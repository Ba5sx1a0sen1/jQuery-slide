var allButtons = $('#buttons > span') //声明获取所有按钮
var count  //声明计时器变量
var timer //声明存储计时器id变量
for (let i = 0; i < allButtons.length; i++) {
    $(allButtons[i]).on('click', function (e) {
        let index = $(e.currentTarget).index()
        let size = -600
        $('#images').css({
            transform: `translateX(${i * size}px)`
        })
        activeButton(allButtons.eq(index)) // || index
        count = i //||index 正是因为这里的循环用了let,所以这里才能直接赋值i给count,如果使用var,无论如何都是4,否则就得用上面的index赋值
    })
}

count = 0
playSlide(count % allButtons.length)
timer = setTimer()
initMouseEvent()//初始化展示窗口,按钮区域鼠标划入划出事件

//定时器设置器
function setTimer() {
    return setInterval(() => {
        count++
        // console.log(count%allButtons.length) //只有四张图片,那么只循环打印出0,1,2,3 0,1,2,3 对应元素的下标
        playSlide(count % allButtons.length)
    }, 2000)
}

function activeButton($button) {
    $button.addClass('active').siblings('.active').removeClass('active')
}

function playSlide(index) {
    allButtons.eq(index).trigger('click')//实现自动轮播的关键点,eq()方法返回jquery对象,trigger()方法用来触发点击事件    
}

function initMouseEvent() {
    $('#window').on('mouseenter', function () {
        window.clearInterval(timer)
    })
    $('#window').on('mouseleave', function () {
        timer = setTimer()
    })
    //按钮区域进去也应该停止轮播,给用户点击切换
    $('#buttons').on('mouseenter', function () {
        window.clearInterval(timer)
    })
    $('#buttons').on('mouseleave', function () {
        timer = setTimer()
    })
}