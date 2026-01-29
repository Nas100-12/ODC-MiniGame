Page({
  data: {
    percent: 0
  },

  onLoad() {
    this.startLoading();
  },

  startLoading() {
    // Make the loading bar move very slowly
    const step = 1; // percent increase per tick
    const intervalTime = 1000; // ms between ticks (100s total)

    const timer = setInterval(() => {
      let current = this.data.percent + step;

      if (current >= 100) {
        current = 100;
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

