// app.js
App({
  onLaunch() {
    console.log('App launched');
    
    // Get system info
    const systemInfo = wx.getSystemInfoSync();
    console.log('Screen size:', systemInfo.screenWidth, 'x', systemInfo.screenHeight);
  },
  
  globalData: {
    userInfo: null
  }
});