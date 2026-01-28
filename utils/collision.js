// utils/collision.js
// Reusable collision detection utilities

// AABB (Axis-Aligned Bounding Box) collision
export function checkAABB(rect1, rect2) {
  return rect1.left < rect2.right &&
         rect1.right > rect2.left &&
         rect1.top < rect2.bottom &&
         rect1.bottom > rect2.top;
}

// Get bounding box from object
export function getBounds(obj) {
  return {
    left: obj.x - obj.width / 2,
    right: obj.x + obj.width / 2,
    top: obj.y - obj.height / 2,
    bottom: obj.y + obj.height / 2
  };
}

// Check if player is landing on platform (from above)
export function checkPlatformCollision(player, platform, wasAbove = true) {
  const playerBounds = getBounds(player);
  const platformBounds = getBounds(platform);
  
  // Check if overlapping
  if (!checkAABB(playerBounds, platformBounds)) {
    return null;
  }
  
  // Check if player is falling and was above platform
  if (player.velocityY > 0 && wasAbove) {
    return {
      type: 'land',
      platform: platform,
      penetration: playerBounds.bottom - platformBounds.top
    };
  }
  
  return null;
}

// Check point-circle collision (for collectibles)
export function checkCircleCollision(point, circle) {
  const dx = point.x - circle.x;
  const dy = point.y - circle.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  return distance < (circle.radius + (point.radius || 0));
}