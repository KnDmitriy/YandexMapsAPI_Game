

let center = [51.5426476851475, 46.03558935551953];
let raduis_1 = 100;
let raduis_2 = 500;
let raduis_3 = 1000;
// [[51.52449992409771,46.04534317499307], [80, 0], 'Аллея на Набережной космонавтов?? Памятник "Одноклассник"'],
// [[51.522985539735444,46.039837794792476], [165, 0], "Ротонда"],
//     [[51.52806126411731,46.05451851961934], [90, 10], 'Свято-троицкий собор'],
//     [[51.5407244092056,46.03549478885703], [24, 24], "Церковь Покрова Пресвятой Богородицы"],
const arrayOfPlaces1 = [
    [[51.53395109024124,46.002096914276784], [-55, 5], 'Театр драмы им. И.А.Слонова'],
    [[51.52605888631756,46.0377842924993], [50, 25], 'Театр кукол "Теремок"'],
    [[51.56960623315002,45.98396404874197], [25, 0], 'Тетр оперы и балета, Новая сцена'],
    [[51.53278083900564,46.02478869337068], [-75, 15], 'ТЮЗ им. Киселева, Малая сцена'],
    [[51.534945939857174,46.02300062513041], [105, 15], 'ТЮЗ им. Киселева, Большая сцена'],
    [[51.52989173834936, 46.03471802741731], [230, 20], "Консерватория им. Л.В. Собинова"], 
];
const arrayOfPlaces2 =  [
    [[51.544207776723496,46.0495599438113], [40, 55], "Журавли"],
    [[51.518381582104055,46.00079498845024], [-90, 0], 'Парк "Лукоморье"'],
    [[51.52971716576666,46.035787418909145], [100, 10], "Сад \"Липки\""],
    [[51.53270672401337,46.008107715064476], [180, 0], "Детский парк"],
    [[51.54159263354347,46.06196054998887], [-150, 0], 'Национальная деревня в Парке Победы'],
    [[51.52681434196317,46.055013778903096], [20, 0], 'Площадь Петра I'],
    [[51.56333818981977,46.02533414627298], [140, 0], 'Сквер Рубин'],
];
const arrayOfPlaces3 =  [
    [[51.543656421613065,46.054665303377625], [-120, 10], 'Саратовский историко-патриотический комплекс Музей боевой и трудовой славы'],
    [[51.52780776889423,46.056067948132494], [180, 30], 'Краеведческий музей'],
    [[51.52108086130141,46.01294363998602], [-130, 0], 'Музей "Россия - Моя история"'],
    [[51.53197714906144,46.03598018366362],[-50, 0], "Музей им. А.Н.Радищева"],
];
var placeIndex = 0;
var generalPedDistance = 0;
var amountOfAtempts = 0;
var amountOfAtemptsInRed = 0;
var amountOfAtemptsInBlue = 0;
var amountOfAtemptsInGreen = 0;

