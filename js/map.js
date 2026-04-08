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
        YMapGeolocationControl, // Кнопка геолокации (моё местоположение)
        YMapRotateControl,      // Кнопка поворота карты
        YMapTiltControl         // Кнопка наклона карты
    } = pkg;

    // Создаём карту с параметрами из config.js
    const map = new YMap(
        document.getElementById('map'),
        {
            location: {
                center: MAP_CONFIG.center,
                zoom: MAP_CONFIG.zoom
            },
            behaviors: ['drag', 'scrollZoom', 'pinchZoom', 'dblClick'] // Все способы управления
        }
    );

    // Добавляем слои карты
    map.addChild(new YMapDefaultSchemeLayer());      // Схема карты
    map.addChild(new YMapDefaultFeaturesLayer({ zIndex: 1800 })); // Объекты на карте
    
    // ========== ДОБАВЛЯЕМ КНОПКИ УПРАВЛЕНИЯ ==========
    
    // Кнопки масштаба (+ и -) - в правом верхнем углу
    map.addChild(new YMapZoomControl({ 
        position: { right: 15, top: 100 } 
    }));
    
    // Кнопка геолокации (определить моё местоположение) - под масштабом
    map.addChild(new YMapGeolocationControl({ 
        position: { right: 15, top: 170 } 
    }));
    
    // Кнопка поворота карты (компас) - рядом с масштабом
    map.addChild(new YMapRotateControl({ 
        position: { right: 15, top: 240 } 
    }));
    
    // Кнопка наклона карты (3D-вид) - под поворотом
    map.addChild(new YMapTiltControl({ 
        position: { right: 15, top: 310 } 
    }));

    // Сохраняем карту в глобальную переменную для доступа из markers.js
    window.myMap = map;
}
