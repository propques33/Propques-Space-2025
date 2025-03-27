import image from './assets/banner/image.png';
import image2 from './assets/banner/image2.png';
import image3 from './assets/banner/imag3.png';
import image4 from './assets/banner/imag4.png';

export const projects = [
  {
    id: 1,
    title: 'Indore',
    location: 'Indore',
    image: image,
    images: [image, image2, image3],

    status: 'active',
  },
  {
    id: 2,
    title: 'Mumbai',
    location: 'Mumbai',
    image: image2,
    status: 'active',
  },
  {
    id: 3,
    title: 'Galaxy',
    location: 'Beijing',
    image: image3,
    status: 'inactive',
  },
  {
    id: 4,
    title: 'Lucknow',
    location: 'Lucknow',
    image: image4,
    status: 'active',
  },
  {
    id: 5,
    title: 'Bangalore',
    location: 'Bangalore',
    image: image,
    status: 'active',
  },
  {
    id: 6,
    title: 'Hyderabad',
    location: 'Hyderabad',
    image: image2,
    status: 'inactive',
  },
  {
    id: 7,
    title: 'Chennai',
    location: 'Chennai',
    image: image3,
    status: 'active',
  },
  {
    id: 8,
    title: 'Pune',
    location: 'Pune',
    image: image4,
    status: 'inactive',
  },
];
