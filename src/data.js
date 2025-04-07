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
  
];


export const locationData = [
  {
    city: "Lucknow",
    subLocations: [
      {
        name: "Hazratganj",
        address: "Some address in Hazratganj",
        image: "https://via.placeholder.com/300x200.png?text=Lucknow+1"
      },
      {
        name: "Gomti Nagar",
        address: "Some address in Gomti Nagar",
        image: "https://via.placeholder.com/300x200.png?text=Lucknow+2"
      }
    ]
  },
  {
    city: "Mumbai",
    subLocations: [
      {
        name: "Andheri",
        address: "Some address in Andheri",
        image: "https://via.placeholder.com/300x200.png?text=Mumbai+1"
      },
      {
        name: "Bandra",
        address: "Some address in Bandra",
        image: "https://via.placeholder.com/300x200.png?text=Mumbai+2"
      }
    ]
  },
  {
    city: "Indore",
    subLocations: [
      {
        name: "Vijay Nagar",
        address: "Some address in Vijay Nagar",
        image: "https://via.placeholder.com/300x200.png?text=Indore+1"
      }
    ]
  }
];

