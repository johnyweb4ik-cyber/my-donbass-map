// ИНИЦИАЛИЗАЦИЯ КАРТЫ С ПОДКЛЮЧЁННОЙ ТЕМОЙ
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
    
    // Подключаем стандартный UI (кнопки зума, геолокация, сброс)
    const { YMapDefaultUI } = ymaps3.defaultUiTheme;
    const ui = new YMapDefaultUI({ 
        position: 'right',
        orientation: 'vertical'
    });
    map.addChild(ui);

    // Сохраняем карту в глобальную переменную
    window.myMap = map;
}
