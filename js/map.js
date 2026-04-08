// ИНИЦИАЛИЗАЦИЯ КАРТЫ — ПРОСТОЙ РАБОЧИЙ ВАРИАНТ
initMap();

async function initMap() {
    await ymaps3.ready;

    // Импортируем базовые компоненты
    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = ymaps3;
    
    // Импортируем кнопки масштаба из официального пакета controls
    const { YMapZoomControl } = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');

    // Создаём карту
    const map = new YMap(
        document.getElementById('map'),
        {
            location: {
                center: MAP_CONFIG.center,
                zoom: MAP_CONFIG.zoom
            },
            behaviors: ['drag', 'scrollZoom', 'pinchZoom', 'dblClick']
        }
    );

    // Добавляем слои карты
    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapDefaultFeaturesLayer({ zIndex: 1800 }));
    
    // Добавляем кнопки масштаба (прямо на карту, без дополнительных контейнеров)
    map.addChild(new YMapZoomControl({ 
        position: { right: 15, top: 100 } 
    }));

    // Сохраняем карту в глобальную переменную
    window.myMap = map;
}
