const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const gallery = document.querySelector('.gallery');

const markup = images
  .map(
    ({ preview, original, description }) => `<li class="gallery-item">
  <a class="gallery-link" href="${original}">
    <img
      class="gallery-image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
  )
  .join('');

gallery.insertAdjacentHTML('beforeend', markup);

gallery.addEventListener('click', event => {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const imageUrl = event.target.dataset.source;
  const instance = basicLightbox.create(
    `
    <div class="lightbox-content">
       <span class="prev">&lt;</span>
       <img src="${imageUrl}" alt="${event.target.alt}">
       <span class="next">&gt;</span>
    </div>`
  );
  instance.show();

  // Отримайте посилання на елементи стрілок всередині функції, яка створює модальне вікно
  var prevButton = instance.element().querySelector('.prev');
  var nextButton = instance.element().querySelector('.next');

  // Додайте обробник події для кліку на стрілку вліво
  prevButton.addEventListener('click', function () {
    showPrevImage(instance);
  });

  // Додайте обробник події для кліку на стрілку вправо
  nextButton.addEventListener('click', function () {
    showNextImage(instance);
  });
});

// Функція для показу попереднього зображення
function showPrevImage(instance) {
  const currentImage = instance.element().querySelector('img');
  const currentIndex = images.findIndex(
    img => img.original === currentImage.src
  );
  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  currentImage.src = images[prevIndex].original;
}

// Функція для показу наступного зображення
function showNextImage(instance) {
  const currentImage = instance.element().querySelector('img');
  const currentIndex = images.findIndex(
    img => img.original === currentImage.src
  );
  const nextIndex = (currentIndex + 1) % images.length;
  currentImage.src = images[nextIndex].original;
}
