const images = ['santorini.jpg', 'sky.jpg', 'venezia.jpg', 'venice_night.jpg', 'meteor_shower.jpg'];

const chosen_image = images[Math.floor(Math.random() * images.length)];

const bg_image = document.createElement('img');
bg_image.id = `bg_img`;
bg_image.src = `img/${chosen_image}`;

document.body.prepend(bg_image);
