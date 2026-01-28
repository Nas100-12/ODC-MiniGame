// utils/soundManager.js
// Handle all game sounds

class SoundManager {
  constructor() {
    this.sounds = {};
    this.enabled = true;
  }
  
  // Load sound (WeChat API)
  load(name, src) {
    this.sounds[name] = wx.createInnerAudioContext();
    this.sounds[name].src = src;
  }
  
  // Play sound
  play(name) {
    if (!this.enabled || !this.sounds[name]) return;
    
    this.sounds[name].seek(0);
    this.sounds[name].play();
  }
  
  // Toggle sound
  toggle() {
    this.enabled = !this.enabled;
  }
  
  // Check if sound is enabled
  isEnabled() {
    return this.enabled;
  }
}

export default SoundManager;