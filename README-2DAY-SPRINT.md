# Lappa Jump - WeChat Mini Program Game

<div align="center">

🇱🇷 **A Culturally-Inspired Endless Vertical Jumper** 🇱🇷

Jump from rope to rope, collect cultural treasures, and reach the rising sun!

**Platform**: WeChat Mini Program | **Genre**: Endless Vertical Platformer | **Development Timeline**: 2 Days

[Features](#-game-features) • [Tech Stack](#-technical-stack) • [Team Tasks](#-2-day-development-plan---team-distribution) • [Setup](#-quick-start-setup)

</div>

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [Game Features](#-game-features)
3. [Technical Stack](#-technical-stack)
4. [2-Day Development Plan](#-2-day-development-plan---team-distribution)
5. [Quick Start Setup](#-quick-start-setup)
6. [File Structure](#-file-structure)
7. [Integration Points](#-integration-points)
8. [Testing Checklist](#-testing-checklist)
9. [Deployment](#-deployment)

---

## 🎮 Project Overview

**Lappa Jump** is an endless vertical platformer mini-game inspired by Liberian culture. Players jump from rope to rope, ascending from village level through the Monrovia skyline to the rising sun.

### Game Concept
- **Genre**: Endless Vertical Platformer / Casual Arcade
- **Target Platform**: WeChat Mini Program (Tencent Cloud Super App)
- **Session Length**: 30-90 seconds per game
- **Age Rating**: 3+ (Family-friendly)

### Core Mechanics
- Tap left/right to move player horizontally
- Automatically jump when landing on ropes
- Collect special items for power-ups
- Progress through 3 visual levels based on height
- Beat your high score

---

## 🌟 Game Features

### Gameplay Elements
- **Endless Vertical Climbing**: Jump higher and higher
- **Simple Controls**: Tap left or right side of screen
- **Three Levels**:
  - 🏘️ Village (0-500m) - Blue sky background
  - 🏙️ Monrovia (500-1200m) - Golden sunset
  - 🌅 Rising Sun (1200m+) - Red/gold sunrise

### Collectibles
| Item | Effect | Duration |
|------|--------|----------|
| 🧺 Palm Nuts | 2x Score Multiplier | 5 sec |
| 🪘 Drum Beat | Slow Time | 3 sec |
| 🟠 Orange Star | +50 Bonus Points | Instant |
| 🇱🇷 Mini Flag | Height Boost | 1 jump |

### Features
- ✅ Canvas-based rendering (60fps)
- ✅ Physics system (gravity, jumping, velocity)
- ✅ Collision detection
- ✅ Local high score storage
- ✅ WeChat share integration
- ✅ Vibration feedback
- ✅ Responsive touch controls
- ✅ Progressive difficulty

---

## 🛠 Technical Stack

- **Framework**: WeChat Mini Program Native
- **Language**: JavaScript (ES6+)
- **Markup**: WXML
- **Styling**: WXSS
- **Canvas**: Canvas 2D API
- **Storage**: WeChat Storage API
- **Tools**: WeChat DevTools

---

## 👥 2-Day Development Plan - Team Distribution

### ⚡ CRITICAL: Timeline Overview

```
Day 1 (8 hours):
├── Morning (4 hours): Setup + Core Features
└── Afternoon (4 hours): Integration + Basic Testing

Day 2 (8 hours):
├── Morning (4 hours): Polish + Advanced Features
└── Afternoon (4 hours): Testing + Deployment Prep
```

---

### 🔵 **Developer 1: Core Game Engine & Physics**

**Total Time**: 16 hours over 2 days  
**Priority**: HIGHEST - Other devs depend on this  
**Git Branch**: `feature/game-engine`

#### Day 1 - Morning (Hours 1-4) - FOUNDATION
**Goal**: Basic playable game loop

- [ ] **Hour 1**: Project setup & canvas initialization
  - Set up WeChat DevTools project
  - Initialize canvas with proper DPR scaling
  - Create basic game loop with `requestAnimationFrame`
  - Test canvas rendering works
  
- [ ] **Hour 2**: Player physics system
  - Create player object (position, velocity, dimensions)
  - Implement gravity and velocity updates
  - Add jump force application
  - Test player falls and jumps

- [ ] **Hour 3**: Player movement controls
  - Implement touch event handlers (left/right tap)
  - Add horizontal velocity and acceleration
  - Implement screen wrapping (left edge → right edge)
  - Add friction/deceleration when not moving

- [ ] **Hour 4**: Camera system
  - Implement camera follow logic
  - Update camera Y position when player rises
  - Shift all game objects when camera moves
  - Test scrolling works smoothly

#### Day 1 - Afternoon (Hours 5-8) - INTEGRATION
**Goal**: Integrate with platforms, make game playable

- [ ] **Hour 5**: Collision detection framework
  - Create collision detection function
  - Test collision with Dev 2's rope platforms
  - Implement bounce/jump on rope collision
  - Add vibration feedback on landing

- [ ] **Hour 6**: Score system integration
  - Add score calculation (height-based + landings)
  - Integrate multiplier effects from Dev 3
  - Display score in UI
  - Save high score to local storage

- [ ] **Hour 7**: Game state management
  - Implement game start/stop/restart
  - Add game over detection (fall off screen)
  - Create state transitions (start → playing → game over)
  - Test full game cycle

- [ ] **Hour 8**: Initial testing & bug fixes
  - Test on multiple screen sizes
  - Fix any critical physics bugs
  - Verify performance (maintain 60fps)
  - Document physics parameters

#### Day 2 - Morning (Hours 9-12) - POLISH
**Goal**: Refinement and optimization

- [ ] **Hour 9**: Physics tuning
  - Fine-tune gravity, jump force, movement speed
  - Adjust difficulty curve (rope spacing/width)
  - Test game feel and adjust
  - Add debug mode for physics visualization

- [ ] **Hour 10**: Control polish
  - Improve touch response accuracy
  - Add visual feedback for controls
  - Implement button controls as backup
  - Test on real device via preview

- [ ] **Hour 11**: Performance optimization
  - Profile game loop performance
  - Optimize collision checks
  - Implement object culling for off-screen items
  - Reduce unnecessary redraws

- [ ] **Hour 12**: Edge case handling
  - Handle rapid direction changes
  - Fix any physics glitches
  - Add safety bounds checking
  - Test extreme scenarios

#### Day 2 - Afternoon (Hours 13-16) - FINALIZATION
**Goal**: Complete and ready for deployment

- [ ] **Hour 13-14**: Final integration testing
  - Full game playthrough testing
  - Test all collectible effects work correctly
  - Verify level transitions
  - Test restart and share functions

- [ ] **Hour 15**: Documentation
  - Comment all physics code
  - Document tunable parameters
  - Create configuration guide
  - Write handoff notes

- [ ] **Hour 16**: Deployment support
  - Help team with final builds
  - Fix any last-minute issues
  - Prepare for code upload
  - Participate in final QA

**Key Deliverables**:
- Working game loop and physics engine
- Player movement and controls
- Collision detection system
- Score calculation and storage
- Game state management

**Files to Create/Modify**:
- `pages/game/game.js` (player object, physics functions, game loop)
- `utils/physics.js` (physics helpers)

**Dependencies**:
- Must coordinate with Dev 2 for rope collision
- Must provide score hooks for Dev 3
- Must provide game state for Dev 4 UI

---

### 🟢 **Developer 2: Platforms & Obstacle System**

**Total Time**: 16 hours over 2 days  
**Priority**: HIGH - Needed for core gameplay  
**Git Branch**: `feature/platforms`

#### Day 1 - Morning (Hours 1-4) - PLATFORM FOUNDATION
**Goal**: Create rope platforms that player can land on

- [ ] **Hour 1**: Rope data structure & generation
  - Create rope object structure (x, y, width, height, colors)
  - Implement initial rope generation (20 ropes to start)
  - Set up procedural generation algorithm
  - Test ropes appear on screen

- [ ] **Hour 2**: Rope rendering
  - Draw rope characters (circles at each end)
  - Draw rope line with decorative pattern
  - Implement multiple character colors (county cloth)
  - Add visual variety to ropes

- [ ] **Hour 3**: Dynamic rope generation
  - Generate new ropes as player climbs
  - Remove off-screen ropes (memory management)
  - Vary rope width (80-200px range)
  - Vary rope spacing (difficulty progression)

- [ ] **Hour 4**: Rope animation
  - Implement gentle sway animation (sine wave)
  - Add per-rope sway offset for variation
  - Ensure animation doesn't break collision
  - Test performance with many ropes

#### Day 1 - Afternoon (Hours 5-8) - INTEGRATION & DIFFICULTY
**Goal**: Working collision and progressive difficulty

- [ ] **Hour 5**: Collision system coordination
  - Work with Dev 1 to integrate collision detection
  - Provide rope collision data to physics engine
  - Test player landing on ropes works correctly
  - Debug collision edge cases

- [ ] **Hour 6**: Difficulty scaling
  - Implement rope width reduction as height increases
  - Increase rope spacing at higher levels
  - Add sway intensity increase with height
  - Balance difficulty progression

- [ ] **Hour 7**: Level background system
  - Implement 3-level background color system
  - Create gradient backgrounds for each level
  - Trigger background changes at height thresholds
  - Smooth transition between backgrounds

- [ ] **Hour 8**: Rope variety & polish
  - Add more character color variations
  - Improve rope pattern rendering
  - Add subtle effects (glow, shadows)
  - Test on different screen sizes

#### Day 2 - Morning (Hours 9-12) - ENHANCEMENT
**Goal**: Visual polish and optimization

- [ ] **Hour 9**: Visual improvements
  - Enhance character rendering (better shapes)
  - Add character reactions (subtle bounce on land)
  - Improve rope cloth pattern details
  - Add background elements (clouds, buildings)

- [ ] **Hour 10**: Performance optimization
  - Optimize rope rendering (reduce draw calls)
  - Implement efficient off-screen culling
  - Profile rendering performance
  - Ensure 60fps with 20+ ropes

- [ ] **Hour 11**: Advanced animations
  - Add rope stretch effect on landing
  - Character slight rotation/tilt
  - Background parallax scrolling (optional)
  - Polish all visual transitions

- [ ] **Hour 12**: Edge case handling
  - Handle camera movement edge cases
  - Fix rope generation gaps
  - Ensure no unreachable rope configurations
  - Test extreme difficulty scenarios

#### Day 2 - Afternoon (Hours 13-16) - FINALIZATION
**Goal**: Complete and polished platform system

- [ ] **Hour 13-14**: Integration testing
  - Full testing with all game systems
  - Verify collectible spawning works (with Dev 3)
  - Test level transitions
  - Fix any visual glitches

- [ ] **Hour 15**: Final polish
  - Adjust colors and visual balance
  - Fine-tune animation timings
  - Optimize final performance
  - Code cleanup and commenting

- [ ] **Hour 16**: Documentation & deployment support
  - Document rope generation algorithm
  - Comment rendering code
  - Help with deployment preparation
  - Final QA participation

**Key Deliverables**:
- Rope platform generation system
- Rope rendering with animations
- Collision data for physics engine
- Level background system
- Difficulty progression

**Files to Create/Modify**:
- `pages/game/game.js` (rope array, generation, rendering functions)
- `utils/collision.js` (collision helpers)

**Dependencies**:
- Coordinates with Dev 1 for collision system
- Provides spawn locations to Dev 3 for collectibles
- Provides level data to Dev 4 for UI

---

### 🟡 **Developer 3: Collectibles & Power-ups**

**Total Time**: 16 hours over 2 days  
**Priority**: MEDIUM - Enhances gameplay  
**Git Branch**: `feature/collectibles`

#### Day 1 - Morning (Hours 1-4) - COLLECTIBLE FOUNDATION
**Goal**: Basic collectibles spawning and rendering

- [ ] **Hour 1**: Collectible data structure
  - Create collectible object structure (type, position, emoji)
  - Define 4 collectible types with properties
  - Set up rarity/spawn rate system
  - Create collectibles array

- [ ] **Hour 2**: Collectible spawning
  - Implement spawn logic near ropes (15% chance)
  - Coordinate with Dev 2 for spawn positions
  - Add spawn rate variation by height
  - Test collectibles appear on screen

- [ ] **Hour 3**: Collectible rendering
  - Draw collectibles with emoji/symbols
  - Add floating animation (sine wave)
  - Implement glow/highlight effects
  - Ensure collectibles visible against background

- [ ] **Hour 4**: Collision detection for collectibles
  - Implement circular collision with player
  - Remove collected items from array
  - Add collection feedback (vibration, sound)
  - Test collection works reliably

#### Day 1 - Afternoon (Hours 5-8) - POWER-UP EFFECTS
**Goal**: Implement all 4 collectible effects

- [ ] **Hour 5**: Palm Nut multiplier (🧺)
  - Implement 2x score multiplier effect
  - Add 5-second timer
  - Display multiplier in UI (coordinate with Dev 4)
  - Test multiplier calculation

- [ ] **Hour 6**: Drum slow-time effect (🪘)
  - Implement game speed reduction (0.5x)
  - Add 3-second countdown timer
  - Slow down all game physics
  - Display timer in UI

- [ ] **Hour 7**: Star bonus & Flag boost (🟠🇱🇷)
  - Implement instant +50 points for star
  - Implement height boost for flag (1.5x jump)
  - Test both effects work correctly
  - Add visual feedback for each

- [ ] **Hour 8**: Power-up system integration
  - Ensure power-ups work with score system (Dev 1)
  - Test power-up stacking (or prevent it)
  - Add power-up expiration cleanup
  - Debug any timing issues

#### Day 2 - Morning (Hours 9-12) - POLISH & BALANCE
**Goal**: Balanced and polished collectibles

- [ ] **Hour 9**: Spawn balancing
  - Adjust rarity rates for game balance
  - Test collectible distribution feels fair
  - Ensure collectibles aren't too easy/hard to get
  - Add spawn cooldown to prevent clustering

- [ ] **Hour 10**: Visual effects
  - Add particle effects on collection
  - Improve collectible animations
  - Add trail effects for moving collectibles
  - Polish all visual feedback

- [ ] **Hour 11**: Power-up UI indicators
  - Work with Dev 4 to polish power-up displays
  - Add countdown animations
  - Improve active effect visualization
  - Test UI updates work correctly

- [ ] **Hour 12**: Edge case handling
  - Handle multiple collectibles near each other
  - Test power-up expiration during game over
  - Fix any collection detection issues
  - Test on different screen sizes

#### Day 2 - Afternoon (Hours 13-16) - FINALIZATION
**Goal**: Complete collectible system

- [ ] **Hour 13-14**: Integration testing
  - Full game testing with all collectibles
  - Test all 4 collectible types thoroughly
  - Verify power-ups enhance gameplay
  - Balance final spawn rates

- [ ] **Hour 15**: Final adjustments
  - Adjust collectible sizes for visibility
  - Fine-tune effect durations
  - Optimize collectible rendering
  - Code cleanup and commenting

- [ ] **Hour 16**: Documentation & deployment support
  - Document collectible system
  - Comment power-up code
  - Help with deployment
  - Final QA participation

**Key Deliverables**:
- 4 collectible types with unique effects
- Collectible spawning system
- Power-up timing and effects
- Collection detection
- Visual effects and animations

**Files to Create/Modify**:
- `pages/game/game.js` (collectible array, spawning, effects functions)
- `utils/collectibles.js` (collectible helpers)

**Dependencies**:
- Needs spawn positions from Dev 2
- Provides score multiplier to Dev 1
- Coordinates UI displays with Dev 4

---

### 🟣 **Developer 4: UI/UX & Game States**

**Total Time**: 16 hours over 2 days  
**Priority**: MEDIUM - Essential for playability  
**Git Branch**: `feature/ui-ux`

#### Day 1 - Morning (Hours 1-4) - UI FOUNDATION
**Goal**: All screens and basic UI elements

- [ ] **Hour 1**: WXML structure & layout
  - Create canvas element with proper bindings
  - Set up UI overlay structure
  - Create score panel layout
  - Create level display layout

- [ ] **Hour 2**: Start screen
  - Design and implement start screen
  - Add game title and subtitle
  - Create instructions panel
  - Add start button with styling

- [ ] **Hour 3**: Game HUD (heads-up display)
  - Implement score display
  - Add level/height indicator
  - Create position for power-up indicators
  - Test HUD visibility over game

- [ ] **Hour 4**: Game Over screen
  - Design game over modal
  - Display final score and height
  - Add restart button
  - Add share to WeChat button

#### Day 1 - Afternoon (Hours 5-8) - STYLING & INTERACTIONS
**Goal**: Polished UI with animations

- [ ] **Hour 5**: WXSS styling foundation
  - Style all UI panels with backgrounds
  - Add colors matching game theme
  - Implement proper z-index layering
  - Ensure UI doesn't block gameplay

- [ ] **Hour 6**: Control buttons
  - Create left/right control buttons
  - Position at bottom of screen
  - Add touch feedback (active state)
  - Test buttons work on all devices

- [ ] **Hour 7**: Animations & transitions
  - Add fade-in animations for screens
  - Create pulse animation for multiplier
  - Add slide-in animations for game over
  - Polish all transitions

- [ ] **Hour 8**: Responsive design
  - Test on different screen sizes
  - Adjust layouts for various aspect ratios
  - Ensure UI scales properly
  - Fix any overflow issues

#### Day 2 - Morning (Hours 9-12) - ADVANCED FEATURES
**Goal**: Dynamic UI and polish

- [ ] **Hour 9**: Power-up indicators
  - Create multiplier display (🧺 2x)
  - Create slow-time countdown (🪘 3s, 2s, 1s)
  - Add visual feedback for active effects
  - Coordinate with Dev 3 for timing

- [ ] **Hour 10**: Score animations
  - Add score increment animations
  - Create combo/multiplier effect
  - Add "+50" floating text for collectibles
  - Polish score display

- [ ] **Hour 11**: High score system UI
  - Display high score on start screen
  - Add "New High Score!" celebration
  - Create visual trophy/badge effects
  - Test high score persistence

- [ ] **Hour 12**: Share integration
  - Implement WeChat share function
  - Create share card with score
  - Add share button functionality
  - Test share works correctly

#### Day 2 - Afternoon (Hours 13-16) - FINALIZATION
**Goal**: Polished, complete UI

- [ ] **Hour 13**: Visual polish
  - Fine-tune all colors and contrast
  - Ensure text readability
  - Add shadows and depth effects
  - Polish button styles

- [ ] **Hour 14**: UX improvements
  - Add loading states if needed
  - Improve button feedback
  - Add confirmation for actions if needed
  - Test entire user flow

- [ ] **Hour 15**: Final integration testing
  - Test all UI with complete game
  - Verify all screens work correctly
  - Test on real device
  - Fix any UI bugs

- [ ] **Hour 16**: Documentation & deployment
  - Document UI components
  - Comment styling code
  - Help with deployment
  - Final QA participation

**Key Deliverables**:
- Start screen with instructions
- Game HUD (score, level, height)
- Game over screen
- Control buttons
- Power-up indicators
- Share functionality

**Files to Create/Modify**:
- `pages/game/game.wxml` (all UI markup)
- `pages/game/game.wxss` (all styling)
- `pages/game/game.js` (UI state management, share function)

**Dependencies**:
- Needs game state from Dev 1
- Displays collectible effects from Dev 3
- Shows level info from Dev 2

---

## 🔗 Integration Points & Communication

### Critical Integration Checkpoints

#### Day 1 - Hour 4 (End of Morning)
**TEAM STANDUP #1** - 15 minutes
- Dev 1: Demo basic player movement
- Dev 2: Demo rope rendering
- Dev 3: Demo collectible spawning
- Dev 4: Demo start screen
- **Discuss**: Any blocking issues

#### Day 1 - Hour 8 (End of Day 1)
**TEAM STANDUP #2** - 30 minutes
- Demo integrated gameplay (player + ropes + collision)
- Test basic game loop works
- Identify any critical bugs
- Plan Day 2 priorities
- **Merge**: Integrate all branches for overnight testing

#### Day 2 - Hour 12 (End of Morning)
**TEAM STANDUP #3** - 15 minutes
- Demo complete game with all features
- Review any remaining tasks
- Assign final bug fixes
- Plan deployment strategy

#### Day 2 - Hour 16 (End of Day 2)
**FINAL REVIEW** - 30 minutes
- Complete game playthrough
- Final QA and bug fixes
- Prepare for deployment
- Code upload to WeChat

### Communication Channels
- **Urgent**: Phone call / WeChat voice
- **Questions**: WeChat group chat
- **Code**: Git commits with clear messages
- **Demos**: Screen share via WeChat

### Git Workflow
```bash
# Everyone starts from main
git checkout main
git pull origin main

# Create your feature branch
git checkout -b feature/your-feature

# Commit often with clear messages
git add .
git commit -m "feat: add player jump physics"

# Push your branch
git push origin feature/your-feature

# End of Day 1: Merge to main
git checkout main
git merge feature/your-feature

# Day 2: Continue from updated main
git pull origin main
```

---

## ⚙️ Quick Start Setup

### Prerequisites
1. **WeChat DevTools**: [Download](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. **WeChat Developer Account**: Register at [mp.weixin.qq.com](https://mp.weixin.qq.com/)
3. **Git**: For version control

### Installation (First 15 minutes of Day 1)

```bash
# 1. Clone the repository
git clone <repository-url>
cd lappa-jump-miniprogram

# 2. Open in WeChat DevTools
# - File → Import Project
# - Select lappa-jump-miniprogram folder
# - AppID: Use "touristappid" for testing
# - Click Import

# 3. Verify setup
# - Simulator should show empty canvas
# - Console should show no errors
# - You're ready to start coding!
```

### Project Configuration

Edit `project.config.json` if needed:
```json
{
  "appid": "touristappid",
  "projectname": "lappa-jump",
  "libVersion": "2.19.4"
}
```

---

## 📂 File Structure

```
lappa-jump-miniprogram/
├── app.js                  # Global app logic
├── app.json                # App configuration
├── app.wxss                # Global styles
├── project.config.json     # WeChat DevTools config
├── sitemap.json           # SEO config
│
├── pages/
│   └── game/
│       ├── game.js        # ⭐ MAIN GAME LOGIC (all devs work here)
│       ├── game.json      # Page config
│       ├── game.wxml      # 🟣 Dev 4: UI markup
│       └── game.wxss      # 🟣 Dev 4: Styling
│
├── utils/                 # Helper functions (optional)
│   ├── physics.js        # 🔵 Dev 1: Physics helpers
│   ├── collision.js      # 🟢 Dev 2: Collision helpers
│   └── collectibles.js   # 🟡 Dev 3: Collectible helpers
│
└── docs/
    ├── README.md          # This file
    └── DEPLOYMENT.md      # Deployment guide
```

---

## ✅ Testing Checklist

### Day 1 End Testing
- [ ] Player appears and falls with gravity
- [ ] Player can move left/right
- [ ] Ropes appear on screen
- [ ] Player bounces on rope collision
- [ ] Camera follows player upward
- [ ] Score increases when jumping
- [ ] Basic game loop works (start → play → game over → restart)

### Day 2 End Testing (Complete)
- [ ] All collectibles spawn and work correctly
- [ ] Palm nut gives 2x multiplier for 5 seconds
- [ ] Drum slows time for 3 seconds
- [ ] Star gives +50 points
- [ ] Flag boosts player higher
- [ ] Background changes at correct heights
- [ ] UI displays all information correctly
- [ ] High score saves and loads
- [ ] Share to WeChat works
- [ ] Game runs at 60fps
- [ ] No console errors
- [ ] Works on real device (test via Preview)

### Cross-Device Testing
Test on:
- [ ] iPhone (various sizes)
- [ ] Android (various sizes)
- [ ] iPad (if supporting tablets)

---

## 🚀 Deployment

### Day 2 - Final Hour 

1. **Final Code Review** 
   - Check for console errors
   - Verify all features work
   - Test restart and share



## 🎯 Success Criteria

### Minimum Viable Product (MVP) - Must Have
- ✅ Player can jump on ropes
- ✅ Game has start and game over states
- ✅ Score tracks height
- ✅ High score saves locally
- ✅ Basic UI (score, controls, game over screen)
- ✅ Game runs smoothly (no major bugs)

### Enhanced Features - Should Have
- ✅ All 4 collectibles working
- ✅ 3 level backgrounds
- ✅ Rope animations
- ✅ Share to WeChat
- ✅ Visual polish (animations, effects)

### Optional - Nice to Have
- ⭕ Sound effects (if time permits)
- ⭕ Background music
- ⭕ Advanced animations
- ⭕ Achievement badges

---

## 📊 Development Metrics

### Daily Goals
**Day 1**: 
- Hours 1-4: Individual component development
- Hours 5-8: Integration and basic playable game
- End of Day: Playable prototype

**Day 2**:
- Hours 9-12: Feature completion and polish
- Hours 13-16: Testing, bug fixes, deployment prep
- End of Day: Submitted for review

### Code Quality
- Clear variable names
- Commented code for complex logic
- Consistent formatting
- No hardcoded magic numbers (use constants)

---

## 🐛 Common Issues & Solutions

### Issue: Canvas not rendering
```javascript
// Solution: Check canvas initialization
console.log('Canvas:', this.canvas)
console.log('Context:', this.ctx)
// Ensure canvas.width and canvas.height are set
```

### Issue: Touch not working
```javascript
// Solution: Verify WXML bindings
<canvas bindtouchstart="onTouchStart" ... />
// Check event handler exists in JS
```

### Issue: Collision not working
```javascript
// Solution: Log collision values
console.log('Player:', player.x, player.y)
console.log('Rope:', rope.x, rope.y, rope.width)
// Check collision math
```

### Issue: Performance slow
```javascript
// Solution: Profile game loop
console.time('gameLoop')
this.update()
this.draw()
console.timeEnd('gameLoop') // Should be < 16ms for 60fps
```

---

## 📞 Team Communication

### Daily Standups
- **Morning (Start of day)**: 10 minutes - Plan the day
- **Midday (Hour 4)**: 15 minutes - Sync progress
- **Evening (Hour 8)**: 30 minutes - Demo and integrate
- **End of Day 2**: 30 minutes - Final review

### Communication Rules
1. **Blockers**: Report immediately in group chat
2. **Questions**: Ask early, don't wait
3. **Code**: Commit often (every hour if possible)
4. **Integration**: Test together every 4 hours



## 📝 Code Standards

### JavaScript
```javascript
// Use const/let (no var)
const GRAVITY = 0.5
let playerVelocity = 0

// Clear function names
function checkRopeCollision(player, rope) { }

// Comment complex logic
// Calculate distance between player and collectible using Pythagorean theorem
const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
```

### WXML
```xml
<!-- Use clear class names -->
<view class="score-panel">
  <text class="score-value">{{score}}</text>
</view>

<!-- Proper wx:if usage -->
<view wx:if="{{gameOver}}" class="game-over-screen">
```

### WXSS
```css
/* Group related styles */
.score-panel {
  position: absolute;
  top: 40rpx;
  left: 40rpx;
}

/* Use rpx for responsive sizing */
.button {
  padding: 30rpx;
  font-size: 32rpx;
}
```

---

## 🏆 Post-Launch (After 2 Days)

### Week 1 After Launch
- Monitor crash reports
- Collect user feedback
- Fix critical bugs
- Plan version 1.1

### Future Enhancements
1. **Version 1.1**: Sound effects and music
2. **Version 1.2**: Daily challenges
3. **Version 1.3**: Global leaderboards
4. **Version 2.0**: Multiplayer mode



## 🎉 Final Notes

### Remember:
- **Communication is key** - Ask questions early
- **Test frequently** - Don't wait until the end
- **Commit often** - Save your work regularly
- **Stay focused** - 2 days is tight but achievable!
- **Help each other** - We succeed as a team

### Emergency Contact:
If you get completely stuck:
- Check console for errors
- Review code comments
- Ask in team chat
- Pair program if needed

---

**Good luck, team! Let's build an amazing game! 🚀🇱🇷**

---

**Document Version**: 1.0  
**Last Updated**: January 2026  
**Timeline**: 2-Day Sprint  
**Status**: Ready to Start
