// pages/game/game.js
Page({
  data: {
    score: 0,
    highScore: 0,
    multiplier: 1,
    gameState: 'start',
    canvasReady: false
  },

  onLoad(options) {
    console.log('Game page loaded');
    this.initCanvas();
    this.loadHighScore();
  },

  // Initialize canvas with proper DPR scaling
  initCanvas() {
    const query = wx.createSelectorQuery();
    query.select('#gameCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        
        // Get device pixel ratio for sharp rendering
        const dpr = wx.getSystemInfoSync().pixelRatio;
        
        // Set canvas size
        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;
        
        // Scale context to match DPR
        ctx.scale(dpr, dpr);
        
        // Store for game loop
        this.canvas = canvas;
        this.ctx = ctx;
        this.canvasWidth = res[0].width;
        this.canvasHeight = res[0].height;
        
        console.log('Canvas initialized:', this.canvasWidth, 'x', this.canvasHeight);
        
        // Draw test rectangle to verify canvas works
        this.testDraw();
      });
  },

  // Test canvas rendering
  testDraw() {
    const ctx = this.ctx;
    
    // Clear canvas
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    
    // Draw test rectangle
    ctx.fillStyle = '#4A90E2';
    ctx.fillRect(50, 50, 100, 100);
    
    // Draw test text
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Canvas Working!', 50, 30);
    
    console.log('Test draw complete');
  },

  // Load high score from storage
  loadHighScore() {
    try {
      const highScore = wx.getStorageSync('highScore') || 0;
      this.setData({ highScore });
    } catch (e) {
      console.error('Failed to load high score:', e);
    }
  },

  // Start game button
  startGame() {
    this.setData({ 
      gameStarted: true,
      gameOver: false,
      score: 0
    });
    this.initGame();
  },

  // Initialize game (will build this next)
  initGame() {
    console.log('Game starting...');
    // Will implement in Hour 2
  },

  // Restart game button
  restartGame() {
    this.startGame();
  }
});