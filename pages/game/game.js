Page({
  data: {
    score: 0,
    highScore: 0,
    paused: false,
    characterDirection: 'right',
    jumpHeight: 80,
    jumpSpeed: 1
  },

  onLoad() {
    this.initCanvas();
    this.loadHighScore();
  },

  /* =========================
     CANVAS INITIALIZATION
  ========================= */
  initCanvas() {
    const query = wx.createSelectorQuery();
    query.select('#gameCanvas')
      .fields({ node: true, size: true })
      .exec(res => {
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        const dpr = wx.getSystemInfoSync().pixelRatio;

        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;
        ctx.scale(dpr, dpr);

        this.canvas = canvas;
        this.ctx = ctx;
        this.canvasWidth = res[0].width;
        this.canvasHeight = res[0].height;

        this.initGame();
      });
  },

  /* =========================
     GAME SETUP
  ========================= */
  initGame() {
    this.loadBackgroundImage();
    this.loadCharacterImage();

    this.groundY = this.canvasHeight - 40;
    this.characterBaseY = this.groundY;
    this.characterY = this.characterBaseY;

    this.characterX = this.canvasWidth * 0.35;
    this.characterSpeed = 1.5;
    this.characterMaxX = this.canvasWidth * 0.6;

    this.bgOffsetX = 0;
    this.bgSpeed = 2;

    this.ropeAngle = 0;
    this._wasInAir = false;

    this._animating = true;
    this.gameLoop();
  },

  /* =========================
     MAIN LOOP
  ========================= */
  gameLoop() {
    if (!this._animating) return;

    this.updateScene();
    this.drawScene();

    if (this._animating) {
      this.canvas.requestAnimationFrame(this.gameLoop.bind(this));
    }
  },

  /* =========================
     UPDATE LOGIC
  ========================= */
  updateScene() {
    if (this.data.paused) return;

    // Rope / jump animation
    const speed = Math.max(0.3, this.data.jumpSpeed);
    this.ropeAngle += 0.08 * speed;

    const jumpFactor = Math.abs(Math.sin(this.ropeAngle));
    this.characterY =
      this.characterBaseY - jumpFactor * this.data.jumpHeight;

    // Character movement + background scroll
    if (this.characterX < this.characterMaxX) {
      this.characterX += this.characterSpeed;
    } else {
      this.bgOffsetX += this.bgSpeed;
    }

    if (this.bgOffsetX >= this.canvasWidth) {
      this.bgOffsetX = 0;
    }

    // Scoring
    const inAir = jumpFactor > 0.3;
    if (this._wasInAir && !inAir) {
      const newScore = this.data.score + 1;
      this.setData({ score: newScore });

      if (newScore > this.data.highScore) {
        this.setData({ highScore: newScore });
        wx.setStorageSync('highScore', newScore);
      }
    }
    this._wasInAir = inAir;
  },

  /* =========================
     DRAWING
  ========================= */
  drawScene() {
    const ctx = this.ctx;
    const w = this.canvasWidth;
    const h = this.canvasHeight;

    ctx.clearRect(0, 0, w, h);

    // Scrolling background
    if (this.backgroundImageLoaded) {
      ctx.drawImage(this.backgroundImage, -this.bgOffsetX, 0, w, h);
      ctx.drawImage(this.backgroundImage, w - this.bgOffsetX, 0, w, h);
    }

    // Score
    ctx.fillStyle = '#fff';
    ctx.font = '20px sans-serif';
    ctx.fillText(`Score: ${this.data.score}`, 16, 16);

    // Character
    this.drawCharacter(ctx, this.characterX, this.characterY);

    // Pause overlay
    if (this.data.paused) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#fff';
      ctx.font = '32px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('PAUSED', w / 2, h / 2);
      ctx.textAlign = 'left';
    }
  },

  /* =========================
     ASSETS
  ========================= */
  loadBackgroundImage() {
    if (this.backgroundImage) return;
    const img = this.canvas.createImage();
    img.onload = () => {
      this.backgroundImage = img;
      this.backgroundImageLoaded = true;
    };
    img.src = '/pages/game/assests/images/bg-image.jpeg';
  },

  loadCharacterImage() {
    if (this.characterImage) return;
    const img = this.canvas.createImage();
    img.onload = () => {
      this.characterImage = img;
      this.characterImageLoaded = true;
      this.characterImageWidth = img.width;
      this.characterImageHeight = img.height;
    };
    img.src = '/pages/game/assests/images/character.png';
  },

  /* =========================
     CHARACTER DRAW
  ========================= */
  drawCharacter(ctx, x, y) {
    if (!this.characterImageLoaded) return;

    const targetHeight = 120;
    const scale = targetHeight / this.characterImageHeight;
    const drawWidth = this.characterImageWidth * scale;
    const drawHeight = targetHeight;

    const topY = y - drawHeight;
    const leftX = x - drawWidth / 2;

    ctx.drawImage(
      this.characterImage,
      leftX,
      topY,
      drawWidth,
      drawHeight
    );
  },

  /* =========================
     INPUT (TAP TO PAUSE/RESUME)
  ========================= */
  handleCanvasTap() {
    const paused = !this.data.paused;
    this.setData({ paused });

    if (paused) {
      this._animating = false;
    } else {
      if (!this._animating) {
        this._animating = true;
        this.gameLoop();
      }
    }
  },

  loadHighScore() {
    const highScore = wx.getStorageSync('highScore') || 0;
    this.setData({ highScore });
  }
});
