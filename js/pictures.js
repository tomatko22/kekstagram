'use strict';
//Шаблон фото
var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');

//Окно для главного фото
var mainPhotoOverlay = document.querySelector('.gallery-overlay');

//главное фото
var mainPhoto = mainPhotoOverlay.querySelector('.gallery-overlay-image');

//Количество лайков (главное фото)
var likesCount = mainPhotoOverlay.querySelector('.likes-count');

//Количество комментариев (главное фото)
var commentsCount = mainPhotoOverlay.querySelector('.comments-count');

//Блок галереи
var allPictures = document.querySelector('.pictures');

// Список комментариев
var templateComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// Получаем фрагмент
var fragment = document.createDocumentFragment();


// Функция, возвращающая случайный элемент массива
var getRandomArrElement = function (arr) {
	var random = Math.floor(Math.random() * arr.length);

	return random;
};

// Функция, возвращающая случайное число min - max
function randomInteger(min, max) {
  var randomNum = min - 0.5 + Math.random() * (max - min + 1)
  randomNum = Math.round(randomNum);
  return randomNum;
};

// Функция, генерирующая массив с определенным количеством js-объектов (картинок)
var getPictures = function (quantity) {
  var pictures = [];
  for (var i = 0; i < quantity; i++) {
  var linkPhoto = 'photos/' + (i + 1) + '.jpg';
    pictures[i] = {
      url: linkPhoto,
      likes: randomInteger(15, 200),
      comments: templateComments[getRandomArrElement(templateComments)]
    };
    
  }
  
  return pictures;
};

// Функция создания DOM-элемента(картинки) на основе js-объекта 
var renderPicture = function (pictureData) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('img').src = pictureData.url;
    pictureElement.querySelector('.picture-likes').textContent = pictureData.likes;
    pictureElement.querySelector('.picture-comments').textContent = pictureData.comments;

    return pictureElement;
};

// Функция отрисовки главного фото
var getMainPhoto = function (pictureData) {
  mainPhoto.src = pictureData[0].url;
  likesCount.textContent = pictureData[0].likes;
  commentsCount.textContent = randomInteger(0, 6);
};

// Функция, заполнения блока DOM-элементами на основе массива JS-объектов
var addPictures = function (array) { 
  for (var i = 0; i < array.length; i++) {
    var picture = renderPicture(array[i]);
    fragment.appendChild(picture);
  }

  //Добавляем фрагмент c DOM-элементами в блок галереи
  allPictures.appendChild(fragment);
  //Получаем главное фото
  getMainPhoto(pictures);
};


// Получаем массив с картинками
var pictures = getPictures(26);

//Добавляем главное фото и все картинки
addPictures(pictures)

//Делаем видимым окно галереи
mainPhotoOverlay.classList.remove('hidden');