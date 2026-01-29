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

    // Ensure character and background images are loaded for rendering
    this.loadBackgroundImage();
    this.loadCharacterImage();

    // Base positions
    // Lower the character closer to the bottom of the screen so feet
    // visually sit on the ground area of the background image.
    this.groundY = this.canvasHeight - 40;
    // Treat characterY as the vertical position of the feet.
    // Base position has feet exactly on the ground.
    this.characterBaseY = this.groundY;
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

    // Clear full canvas first
    ctx.clearRect(0, 0, w, h);

    // Draw background image if loaded
    if (this.backgroundImageLoaded && this.backgroundImage) {
      ctx.drawImage(this.backgroundImage, 0, 0, w, h);
    }

    // Draw score text on top of the scene
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '20px sans-serif';
    ctx.textBaseline = 'top';
    ctx.fillText(`Score: ${this.data.score}`, 16, 16);

    // Draw character with personal jump-rope
    this.drawCharacter(ctx, this.characterX, this.characterY || this.characterBaseY);
  },

  // Load PNG background image for canvas
  loadBackgroundImage() {
    if (this.backgroundImage || !this.canvas) return;

    const img = this.canvas.createImage();
    img.onload = () => {
      this.backgroundImage = img;
      this.backgroundImageLoaded = true;
      console.log('Background image loaded');
    };

    img.onerror = (err) => {
      console.error('Failed to load background image', err);
    };

    // Path is from the miniprogram root
    img.src = '/pages/game/assests/images/bg-image.png';
  },

  // Load PNG character using WeChat Mini Program canvas image API
  loadCharacterImage() {
    if (this.characterImage || !this.canvas) return;

    const img = this.canvas.createImage();
    img.onload = () => {
      this.characterImage = img;
      this.characterImageLoaded = true;

      // Cache intrinsic size
      this.characterImageWidth = img.width;
      this.characterImageHeight = img.height;

      console.log('Character image loaded:', img.width, 'x', img.height);
    };

    img.onerror = (err) => {
      console.error('Failed to load character image', err);
    };

    // Path is from the miniprogram root
    // Note: folder is named `assests` in this project
    img.src = '/pages/game/assests/images/character.png';
  },

  // Draw PNG character anchored so feet align with ground,
  // plus animated rope using existing ropeAngle logic.
  drawCharacter(ctx, x, y) {
    if (!this.characterImageLoaded || !this.characterImage) {
      // Image not yet ready; skip drawing to avoid flicker.
      // Background and rope math still update each frame.
      return;
    }

    const img = this.characterImage;

    // Choose a logical on-screen height similar to the original
    // procedurally drawn character (~120px tall).
    const targetHeight = 120;
    const scale = targetHeight / this.characterImageHeight;
    const drawWidth = this.characterImageWidth * scale;
    const drawHeight = targetHeight;

    // Feet are anchored at (x, y). Compute top-left for drawImage.
    const topY = y - drawHeight;
    const leftX = x - drawWidth / 2;

    ctx.save();

    // Support facing left/right by flipping horizontally around the center.
    if (this.data.characterDirection === 'left') {
      ctx.translate(x, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(
        img,
        leftX - x,
        topY,
        drawWidth,
        drawHeight
      );
    } else {
      ctx.drawImage(
        img,
        leftX,
        topY,
        drawWidth,
        drawHeight
      );
    }

    ctx.restore();

    // Animated jump rope: arcs over head and under feet,
    // preserving the existing angle / phase logic.
    const angle = this.ropeAngle;
    const phase = (Math.sin(angle) + 1) / 2; // 0..1

    const ropeRadiusX = drawWidth * 0.7;
    const ropeTopY = topY + drawHeight * 0.18; // slightly above head
    const ropeBottomY = y + 8;                 // just below feet

    ctx.strokeStyle = '#8B5A2B'; // brown rope
    ctx.lineWidth = 4;

    
    // Simple handles near where hands would be.
    const armY = topY + drawHeight * 0.45;
    const armReach = drawWidth * 0.55;
    const handY = armY;
    const leftHandX = x - armReach;
    const rightHandX = x + armReach;

    ctx.fillStyle = '#8B5A2B';
    ctx.beginPath();
    ctx.arc(leftHandX, handY, 4, 0, 2 * Math.PI);
    ctx.arc(rightHandX, handY, 4, 0, 2 * Math.PI);
    ctx.fill();
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