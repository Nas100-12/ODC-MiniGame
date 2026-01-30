Page({
  data: {
    score: 0,
    highScore: 0,
    paused: false,

    level: 1,

    // RESULT POPUP
    showResult: false,
    resultText: '',

    // TIMER
    gameTimer: null,
    countdownTimer: null,
    gameTimeLimit: 20000,
    timeLeft: 0,

    jumpHeight: 80,
    jumpSpeed: 2
  },

  onLoad() {
    this.initCanvas();
    this.loadHighScore();
    this.initSounds();
  },

  /* =========================
     SOUNDS
  ========================= */
  initSounds() {
    this.jumpSound = wx.createInnerAudioContext();
    this.jumpSound.src = '/pages/game/assests/sounds/jump.mp3';

    this.winSound = wx.createInnerAudioContext();
    this.winSound.src = '/pages/game/assests/sounds/win.mp3';

    this.loseSound = wx.createInnerAudioContext();
    this.loseSound.src = '/pages/game/assests/sounds/lose.mp3';
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
    this._peakY = this.characterBaseY;

    this._ending = false;
    this._animating = true;

    this.startGameTimer();
    this.gameLoop();
  },

  /* =========================
     MAIN LOOP
  ========================= */
  gameLoop() {
    if (!this._animating) return;

    this.updateScene();
    this.drawScene();

    this.canvas.requestAnimationFrame(this.gameLoop.bind(this));
  },

  /* =========================
     UPDATE LOGIC
  ========================= */
  updateScene() {
    if (this.data.showResult) return;

    // Jump animation
    this.ropeAngle += 0.08 * this.data.jumpSpeed;
    const jumpFactor = Math.abs(Math.sin(this.ropeAngle));

    this.characterY =
      this.characterBaseY - jumpFactor * this.data.jumpHeight;

    const inAir = jumpFactor > 0.3;

    if (inAir && !this._wasInAir) {
      this.jumpSound.play();
    }

    if (inAir && this.characterY < this._peakY) {
      this._peakY = this.characterY;
    }

    // Horizontal movement
    if (this.characterX < this.characterMaxX) {
      this.characterX += this.characterSpeed;
    } else {
      this.bgOffsetX += this.bgSpeed;
    }

    if (this.bgOffsetX >= this.canvasWidth) {
      this.bgOffsetX = 0;
    }

    // LANDING
    if (this._wasInAir && !inAir) {
      const jumpPoints =
        Math.floor((this.characterBaseY - this._peakY) / 5);

      this.data.score += jumpPoints;

      if (this.data.score > this.data.highScore) {
        this.data.highScore = this.data.score;
        wx.setStorageSync('highScore', this.data.highScore);
      }

      this.setData({
        score: this.data.score,
        highScore: this.data.highScore
      });

      this._peakY = this.characterBaseY;

      // SAFE GAME END (after landing only)
      if (this._ending) {
        this.endGame(false);
      }
    }

    this._wasInAir = inAir;
  },

  /* =========================
     TIMER
  ========================= */
  startGameTimer() {
    clearTimeout(this.data.gameTimer);
    clearInterval(this.data.countdownTimer);

    const timeLimit =
      Math.max(6000, this.data.gameTimeLimit - (this.data.level - 1) * 2000);

    this.setData({ timeLeft: Math.floor(timeLimit / 1000) });

    const gameTimer = setTimeout(() => {
      this._ending = true;
    }, timeLimit);

    const countdownTimer = setInterval(() => {
      if (this.data.timeLeft <= 0) return;
      this.setData({ timeLeft: this.data.timeLeft - 1 });
    }, 1000);

    this.setData({ gameTimer, countdownTimer });
  },

  /* =========================
     END GAME
  ========================= */
  endGame(isWin) {
    clearTimeout(this.data.gameTimer);
    clearInterval(this.data.countdownTimer);

    this._animating = false;

    isWin ? this.winSound.play() : this.loseSound.play();

    this.setData({
      paused: true,
      showResult: true,
      resultText: isWin ? 'WON' : 'LOST'
    });
  },

  resumeGame() {
    this.setData({
      score: 0,
      paused: false,
      showResult: false,
      level: this.data.resultText === 'WON'
        ? this.data.level + 1
        : this.data.level
    });

    this.ropeAngle = 0;
    this._peakY = this.characterBaseY;
    this._wasInAir = false;
    this._ending = false;

    this.startGameTimer();
    this._animating = true;
    this.gameLoop();
  },

  /* =========================
     DRAWING
  ========================= */
  drawScene() {
    const ctx = this.ctx;
    const w = this.canvasWidth;
    const h = this.canvasHeight;

    ctx.clearRect(0, 0, w, h);

    if (this.backgroundImageLoaded) {
      ctx.drawImage(this.backgroundImage, -this.bgOffsetX, 0, w, h);
      ctx.drawImage(this.backgroundImage, w - this.bgOffsetX, 0, w, h);
    }

    // HUD
    ctx.fillStyle = '#fff';
    ctx.font = '18px sans-serif';
    ctx.fillText(`Score: ${this.data.score}`, 16, 24);
    ctx.fillText(`Time: ${this.data.timeLeft}s`, 16, 48);
    ctx.fillText(`High: ${this.data.highScore}`, 16, 72);
    ctx.fillText(`Level: ${this.data.level}`, 16, 96);

    this.drawCharacter(ctx, this.characterX, this.characterY);

    if (this.data.showResult) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';

      ctx.font = '40px sans-serif';
      ctx.fillText(this.data.resultText, w / 2, h / 2 - 80);

      ctx.font = '22px sans-serif';
      ctx.fillText(`Score: ${this.data.score}`, w / 2, h / 2 - 20);
      ctx.fillText(`High Score: ${this.data.highScore}`, w / 2, h / 2 + 10);
      ctx.fillText(`Level: ${this.data.level}`, w / 2, h / 2 + 40);

      ctx.font = '26px sans-serif';
      ctx.fillText('Tap to Continue', w / 2, h / 2 + 90);

      ctx.textAlign = 'left';
    }
  },

  /* =========================
     ASSETS
  ========================= */
  loadBackgroundImage() {
    const img = this.canvas.createImage();
    img.onload = () => {
      this.backgroundImage = img;
      this.backgroundImageLoaded = true;
    };
    img.src = '/pages/game/assests/images/bg-image.jpeg';
  },

  loadCharacterImage() {
    const img = this.canvas.createImage();
    img.onload = () => {
      this.characterImage = img;
      this.characterImageLoaded = true;
      this.characterImageWidth = img.width;
      this.characterImageHeight = img.height;
    };
    img.src = '/pages/game/assests/images/character.png';
  },

  drawCharacter(ctx, x, y) {
    if (!this.characterImageLoaded) return;

    const targetHeight = 120;
    const scale = targetHeight / this.characterImageHeight;

    ctx.drawImage(
      this.characterImage,
      x - (this.characterImageWidth * scale) / 2,
      y - targetHeight,
      this.characterImageWidth * scale,
      targetHeight
    );
  },

  /* =========================
     INPUT
  ========================= */
  handleCanvasTap() {
    if (this.data.showResult) {
      this.resumeGame();
    }
  },

  /* =========================
     STORAGE
  ========================= */
  loadHighScore() {
    const highScore = wx.getStorageSync('highScore') || 0;
    this.setData({ highScore });
  }
});