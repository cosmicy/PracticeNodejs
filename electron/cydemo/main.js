const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

//保留的全局变量，避免被js垃圾回收时销毁掉
let win

function createWindow () {
	win = new BrowserWindow({width: 800, height: 600})
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'app/index.html'),
		protocol: 'file:',
		slashes: true
	}))

  //win.webContents.openDevTools()

  win.on('closed', () => {
  	win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	//mac系统下，退出窗口还需要在任务栏上保留图标，以便再次激活
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

//给mac系统做处理，点击任务栏图标激活窗口
app.on('activate', () => {
	if (win === null) {
		createWindow()
	}
})

//其他main process代码可以写在另外的js文件
//通过require引入进来