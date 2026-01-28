// utils/platformManager.js
// Interface for Dev 2's platform system

class PlatformManager {
  constructor(gameInstance) {
    this.game = gameInstance;
    this.platforms = [];
  }
  
  // Add platforms from Dev 2
  addPlatform(platform) {
    this.platforms.push(platform);
  }
  
  // Get platforms in view
  getVisiblePlatforms() {
    const minY = this.game.camera.y - 100;
    const maxY = this.game.camera.y + this.game.canvasHeight + 100;
    
    return this.platforms.filter(p => p.y > minY && p.y < maxY);
  }
  
  // Remove platforms that are too far below camera
  cleanupPlatforms() {
    const threshold = this.game.camera.y + this.game.canvasHeight + 500;
    this.platforms = this.platforms.filter(p => p.y < threshold);
  }
  
  // Check collision with all platforms
  checkCollisions(player) {
    const collisions = [];
    
    this.getVisiblePlatforms().forEach(platform => {
      if (this.checkPlatformCollision(player, platform)) {
        collisions.push(platform);
      }
    });
    
    return collisions;
  }
  
  // Simple collision check
  checkPlatformCollision(player, platform) {
    const playerLeft = player.x - player.width / 2;
    const playerRight = player.x + player.width / 2;
    const playerBottom = player.y + player.height / 2;
    const playerTop = player.y - player.height / 2;
    
    const platformLeft = platform.x - platform.width / 2;
    const platformRight = platform.x + platform.width / 2;
    const platformTop = platform.y - platform.height / 2;
    const platformBottom = platform.y + platform.height / 2;
    
    return playerRight > platformLeft &&
           playerLeft < platformRight &&
           playerBottom > platformTop &&
           playerTop < platformBottom &&
           player.velocityY > 0; // Only when falling
  }
}

export default PlatformManager;