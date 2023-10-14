    function calculateBounds(posts) {
        
        let minLng = Infinity
        let maxLng = -Infinity
        let minLat = Infinity
        let maxLat = -Infinity
      
        posts.forEach((post) => {
          const { longitude, latitude } = post.place;
          minLng = Math.min(minLng, longitude);
          maxLng = Math.max(maxLng, longitude);
          minLat = Math.min(minLat, latitude);
          maxLat = Math.max(maxLat, latitude);
        })
      
        return {
          longitude: (minLng + maxLng) / 2,
          latitude: (minLat + maxLat) / 2,
          zoom: 9,
          transitionDuration: 500
        }
      }

      export default calculateBounds;