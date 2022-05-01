module.exports = {
  //聲明babel可用的插件
  //將來，webpack在調用babel-loader的時候，會先加載plugins插件來使用
  plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
};
