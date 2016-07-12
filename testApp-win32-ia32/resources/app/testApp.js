// 以下のリンクからコピペした

//Electronでアプリケーションを作ってみよう
// http://qiita.com/Quramy/items/a4be32769366cfe55778
// 30分で出来る、JavaScript(Electron)でデスクトップアプリを作って配布するまで
// http://qiita.com/nyanchu/items/15d514d9b9f87e5c0a29
// Electronでアプリ内部にWebサーバーを立てる
// http://qiita.com/pman-taichi/items/406b6eb068e074dc6675

'use strict';



// アプリケーションをコントロールするモジュール
var electron = require('electron');
var app = electron.app;

// ウィンドウを作成するモジュール
var BrowserWindow = electron.BrowserWindow;

// メインウィンドウはガベージコレクションされないようにグローバル宣言
var mainWindow = null;

// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', function(){
  if (process.platform != 'darwin'){
    app.quit();
  }
});


// Electronの初期化完了後に実行
app.on('ready', function() {
  // メイン画面の表示。ウィンドウの幅、高さを指定できる
  mainWindow = new BrowserWindow({width: 1000, height: 600})
  mainWindow.loadURL('file://'+__dirname + '/index.html');

  // Open the DevTools.
  mainWindow.openDevTools();

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', function(){
    mainWindow = null;
  });
});

// Electronでアプリ内部にWebサーバーを立てる
//http://qiita.com/pman-taichi/items/406b6eb068e074dc6675
// node-staticモジュールをローカルインストールした
// http://qiita.com/pman-taichi/items/406b6eb068e074dc6675


var nodeStatic = require('node-static');

var file = new nodeStatic.Server(__dirname);

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(8080);
