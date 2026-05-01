// ИНИЦИАЛИЗАЦИЯ КАРТЫ С КНОПКАМИ ЗУМА
initMap();

async function initMap() {
    await ymaps3.ready;

    // Регистрируем CDN для загрузки пакета default-ui-theme
    ymaps3.import.registerCdn('https://cdn.jsdelivr.net/npm/{package}', [
        '@yandex/ymaps3-default-ui-theme@latest'
    ]);

    // Импортируем базовые компоненты
    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapControls } = ymaps3;
    
    // Импортируем YMapZoomControl из пакета
    const { YMapZoomControl } = await ymaps3.import('@yandex/ymaps3-default-ui-theme');
    
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
    
    // Добавляем контейнер для элементов управления
    const controls = new YMapControls({
        position: 'right',
        orientation: 'vertical'
    });
    
    // Добавляем кнопки зума
    controls.addChild(new YMapZoomControl({
        easing: 'ease-in-out',
        duration: 300
    }));
    
    map.addChild(controls);

    // Сохраняем карту в глобальную переменную
    window.myMap = map;
        loadBorders();
}
