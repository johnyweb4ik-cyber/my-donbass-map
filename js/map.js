// ИНИЦИАЛИЗАЦИЯ КАРТЫ С КНОПКАМИ УПРАВЛЕНИЯ
initMap();

async function initMap() {
    await ymaps3.ready;

    // Регистрируем CDN для загрузки пакета с темой оформления
    ymaps3.import.registerCdn('https://cdn.jsdelivr.net/npm/{package}', '@yandex/ymaps3-default-ui-theme@latest');

    // Импортируем базовые компоненты карты
    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = ymaps3;
    
    // Импортируем элементы управления из пакета темы
    const pkg = await ymaps3.import('@yandex/ymaps3-default-ui-theme');
    const { 
        YMapZoomControl,        // Кнопки масштаба (+ и -)
        YMapGeolocationControl, // Кнопка геолокации
        YMapRotateControl,      // Кнопка поворота
        YMapTiltControl         // Кнопка наклона
    } = pkg;

    // Импортируем контейнер для элементов управления из основного API
    const { YMapControls } = ymaps3;

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
    
    // ========== ДОБАВЛЯЕМ КНОПКИ УПРАВЛЕНИЯ ==========
    // Создаём контейнер для кнопок в правом верхнем углу
    const controlsContainer = new YMapControls({ position: { right: 15, top: 100 } });
    
    // Добавляем кнопки в контейнер
    controlsContainer.addChild(new YMapZoomControl({}));
    controlsContainer.addChild(new YMapGeolocationControl({}));
    controlsContainer.addChild(new YMapRotateControl({}));
    controlsContainer.addChild(new YMapTiltControl({}));
    
    // Добавляем контейнер на карту
    map.addChild(controlsContainer);

    // Сохраняем карту в глобальную переменную
    window.myMap = map;
}
