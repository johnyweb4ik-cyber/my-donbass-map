// ИНИЦИАЛИЗАЦИЯ КАРТЫ
initMap();

async function initMap() {
    await ymaps3.ready;

    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapZoomControl } = ymaps3;

    // Создаём карту с параметрами из config.js
    const map = new YMap(
        document.getElementById('map'),
        {
            location: {
                center: MAP_CONFIG.center,
                zoom: MAP_CONFIG.zoom
            }
        }
    );

    // Добавляем слои
    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapDefaultFeaturesLayer({ zIndex: 1800 }));
    
    // Добавляем кнопки масштаба
    map.addChild(new YMapZoomControl({ position: MAP_CONFIG.controls.zoom }));

    // Сохраняем карту в глобальную переменную, чтобы markers.js мог добавлять метки
    window.myMap = map;
}