function init() {
    
    var currentArrayOfPlaces = arrayOfPlaces2;
    var currentLenOfArrayOfPlaces = currentArrayOfPlaces.length;
    var pointA = currentArrayOfPlaces[placeIndex][0];
    var pointB;
    var myPlacemark,
        myMap = new ymaps.Map('map', {
            center: center,
            zoom: 12,
            type: 'yandex#satellite',
            
        }, {
            searchControlProvider: 'yandex#search' 
        });
    var multiRoute; 
    var circle1;
    var circle2;
    var circle3;
    var player;
    var currentPlacemark;
    var elem_res = document.getElementById("result"); // id элемента для вывода результата
    var elem_rad = document.getElementById("raduis");
    // var elem_ped = document.getElementById("ped_distance");
    // var elem_inf = document.getElementById('info');
    var distance_between_points_str; 
    var distance_between_points; 
    var isNextPlace = false;

    var delay = 0; // Время задержки между печатанием символов в милисекндах.
    elem_info = document.getElementById("info"); // id элемента для вывода результата    

    var print_text = function(text, elem, delay) {

        if(text.length > 0) {
            elem.innerHTML += text[0];
            setTimeout(function() {print_text(text.slice(1), elem, delay); }, delay);
        }
    }
    
    print_text(currentArrayOfPlaces[0][2], elem_info, delay)

    var replace_text = function(elem) {
        elem.innerHTML = ''
    }

    function next()
    {
        if (placeIndex + 1 < currentLenOfArrayOfPlaces)
        {
            ++placeIndex;
        }
        else
        {
            placeIndex = 0;
        }
       

        myMap.setCenter(center, 11);
        // Удаляем с карты маршрут и круги
        myMap.geoObjects.remove(multiRoute);
        myMap.geoObjects.remove(circle1);
        myMap.geoObjects.remove(circle2);
        myMap.geoObjects.remove(circle3);
        myMap.geoObjects.remove(currentPlacemark);
        // Устанавливаем новую достопримечательность
        pointA = currentArrayOfPlaces[placeIndex][0];
        // Перемещаем панораму
        player.moveTo(pointA);
        player.setDirection(currentArrayOfPlaces[placeIndex][1])

        // elem_res.innerHTML = 'Результат: ';
        // elem_ped.innerHTML = 'Расстояние пешего маршрута: ';
        // elem_rad.innerHTML = 'Радиус: ';
        // elem_res.innerHTML = "a";
        // elem_ped.innerHTML = "a";
        // elem_rad.innerHTML = "a";
        // elem_inf.innerHTML = "a";
        replace_text(elem_info)
        replace_text(elem_res)
        replace_text(elem_rad)
        print_text(currentArrayOfPlaces[placeIndex][2], elem_info, delay)
        elem_rad.innerHTML = "Расстояние по прямой: ";
        isNextPlace = true;
    };

    elem_rad.innerHTML = "Расстояние по прямой: ";

    document.getElementById("parks").onclick = function() {
        currentArrayOfPlaces = arrayOfPlaces2;
        // далее код функции одинаков для всех кнопок переходов на другие уровни
        placeIndex = -1;
        currentLenOfArrayOfPlaces = currentArrayOfPlaces.length;
        next();
    };
    document.getElementById("museums").onclick = function() {
        currentArrayOfPlaces = arrayOfPlaces3;
        // далее код функции одинаков для всех кнопок переходов на другие уровни
        placeIndex = -1;
        currentLenOfArrayOfPlaces = currentArrayOfPlaces.length;
        next();
    };
    document.getElementById("theaters").onclick = function() {
        currentArrayOfPlaces = arrayOfPlaces1;
        // далее код функции одинаков для всех кнопок переходов на другие уровни
        placeIndex = -1;
        currentLenOfArrayOfPlaces = currentArrayOfPlaces.length;
        next();
    };
      // alert(ymaps.coordSystem.geo.getDistance(coords, pointA))
      document.getElementById("next").onclick = function() {next()};
      document.getElementById("replay").onclick = function() {
          placeIndex = -1;
          next();
      };

    //myMap.controls.remove('geolocationControl'); // удаляем геолокацию
    myMap.controls.remove('searchControl'); // удаляем поиск
    myMap.controls.remove('trafficControl'); // удаляем контроль трафика
    myMap.controls.remove('typeSelector'); // удаляем тип
    //myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
   // myMap.controls.remove('zoomControl'); // удаляем контроль зуммирования
    myMap.controls.remove('rulerControl'); // удаляем контрол правил
    //myMap.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

    // Слушаем клик на карте.
    myMap.events.add('click', function (e) {
        var coords = e.get('coords');
        // Если multiRoute != null (то есть, маршрут создан), то
        if (multiRoute)
        {
            // alert('multiRoute');
            
            // Если убрать это условие, то маршрут будет перестраиваться при каждом нажатии на карту.
            // Если была нажата кнопка "Дальше", то
            if (isNextPlace === true)
            {
                // alert('multiRoute NextPlace');
                // currentPlacemark = createPlacemark(placeIndex);
                // myMap.geoObjects.add(currentPlacemark);
                // Перестраиваем маршрут при новом нажатии. 
                multiRoute = new ymaps.multiRouter.MultiRoute( {
                    referencePoints: [
                        coords,
                        pointA
                    ],
                    params: {
                        //Тип маршрутизации - пешеходная маршрутизация.
                        routingMode: 'pedestrian'
                    }
                }, {
                    // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
                    boundsAutoApply: true
                });      
                // multiRoute.model.setReferencePoints(
                //     [
                //         coords,
                //         pointA
                //     ]
                // );
                // multiRoute.model.setParams({
                //     //Тип маршрутизации - пешеходная маршрутизация.
                //     routingMode: 'pedestrian'
                    
                // });
                // multiRoute.options.boundsAutoApply = true;
                distance_between_points = Math.round(ymaps.coordSystem.geo.getDistance(coords, pointA));
                distance_between_points_str = String(distance_between_points) + "м";
                print_text(distance_between_points_str, elem_rad, delay);
                
                
                // Добавляем мультимаршрут на карту
                myMap.geoObjects.add(multiRoute);
                // Создаем геодезический круг радиусом radius_1
                circle1 = new ymaps.Circle(
                    [pointA, raduis_1], {}, 
                    {
                        geodesic: true,
                    
                    fillColor: "0066ff99",
    
                    strokeColor: "0066ff99",
                    }
                );
                multiRoute.model.events.add('requestsuccess', function() {
                    // Получение ссылки на активный маршрут.
                    var activeRoute = multiRoute.getActiveRoute();
                    // Получение коллекции путей активного маршрута.
                    var activeRoutePaths = activeRoute.getPaths();
                    // Проход по коллекции путей.
                    activeRoutePaths.each(function(path) {
    
                        // var distance = path.properties.get("distance").value;
                        var distance = distance_between_points;  
                        // (distance);
                        var got_into_radius1 = "Вы угадали!" + String.fromCodePoint(0x1F604);
                        var got_into_radius2 = "Вы почти угадали!" + String.fromCodePoint(0x1F60A); // Ваш текст 
                        var got_into_radius3 = "Далеко..." + String.fromCodePoint(0x1F914);
                        var outside_the_radius = "Вы не угадали!" + String.fromCodePoint(0x1F62D);
    
                                            
                        
                        elem_res = document.getElementById("result"); // id элемента для вывода результата
                        elem_rad = document.getElementById("raduis");
    
                        
    
                        if (distance <= raduis_1) {
                            print_text(got_into_radius1, elem_res, delay);
                            ++amountOfAtemptsInBlue;
    
                        } else {
    
                            if (distance > raduis_1 && distance <= raduis_2 ) {
                                print_text(got_into_radius2, elem_res, delay);
                                ++amountOfAtemptsInGreen
                            } else {
    
                                if (distance > raduis_2 && distance <= raduis_3 ) {
    
                                    print_text(got_into_radius3, elem_res, delay);
                                    ++amountOfAtemptsInRed;
                                } else {
                                    print_text(outside_the_radius, elem_res, delay);
                                } 
                            }
                            //alert("Длина пути: " + path.properties.get("distance").text);
                            //alert("Время прохождения пути: " + path.properties.get("duration").text);
                            //alert(distance_between_points_str);
                            
                        }
                        
                        // path.properties.get("distance").text
                        // distance_between_points_str = String(Math.round(ymaps.coordSystem.geo.getDistance(coords, pointA))) + "м";
                        // print_text(distance_between_points_str, elem_rad, delay);
                        generalPedDistance += path.properties.get("distance").value;
                        ++amountOfAtempts;
    
                        elem_blue = document.getElementById("blue_circle");
                        elem_green = document.getElementById("green_circle");
                        elem_red = document.getElementById("red_circle");
    
                        // alert(amountOfAtempts);
                        if (amountOfAtempts != 0)
                        {
                            // alert(generalPedDistance / amountOfAtempts);
                            replace_text(elem_blue)
                            print_text(String(Math.round(amountOfAtemptsInBlue / amountOfAtempts * 100)) + '%', elem_blue, delay);
    
                            replace_text(elem_green)
                            print_text(String(Math.round(amountOfAtemptsInGreen / amountOfAtempts * 100)) + '%', elem_green, delay);
    
                            replace_text(elem_red)
                            print_text(String(Math.round(amountOfAtemptsInRed / amountOfAtempts * 100)) + '%', elem_red, delay);
                            // alert(String(amountOfAtemptsInBlue / amountOfAtempts * 100) + '%');
                            // alert(String(amountOfAtemptsInGreen / amountOfAtempts * 100) + '%');
                            // alert(String(amountOfAtemptsInRed / amountOfAtempts * 100) + '%');
                        }
                           
                    });
                    
                    // Добавляем мультимаршрут на карту.
                    // myMap.geoObjects.add(multiRoute);
                });
                // Добавляем круг на карту.
                myMap.geoObjects.add(circle1);
    
                // Создаем геодезический круг радиусом radius_2
                circle2 = new ymaps.Circle(
                    [pointA, raduis_2], {},
                    {
                        geodesic: true,
                        fillColor: "00FF7A66",
                        strokeColor: "00FF7A66"
                     }
                );
                // Добавляем круг на карту.
                myMap.geoObjects.add(circle2);
                // Создаем геодезический круг радиусом radius_3
                circle3 = new ymaps.Circle(
                    [pointA, raduis_3], {},
                    {
                        geodesic: true,
                        fillColor: "FF090033",
                        strokeColor: "FF090033"
                    }
                );
                // Добавляем круг на карту.
                myMap.geoObjects.add(circle3);
               
                isNextPlace = false;
            }
        
        }
        else{
            
            // alert('!multiRoute')
            multiRoute = new ymaps.multiRouter.MultiRoute( {
                referencePoints: [
                    coords,
                    pointA
                ],
                params: {
                    //Тип маршрутизации - пешеходная маршрутизация.
                    routingMode: 'pedestrian'
                }
            }, {
                // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
                boundsAutoApply: true
            });
            
            
            // alert('!!!');
            //
            distance_between_points = Math.round(ymaps.coordSystem.geo.getDistance(coords, pointA));
            distance_between_points_str = String(distance_between_points) + "м";
            print_text(distance_between_points_str, elem_rad, delay);
            multiRoute.model.events.add('requestsuccess', function() {
                // Получение ссылки на активный маршрут.
                var activeRoute = multiRoute.getActiveRoute();
                // Получение коллекции путей активного маршрута.
                var activeRoutePaths = activeRoute.getPaths();
                // Проход по коллекции путей.
                activeRoutePaths.each(function(path) {

                    // var distance = path.properties.get("distance").value;
                    var distance = distance_between_points;  
                    // (distance);
                    var got_into_radius1 = "Вы угадали!" + String.fromCodePoint(0x1F604);
                    var got_into_radius2 = "Вы почти угадали!" + String.fromCodePoint(0x1F60A); // Ваш текст 
                    var got_into_radius3 = "Далеко..." + String.fromCodePoint(0x1F914);
                    var outside_the_radius = "Вы не угадали!" + String.fromCodePoint(0x1F62D);

                                        
                    
                    elem_res = document.getElementById("result"); // id элемента для вывода результата
                    elem_rad = document.getElementById("raduis");

                    

                    if (distance <= raduis_1) {
                        print_text(got_into_radius1, elem_res, delay);
                        ++amountOfAtemptsInBlue;

                    } else {

                        if (distance > raduis_1 && distance <= raduis_2 ) {
                            print_text(got_into_radius2, elem_res, delay);
                            ++amountOfAtemptsInGreen
                        } else {

                            if (distance > raduis_2 && distance <= raduis_3 ) {

                                print_text(got_into_radius3, elem_res, delay);
                                ++amountOfAtemptsInRed;
                            } else {
                                print_text(outside_the_radius, elem_res, delay);
                            } 
                        }
                        //alert("Длина пути: " + path.properties.get("distance").text);
                        //alert("Время прохождения пути: " + path.properties.get("duration").text);
                        //alert(distance_between_points_str);
                        
                    }
                    
                    // path.properties.get("distance").text
                    // distance_between_points_str = String(Math.round(ymaps.coordSystem.geo.getDistance(coords, pointA))) + "м";
                    // print_text(distance_between_points_str, elem_rad, delay);
                    generalPedDistance += path.properties.get("distance").value;
                    ++amountOfAtempts;

                    elem_blue = document.getElementById("blue_circle");
                    elem_green = document.getElementById("green_circle");
                    elem_red = document.getElementById("red_circle");

                    // alert(amountOfAtempts);
                    if (amountOfAtempts != 0)
                    {
                        // alert(generalPedDistance / amountOfAtempts);
                        replace_text(elem_blue)
                        print_text(String(Math.round(amountOfAtemptsInBlue / amountOfAtempts * 100)) + '%', elem_blue, delay);

                        replace_text(elem_green)
                        print_text(String(Math.round(amountOfAtemptsInGreen / amountOfAtempts * 100)) + '%', elem_green, delay);

                        replace_text(elem_red)
                        print_text(String(Math.round(amountOfAtemptsInRed / amountOfAtempts * 100)) + '%', elem_red, delay);
                        // alert(String(amountOfAtemptsInBlue / amountOfAtempts * 100) + '%');
                        // alert(String(amountOfAtemptsInGreen / amountOfAtempts * 100) + '%');
                        // alert(String(amountOfAtemptsInRed / amountOfAtempts * 100) + '%');
                    }
                       
                });
                
                // Добавляем мультимаршрут на карту.
                // myMap.geoObjects.add(multiRoute);
            });
            
            
            myMap.geoObjects.add(multiRoute);
            
            // Создаем геодезический круг радиусом 300 метров.
            circle1 = new ymaps.Circle(
            [pointA, raduis_1], {},
            {
                geodesic: true,
                fillColor: "0066ff99",
                strokeColor: "0066ff99",
            });
            // Добавляем круг на карту.
            myMap.geoObjects.add(circle1);

            // Создаем геодезический круг радиусом 1 километр.
            circle2 = new ymaps.Circle(
                [pointA, raduis_2], {},
                {
                    geodesic: true,
                    fillColor: "00FF7A66",
                    strokeColor: "00FF7A66"
                });
            // Добавляем круг на карту.
            myMap.geoObjects.add(circle2);
            
            // Создаем геодезический круг радиусом 2 километра.
            circle3 = new ymaps.Circle(
                [pointA, raduis_3], {},
                {
                    geodesic: true,
                    fillColor: "FF090033",
                    strokeColor: "FF090033"
                });
            // Добавляем круг на карту.
            myMap.geoObjects.add(circle3);
        }
       
 
    });
 

    // Создание метки.
    // function createPlacemark(coords) {
    //     return new ymaps.Placemark(coords, {
    //         iconCaption: 'поиск...'
    //     }, {
    //         preset: 'islands#violetDotIconWithCaption',
    //         draggable: true
    //     });
    // }

    // Определяем адрес по координатам (обратное геокодирование).
    // function getAddress(coords) {
    //     //myPlacemark.properties.set('iconCaption', 'поиск...');
    //     ymaps.geocode(coords).then(function (res) {
    //         var firstGeoObject = res.geoObjects.get(0);

    //         myPlacemark.properties
    //             .set({
    //                 // Формируем строку с данными об объекте.
    //                 iconCaption: [
    //                     // Название населенного пункта или вышестоящее административно-территориальное образование.
    //                     firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
    //                     // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
    //                     firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
    //                 ].filter(Boolean).join(', '),
    //                 // В качестве контента балуна задаем строку с адресом объекта.
    //                 balloonContent: firstGeoObject.getAddressLine() 
    //             });
    //         // pointB = firstGeoObject.getAddressLine();
    //     });
    //     // return pointB;
    // }


   ymaps.panorama.locate(pointA).done(
        function (panoramas) {
            // Убеждаемся, что найдена хотя бы одна панорама.
            if (panoramas.length > 0) {
                // Создаем плеер с одной из полученных панорам.
             player = new ymaps.panorama.Player(
                    'player1',
                        // Панорамы в ответе отсортированы по расстоянию
                        // от переданной в panorama.locate точки. Выбираем первую,
                        // она будет ближайшей.
                    panoramas[0],
                        // Зададим направление взгляда, отличное от значения
                        // по умолчанию.
                    { 
                        direction: currentArrayOfPlaces[0][1],
                        controls: ["panoramaName"]
                    }
                );

                
            }
        },
        function (error) {
            // Если что-то пошло не так, сообщим об этом пользователю.
            alert(error.message);
        }


    );

   
}


ymaps.ready(init);