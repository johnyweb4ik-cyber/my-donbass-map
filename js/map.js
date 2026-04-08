// ИНИЦИАЛИЗАЦИЯ КАРТЫ С КРУГЛЫМИ КНОПКАМИ МАСШТАБА
initMap();

async function initMap() {
    await ymaps3.ready;

    // Регистрируем CDN для пакета с темой оформления
    ymaps3.import.registerCdn('https://cdn.jsdelivr.net/npm/{package}', '@yandex/ymaps3-default-ui-theme@latest');

    // Импортируем базовые компоненты карты
    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapControls } = ymaps3;
    
    // Импортируем кнопки масштаба из пакета темы
    const themePkg = await ymaps3.import('@yandex/ymaps3-default-ui-theme');
    const { YMapZoomControl } = themePkg;

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
    
    // Контейнер для кнопок — справа, отступ 15px сверху
    const controls = new YMapControls({ 
        position: { right: 15, top: 100 }
    });
    
    // Добавляем круглые кнопки "+" и "-"
    controls.addChild(new YMapZoomControl());
    
    // Добавляем контейнер на карту
    map.addChild(controls);

    // Сохраняем карту в глобальную переменную
    window.myMap = map;
}
