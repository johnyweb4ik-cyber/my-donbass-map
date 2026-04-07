// ИНИЦИАЛИЗАЦИЯ КАРТЫ
initMap();

async function initMap() {
    await ymaps3.ready;

    // Импортируем нужные компоненты (ВКЛЮЧАЯ КНОПКИ МАСШТАБА)
    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = ymaps3;
    const { YMapZoomControl } = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');

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
    map.addChild(new YMapZoomControl({ position: { right: 15, top: 100 } }));

    // Сохраняем карту в глобальную переменную
    window.myMap = map;
}
