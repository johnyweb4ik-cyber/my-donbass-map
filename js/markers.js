// МЕТКИ НА КАРТЕ
// Сюда будете добавлять свои точки
// Пример:
// addMarker([38.0, 48.5], "Донецк", "Крупный город");

async function addMarker(coords, title, description) {
    await ymaps3.ready;
    const { YMapPlacemark } = ymaps3;
    
    const marker = new YMapPlacemark(coords, {
        text: title,
        subtitle: description
    });
    
    if (window.myMap) {
        window.myMap.addChild(marker);
    }
}

// Пример добавления тестовой метки (раскомментируйте, когда будете готовы)
// addMarker([37.8, 48.0], "Донецк", "Столица ДНР");
// addMarker([39.3, 48.5], "Луганск", "Столица ЛНР");
