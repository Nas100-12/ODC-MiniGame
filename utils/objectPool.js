// utils/objectPool.js
// Reuse objects instead of creating new ones for better performance

class ObjectPool {
  constructor(createFn, resetFn) {
    this.createFn = createFn;
    this.resetFn = resetFn;
    this.pool = [];
    this.active = [];
  }
  
  // Get object from pool or create new
  acquire(...args) {
    let obj;
    
    if (this.pool.length > 0) {
      obj = this.pool.pop();
      this.resetFn(obj, ...args);
    } else {
      obj = this.createFn(...args);
    }
    
    this.active.push(obj);
    return obj;
  }
  
  // Return object to pool
  release(obj) {
    const index = this.active.indexOf(obj);
    if (index > -1) {
      this.active.splice(index, 1);
      this.pool.push(obj);
    }
  }
  
  // Release all active objects
  releaseAll() {
    this.pool.push(...this.active);
    this.active = [];
  }
  
  // Get count of active objects
  getActiveCount() {
    return this.active.length;
  }
  
  // Get count of pooled objects
  getPooledCount() {
    return this.pool.length;
  }
}

export default ObjectPool;