async function loadBorders() {
    try {
        const response = await fetch('data/borders.json');
        const geojson = await response.json();
        
        await ymaps3.ready;
        
        geojson.features.forEach(feature => {
            const polygon = new ymaps3.YMapFeature({
                geometry: feature.geometry,
                style: {
                    stroke: [{
                        width: 2,
                        color: '#444444'
                    }],
                    fill: 'rgba(200, 200, 200, 0.2)'
                },
                properties: feature.properties
            });
            
            if (window.myMap) {
                window.myMap.addChild(polygon);
            }
        });
        
        console.log('Границы загружены:', geojson.features.length, 'полигонов');
    } catch (error) {
        console.error('Ошибка загрузки границ:', error);
    }
}
