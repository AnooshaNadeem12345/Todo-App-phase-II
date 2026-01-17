// Performance optimization utilities for 3D scenes

/**
 * Dynamic level of detail for 3D objects based on distance/canvas size
 */
export const dynamicLOD = (distance: number, maxDistance: number = 10) => {
  const ratio = distance / maxDistance;
  
  if (ratio < 0.3) {
    // High detail when close
    return { segments: 32, detail: 'high' };
  } else if (ratio < 0.7) {
    // Medium detail at medium distance
    return { segments: 16, detail: 'medium' };
  } else {
    // Low detail when far away
    return { segments: 8, detail: 'low' };
  }
};

/**
 * Throttle function to limit expensive operations
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;

  return function (this: any, ...args: Parameters<T>) {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      func.apply(this, args);
      lastExecTime = currentTime;
    } else if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

/**
 * Debounce function to prevent excessive updates
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout;

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

/**
 * Memory cleanup utility for 3D objects
 */
export const cleanup3DResources = (objects: THREE.Object3D[]) => {
  objects.forEach(obj => {
    // Dispose of geometries
    if ('geometry' in obj) {
      (obj as THREE.Mesh).geometry.dispose();
    }
    
    // Dispose of materials
    if ('material' in obj) {
      const material = (obj as THREE.Mesh).material;
      if (Array.isArray(material)) {
        material.forEach(mat => mat.dispose());
      } else {
        material.dispose();
      }
    }
    
    // Remove from parent
    if (obj.parent) {
      obj.parent.remove(obj);
    }
  });
};

/**
 * FPS counter for performance monitoring
 */
export class FPSCounter {
  private frameCount = 0;
  private lastTime = performance.now();
  private fps = 0;

  tick() {
    this.frameCount++;
    const now = performance.now();
    
    if (now >= this.lastTime + 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (now - this.lastTime));
      this.frameCount = 0;
      this.lastTime = now;
    }
    
    return this.fps;
  }
  
  getFPS() {
    return this.fps;
  }
}