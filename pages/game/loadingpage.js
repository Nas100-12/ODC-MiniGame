Page({
  data: {
    percent: 0
  },

  onLoad() {
    this.startLoading();
  },

  startLoading() {
    // Make the loading bar move very slowly
    const step = 1;
    const intervalTime = 500;

    const timer = setInterval(() => {
      let current = this.data.percent + step;

      if (current >= 20) {
        current = 20;
        clearInterval(timer);
        this.setData({ percent: current });
        // Navigate to the actual game page when loading completes
        wx.redirectTo({
          url: "/pages/game/game"
        });
      } else {
        this.setData({ percent: current });
      }
    }, intervalTime);
  }
});

