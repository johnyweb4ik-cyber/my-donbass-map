// ИНИЦИАЛИЗАЦИЯ КАРТЫ — ПРОСТОЙ РАБОЧИЙ ВАРИАНТ
initMap();

async function initMap() {
    await ymaps3.ready;

    // Импортируем базовые компоненты
    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = ymaps3;
    
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
    

    // Сохраняем карту в глобальную переменную
    window.myMap = map;
}
