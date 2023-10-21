function getBounds(posts) {
  if (posts.length < 1) {
    return [ [ -125.0000, 24.3963],[ -66.9346, 49.3844 ] ];
  }


  
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  posts?.forEach((post) => {
    const { longitude, latitude } = post.place;
    minX = Math.min(minX, longitude);
    minY = Math.min(minY, latitude);
    maxX = Math.max(maxX, longitude);
    maxY = Math.max(maxY, latitude);
  });

  const padding = .5
  

  return  [
    [minX - padding, minY - padding],
    [maxX + padding, maxY + padding ]
  ]
}

export default getBounds;
