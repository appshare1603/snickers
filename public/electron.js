const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

// Handle creating/removing shortcuts on Windows when installing/uninstalling
/*
if (require('electron-squirrel-startup')) {
  app.quit();
}
  */

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    }
  });

  // Determine the correct path to index.html
  const indexPath = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  console.log('App starting...');
  console.log('isDev:', isDev);
  console.log('indexPath:', indexPath);
  console.log('__dirname:', __dirname);
  console.log('Resource path:', process.resourcesPath);

  // Load the index.html
  mainWindow.loadURL(indexPath)
    .then(() => {
      console.log('Window loaded successfully');
    })
    .catch((err) => {
      console.error('Failed to load window:', err);
      // Try alternative path if initial load fails
      const altPath = `file://${path.join(process.resourcesPath, 'app/build/index.html')}`;
      console.log('Trying alternative path:', altPath);
      return mainWindow.loadURL(altPath);
    });

  // Open DevTools in development
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // Log loading errors
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Page load failed:', errorCode, errorDescription);
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
