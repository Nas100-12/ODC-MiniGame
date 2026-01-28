// utils/backgroundManager.js
// Progressive background system for 3 levels

class BackgroundManager {
  constructor(canvasWidth, canvasHeight) {
    this.width = canvasWidth;
    this.height = canvasHeight;
    
    // Level thresholds
    this.levels = [
      { name: 'Village', height: 0, color: '#87CEEB', emoji: '🏘️' },
      { name: 'Monrovia', height: 500, color: '#FFA500', emoji: '🏙️' },
      { name: 'Rising Sun', height: 1200, color: '#FF6B6B', emoji: '🌅' }
    ];
  }
  
  // Get current level based on height
  getCurrentLevel(cameraY) {
    for (let i = this.levels.length - 1; i >= 0; i--) {
      if (cameraY >= this.levels[i].height) {
        return this.levels[i];
      }
    }
    return this.levels[0];
  }
  
  // Draw background
  draw(ctx, cameraY) {
    const level = this.getCurrentLevel(cameraY);
    
    // Draw sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(0, level.color);
    gradient.addColorStop(1, this.adjustBrightness(level.color, 0.7));
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.width, this.height);
    
    // Draw clouds (parallax effect)
    this.drawClouds(ctx, cameraY);
    
    // Draw level indicator
    this.drawLevelIndicator(ctx, level);
  }
  
  // Draw parallax clouds
  drawClouds(ctx, cameraY) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    
    for (let i = 0; i < 5; i++) {
      const cloudY = (i * 200 - cameraY * 0.3) % this.height;
      const cloudX = (i * 150) % this.width;
      
      ctx.beginPath();
      ctx.arc(cloudX, cloudY, 30, 0, Math.PI * 2);
      ctx.arc(cloudX + 20, cloudY, 25, 0, Math.PI * 2);
      ctx.arc(cloudX + 40, cloudY, 30, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // Draw level name indicator
  drawLevelIndicator(ctx, level) {
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(10, 10, 150, 40);
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 16px Arial';
    ctx.fillText(`${level.emoji} ${level.name}`, 20, 35);
    ctx.restore();
  }
  
  // Utility: adjust color brightness
  adjustBrightness(color, factor) {
    // Simple brightness adjustment (simplified for now)
    return color;
  }
}

export default BackgroundManager;