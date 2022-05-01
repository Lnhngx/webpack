const path = require("path"); // 引入 path 來解決巢狀引入路徑問題

//1.導入插件，得到插件的構造函數
const HtmlWebpackPlugin = require("html-webpack-plugin");
//2.new 構造函數，創建插件的實例對象
const htmlPlugin = new HtmlWebpackPlugin({
  //指定要複製哪個頁面
  template: "./src/index.html", //指定原文件的存放路徑
  //指定複製出來的文件名和存放路徑
  filename: "./index.html",
});

//左側的{}是解構賦值
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  //開發調適階段，建議設置，可以保證報錯訊息與開發的行數相同
  //devtool: "eval-source-map",

  //實際發布時設置為此項，可以保證檢查出錯行數，但不顯示原代碼（安全性）
  devtool: "nosources-source-map",

  mode: "development", // 設定開發模式就不會 minify，速度較快
  //development,production

  //指定要處理哪個文件
  entry: path.join(__dirname, "./src/index1.js"),
  //指定生成的文件要存放在哪裡
  output: {
    path: path.join(__dirname, "dist"),
    filename: "js/bundle.js",
  },
  plugins: [htmlPlugin, new CleanWebpackPlugin()], //通過節點plugins，使htmlPlugin 插件生效
  devServer: {
    open: true, //自動打開瀏覽器
    port: 9000, //在HTTP協議中 阜號80，則可以被省略
    host: "127.0.0.1",
  },
  //1.webpack默認只能打包處理.js結尾的文件，處理不了其他後綴的文件
  //2.由於代碼中包含了index.css這個文件，因此webpack默認處理不了
  //3.當webpack發現某個文件處理不了的時候,會查找web.config.js這個配置文件，看module.rules數組中，是否配置了對應的loader
  module: {
    rules: [
      //定義不同模塊對應的loader
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      //處理.less文件的loader
      { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] },
      //處理圖片文件的loader
      //如果需要調用的loader只有一個，則只傳遞一個字符串也可以，有多個就用Array
      //在配置url-loader的時候，在多個參數之間使用＆符號進行分隔
      {
        test: /\.jpg|png|gif$/,
        use: "url-loader?limit=1483&outputPath=images",
      },
      //limit用法在多少字節內轉成base64
      //使用babel-loader 處理高級的js語法
      //在配置babel-loader的時候，一定要排除node_modules目錄中的文件
      //因為第三方中的js兼容性，不需特別處理
      { test: /\.js$/, use: "babel-loader", exclude: /node_modules/ },
    ],
  },
  //4.webpack把index.css這個文件,先轉交給最後一個loader進行處理（先轉交給css-loader）
  //5.當css-loader處理完畢後，會把處理結果轉交給下一個loader(style-loader)
  //6.當style-loader處理完畢之後，發現沒有下一個loader了，於是就把處理的結果，轉交給了webpack
  //7.webpack把style-loader處理的結果，合併到/dist/bundle.js中，最終生成打包好的文件
  resolve: {
    alias: {
      //告訴webpack，@符號表示src這一層目錄
      "@": path.join(__dirname, "./src/"),
    },
  },
};
