// pages/game/game.js
Page({
  data: {
    score: 0,
    highScore: 0,
    multiplier: 1,
    gameState: 'start',
    canvasReady: false,
    gameStarted: false,
    gameOver: false,
    // Character + rope controls
    characterDirection: 'right', // 'left' or 'right'
    jumpHeight: 80,              // base jump height
    jumpSpeed: 1                 // affects rope / jump speed
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
        // Canvas is ready; immediately start the rope-jump animation
        this.setData({ 
          canvasReady: true,
          gameStarted: true,
          gameOver: false,
          score: 0
        });
        this.initGame();
      });
  },

  // (Optional) Simple background helper if you want a static render
  drawInitialScene() {
    const ctx = this.ctx;
    
    // Clear canvas
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    
    // Ground
    const groundY = this.canvasHeight - 80;
    ctx.fillStyle = '#3B5323';
    ctx.fillRect(0, groundY, this.canvasWidth, this.canvasHeight - groundY);
    
    // Hint text
    ctx.fillStyle = 'white';
    ctx.font = '18px sans-serif';
    ctx.fillText('Tap Start to see the rope jumper', 30, 40);
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
    if (!this.canvas || !this.ctx) {
      console.warn('Canvas not ready yet');
      return;
    }

    console.log('Game starting...');

    // Base positions
    this.groundY = this.canvasHeight - 80;
    this.characterBaseY = this.groundY - 60; // standing height
    this.characterX = this.canvasWidth / 2;  // center
    this.ropeAngle = 0;

    // Ensure we draw at least one frame so the character is visible
    this.updateScene();
    this.drawScene();

    // Start animation loop
    if (!this._animating) {
      this._animating = true;
      const loop = () => {
        if (!this._animating) return;
        this.updateScene();
        this.drawScene();
        this.canvas.requestAnimationFrame(loop);
      };
      this.canvas.requestAnimationFrame(loop);
    }
  },

  // Update rope rotation and character jump
  updateScene() {
    // Rope swings continuously
    const speed = Math.max(0.3, this.data.jumpSpeed);
    this.ropeAngle += 0.08 * speed;
    
    // Character jump follows rope rhythm
    const jumpFactor = Math.abs(Math.sin(this.ropeAngle));
    const height = this.data.jumpHeight;
    this.characterY = this.characterBaseY - jumpFactor * height;
  },

  // Draw background, rope and character
  drawScene() {
    const ctx = this.ctx;
    const w = this.canvasWidth;
    const h = this.canvasHeight;

    // Background sky
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, w, h);

    // Ground
    const groundY = this.groundY;
    ctx.fillStyle = '#3B5323';
    ctx.fillRect(0, groundY, w, h - groundY);

    // Rope anchors left/right
    const leftX = w * 0.18;
    const rightX = w * 0.82;
    const anchorY = groundY - 10;

    ctx.lineWidth = 4;
    ctx.strokeStyle = '#C09050';

    // Rope as an arc rotating around the center
    const centerX = (leftX + rightX) / 2;
    const radius = (rightX - leftX) / 2;
    const angle = this.ropeAngle;

    ctx.beginPath();
    // segment of circle to resemble rope passing under feet
    ctx.arc(centerX, anchorY, radius, Math.PI + angle, 2 * Math.PI + angle, false);
    ctx.stroke();

    // Draw character standing between anchors
    this.drawCharacter(ctx, this.characterX, this.characterY || this.characterBaseY);
  },

  // Stylized African young lady in native dress, with light 3D shading
  drawCharacter(ctx, x, y) {
    // Slight 3D by using highlights / shadows
    const facingLeft = this.data.characterDirection === 'left';
    
    // Body sizes
    const headRadius = 16;
    const bodyHeight = 46;
    const bodyWidth = 32;

    // Shadow ellipse
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.beginPath();
    ctx.ellipse(x, this.groundY + 4, 38, 8, 0, 0, 2 * Math.PI);
    ctx.fill();

    // Head (deep brown skin tone with highlight)
    const headCenterY = y - bodyHeight - headRadius + 10;
    ctx.fillStyle = '#5A3715';
    ctx.beginPath();
    ctx.arc(x, headCenterY, headRadius, 0, 2 * Math.PI);
    ctx.fill();

    // Subtle highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.arc(x - 6, headCenterY - 6, headRadius * 0.6, 0, 2 * Math.PI);
    ctx.fill();

    // Hair (natural textured bun and sides)
    ctx.fillStyle = '#23130A';
    ctx.beginPath();
    ctx.arc(x, headCenterY - headRadius * 0.6, headRadius * 1.1, 0, 2 * Math.PI);
    ctx.fill();
    // Side puff
    ctx.beginPath();
    ctx.arc(x + (facingLeft ? -headRadius * 0.9 : headRadius * 0.9), headCenterY - 2, headRadius * 0.6, 0, 2 * Math.PI);
    ctx.fill();

    // Simple facial hint (eyes + nose line)
    ctx.strokeStyle = '#2D1A09';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    if (facingLeft) {
      ctx.arc(x - 5, headCenterY, 3, 0, Math.PI, false);
    } else {
      ctx.arc(x + 5, headCenterY, 3, Math.PI, 0, false);
    }
    ctx.stroke();

    // Neck
    const neckTopY = headCenterY + headRadius - 2;
    ctx.strokeStyle = '#5A3715';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x, neckTopY);
    ctx.lineTo(x, neckTopY + 8);
    ctx.stroke();

    // Colorful native dress (triangular silhouette)
    const dressTopY = neckTopY + 8;
    const dressBottomY = y;

    // Base dress
    const gradient = ctx.createLinearGradient(x, dressTopY, x, dressBottomY);
    gradient.addColorStop(0, '#F9A825');  // warm yellow
    gradient.addColorStop(0.5, '#D84315'); // rich orange
    gradient.addColorStop(1, '#4A148C');  // deep purple

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(x, dressTopY);
    ctx.lineTo(x - bodyWidth / 2, dressBottomY);
    ctx.lineTo(x + bodyWidth / 2, dressBottomY);
    ctx.closePath();
    ctx.fill();

    // Pattern stripes to evoke native fabric
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - bodyWidth / 2 + 2, dressTopY + 8);
    ctx.lineTo(x + bodyWidth / 2 - 2, dressTopY + 16);
    ctx.moveTo(x - bodyWidth / 2 + 2, dressTopY + 22);
    ctx.lineTo(x + bodyWidth / 2 - 2, dressTopY + 30);
    ctx.stroke();

    // Arms extended slightly for rope grip
    ctx.strokeStyle = '#5A3715';
    ctx.lineWidth = 4;
    const armY = dressTopY + 6;
    const armLength = 26;

    ctx.beginPath();
    if (facingLeft) {
      // front arm
      ctx.moveTo(x, armY);
      ctx.lineTo(x - armLength, armY + 4);
      // back arm
      ctx.moveTo(x, armY - 2);
      ctx.lineTo(x + armLength * 0.6, armY - 1);
    } else {
      // front arm
      ctx.moveTo(x, armY);
      ctx.lineTo(x + armLength, armY + 4);
      // back arm
      ctx.moveTo(x, armY - 2);
      ctx.lineTo(x - armLength * 0.6, armY - 1);
    }
    ctx.stroke();

    // Legs (bent slightly during jump)
    const legBaseY = dressBottomY;
    const kneeOffset = 10 + Math.abs(this.characterBaseY - y) * 0.2;
    const spread = 6;

    ctx.beginPath();
    // left leg
    ctx.moveTo(x - spread, legBaseY);
    ctx.lineTo(x - spread - 4, legBaseY + kneeOffset);
    ctx.lineTo(x - spread, legBaseY + kneeOffset + 12);
    // right leg
    ctx.moveTo(x + spread, legBaseY);
    ctx.lineTo(x + spread + 4, legBaseY + kneeOffset);
    ctx.lineTo(x + spread, legBaseY + kneeOffset + 12);
    ctx.stroke();

    // Simple sandals
    ctx.strokeStyle = '#4E342E';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x - spread - 2, legBaseY + kneeOffset + 14);
    ctx.lineTo(x - spread + 6, legBaseY + kneeOffset + 14);
    ctx.moveTo(x + spread - 6, legBaseY + kneeOffset + 14);
    ctx.lineTo(x + spread + 2, legBaseY + kneeOffset + 14);
    ctx.stroke();
  },

  // Restart game button
  restartGame() {
    this.startGame();
  },

  // Control buttons
  turnLeft() {
    this.setData({ characterDirection: 'left' });
  },

  turnRight() {
    this.setData({ characterDirection: 'right' });
  },

  // Up button: increase jump height
  jumpHigher() {
    const next = Math.min(this.data.jumpHeight + 20, 220);
    this.setData({ jumpHeight: next });
  },

  // Down button: lower speed of jumping
  slowDown() {
    const next = Math.max(this.data.jumpSpeed - 0.2, 0.3);
    this.setData({ jumpSpeed: next });
  }
});