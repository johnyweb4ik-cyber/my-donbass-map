// ИНИЦИАЛИЗАЦИЯ КАРТЫ С КНОПКАМИ МАСШТАБА (через пакет default-ui-theme)
initMap();

async function initMap() {
    await ymaps3.ready;

    // Регистрируем CDN для пакета с темой оформления
    ymaps3.import.registerCdn('https://cdn.jsdelivr.net/npm/{package}', '@yandex/ymaps3-default-ui-theme@latest');

    // Импортируем базовые компоненты карты
    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapControls } = ymaps3;
    
    // Импортируем компоненты из пакета темы
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
    
    // ========== ДОБАВЛЯЕМ КНОПКИ МАСШТАБА ==========
    // Создаём контейнер для элементов управления
    const controls = new YMapControls();
    
    // Добавляем кнопки масштаба в контейнер
    controls.addChild(new YMapZoomControl({
        easing: 'ease-in-out',  // плавная анимация
        duration: 200           // длительность анимации в мс
    }));
    
    // Добавляем контейнер на карту
    map.addChild(controls);

    // Сохраняем карту в глобальную переменную
    window.myMap = map;
}
