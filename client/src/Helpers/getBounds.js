function getBounds(posts) {
  
    let minLng = Infinity;
    let maxLng = -Infinity;
    let minLat = Infinity;
    let maxLat = -Infinity;
  
    posts?.forEach((post) => {
      const { longitude, latitude } = post.place;
      minLng = Math.min(minLng, longitude);
      maxLng = Math.max(maxLng, longitude);
      minLat = Math.min(minLat, latitude);
      maxLat = Math.max(maxLat, latitude);
    });
  
    // Calculate the center of the bounds
    const centerLng = (minLng + maxLng) / 2;
    const centerLat = (minLat + maxLat) / 2;
  
    // Calculate the zoom level based on the maximum distance
    // const zoom = getZoomLevel(maxLng - minLng, maxLat - minLat);


    return {
      longitude: centerLng,
      latitude: centerLat,
      zoom: 0,
      transitionDuration: 500
    };
  }
  
  // function getZoomLevel(longitudeRange, latitudeRange) {
  //   // Calculate zoom based on the range of longitude and latitude
  //   const zoom = Math.min(
  //     Math.log2(360 / longitudeRange),
  //     Math.log2(170 / latitudeRange)
  //   );
  //   return zoom;
  // }
  
  export default getBounds;
  