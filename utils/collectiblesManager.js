// utils/collectiblesManager.js
// Interface for Dev 3's collectibles system

class CollectiblesManager {
  constructor(gameInstance) {
    this.game = gameInstance;
    this.collectibles = [];
    this.activeEffects = [];
  }
  
  // Add collectible from Dev 3
  addCollectible(collectible) {
    this.collectibles.push({
      ...collectible,
      collected: false
    });
  }
  
  // Check if player collects any items
  checkCollections(player) {
    const collected = [];
    
    this.collectibles.forEach(item => {
      if (item.collected) return;
      
      const distance = Math.sqrt(
        Math.pow(player.x - item.x, 2) +
        Math.pow(player.y - item.y, 2)
      );
      
      if (distance < (item.radius || 20) + 20) {
        item.collected = true;
        collected.push(item);
        this.applyEffect(item);
      }
    });
    
    return collected;
  }
  
  // Apply collectible effect
  applyEffect(item) {
    switch(item.type) {
      case 'palm-nuts': // 2x multiplier
        this.game.setMultiplier(2, 5);
        break;
      case 'drum-beat': // Slow time
        this.activateSlowTime(3);
        break;
      case 'orange-star': // Bonus points
        this.game.addScore(50);
        break;
      case 'mini-flag': // Height boost
        this.game.player.velocityY = this.game.physics.jumpForce * 1.5;
        break;
    }
    
    console.log('Collected:', item.type);
    wx.vibrateShort();
  }
  
  // Slow time effect
  activateSlowTime(duration) {
    this.activeEffects.push({
      type: 'slow-time',
      endTime: Date.now() + (duration * 1000)
    });
  }
  
  // Get time scale for physics
  getTimeScale() {
    const slowTimeActive = this.activeEffects.some(
      e => e.type === 'slow-time' && Date.now() < e.endTime
    );
    return slowTimeActive ? 0.5 : 1.0;
  }
  
  // Update effects
  update() {
    // Remove expired effects
    this.activeEffects = this.activeEffects.filter(
      e => Date.now() < e.endTime
    );
  }
  
  // Get visible collectibles
  getVisibleCollectibles() {
    const minY = this.game.camera.y - 100;
    const maxY = this.game.camera.y + this.game.canvasHeight + 100;
    
    return this.collectibles.filter(c => 
      !c.collected && c.y > minY && c.y < maxY
    );
  }
}

export default CollectiblesManager;