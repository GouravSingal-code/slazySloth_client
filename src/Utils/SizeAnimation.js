function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
}

export function expandFunction(target , idName) {
    const divElement = document.getElementById(idName);
    const targetWidth = target;
    const initialWidth = parseInt(getComputedStyle(divElement).width); // Get current width
  
    function animateWidth(timestamp) {
      const elapsedTime = timestamp - startTime;
  
      if (elapsedTime < duration) {
        const newWidth = easeInOutCubic(elapsedTime, initialWidth, targetWidth - initialWidth, duration);
        divElement.style.width = newWidth + 'px';
        requestAnimationFrame(animateWidth);
      } else {
        divElement.style.width = targetWidth + 'px';
      }
    }
  
    const duration = 1000; // Animation duration in milliseconds
    const startTime = performance.now();
    requestAnimationFrame(animateWidth);
}


