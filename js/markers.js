async function addMarker(coords, title, description) {
    await ymaps3.ready;
    const { YMapPlacemark } = ymaps3;
    
    const marker = new YMapPlacemark(coords, {
        text: title,
        subtitle: description
    });
    
    if (window.myMap) {
        window.myMap.addChild(marker);
    }
}
