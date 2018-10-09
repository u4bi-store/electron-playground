/* 생명주기는 electron.app을 통해 관리되며 electron.BrowserWindow 창들이 생성 됨. */
const {app, BrowserWindow} = require('electron')

var mainWindow

function createWindow () {

    mainWindow = new BrowserWindow({width: 800, height: 600})
    mainWindow.loadFile('index.html')

    mainWindow.webContents.openDevTools() /* 개발자 도구 활성화 */

    /* 프레임이 제거되었을 때 발생 */
    mainWindow.on('closed',  _ => mainWindow = null)

}

/* 초기화 완료 시 발생 */
app.on('ready', _ => createWindow())

/* 모든 프레임이 제거되었을 때 발생 */
app.on('window-all-closed', _ => process.platform !== 'darwin' && app.quit()) /* cmd + Q 프로그램 종료 이벤트에도 호출 */

/* 프레임이 활성화되었을 때 발생 */
app.on('activate', _ => mainWindow === null && createWindow()) /* 닫혔을 때 dock에 활성화된 아이콘 누를 시에도 활성 */