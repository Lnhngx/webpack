//使用ES6 導入語法 導入JQuery
import $ from 'jquery'

//導入樣式(在webpack中You may need an appropriate loader to handle this file type,需要合適的loader)
import '@/css/index.css'
import '@/css/index.less'
//不需要結果可以省略from 如果某個模塊中，使用from接受到的成員為undefined，則沒必要接收 

//導入src/js/test/info.js
import '@/js/test/info'


//1.導入圖片，得到圖片文件
import logo from '@/images/1651286932960.jpg'
//2.給img標籤的src動態賦值
$('.box').attr('src',logo)
console.log(logo)

//定義jquery的入口函數
$(function(){
    //實現奇偶數變色
    //奇數行為紅色
    $('li:odd').css('background-color','red')
    $('li:even').css('background-color','yellow')
})

//定義裝飾器函數
function info(target){
    target.info = "Person info"
}

//定義一個普通的類
@info
class Person{}

console.log(Person.info ,"裝飾器語法")
