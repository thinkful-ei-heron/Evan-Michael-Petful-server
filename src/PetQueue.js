let catArray = [
  {
    imageURL:
      'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
    imageDescription:
      'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Fluffy',
    sex: 'Female',
    age: 2,
    breed: 'Bengal',
    story: 'Thrown on the street'
  },
  {
    imageURL:
      'https://upload.wikimedia.org/wikipedia/commons/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg',
    imageDescription: 'Young Orange cat found a comfy bed',
    name: 'Lewis',
    sex: 'M',
    age: 1,
    breed: 'Domestic Shorthair Tabby',
    story: 'His mother just had a litter of kittens'
  },
  {
    imageURL: 'https://resize.hswstatic.com/w_907/gif/persian-cat-1.jpg',
    imageDescription: 'Young grey cat plays on the stairs',
    name: 'Paulie',
    sex: 'M',
    age: 2,
    breed: 'Persian',
    story: 'Cute persian with 5 sisters and 2 brothers needs a good home'
  },
  {
    imageURL:
      'https://dbw4iivs1kce3.cloudfront.net/680x390/2017/02/maine-coon-02-2017.jpg',
    imageDescription: 'Cat lounging in the sun on a bed',
    name: 'Anabelle',
    sex: 'F',
    age: 5,
    breed: 'Maine Coon',
    story: 'She loves to hunt almost as much as she loves to sleep'
  },
  {
    imageURL:
      'https://vetstreet.brightspotcdn.com/dims4/default/bf7fb07/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2Fc0%2F09a600a2ab11e087a80050568d634f%2Ffile%2FBritish-Shorthair-1-645mk062211.jpg',
    imageDescription: 'Surprised cat at a photoshoot',
    name: 'Snowflake',
    sex: 'F',
    age: 2,
    breed: 'British Shorthair',
    story: 'Cat who loves to hangout with mice. Weird.'
  }
];

let dogArray = [
  {
    imageURL:
      'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
    imageDescription:
      'A smiling golden-brown golden retreiver listening to music.',
    name: 'Zeus',
    sex: 'Male',
    age: 3,
    breed: 'Golden Retriever',
    story: 'Owner Passed away'
  },
  {
    imageURL:
      'https://vetstreet.brightspotcdn.com/dims4/default/81a2e35/2147483647/crop/0x0%2B0%2B0/resize/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2Fa9%2Ff54ad0a80611e0a0d50050568d634f%2Ffile%2FSiberian-Husky-4-645mk062811.jpg',
    imageDescription: 'Husky hanging out in the forest',
    name: 'Ranger',
    sex: 'M',
    age: 4,
    breed: 'Siberian Husky',
    story: 'Doggo loves his ballo'
  },
  {
    imageURL:
      'https://upload.wikimedia.org/wikipedia/commons/f/f0/Mops_oct09_cropped2.jpg',
    imageDescription: 'Cute pup on a walk',
    name: 'Felicia',
    sex: 'F',
    age: 2,
    breed: 'Pug',
    story: 'Her owner passed away soon after Felicia was born'
  },
  {
    imageURL:
      'https://imgix.bustle.com/uploads/getty/2019/11/30/54439034-fe4d-4e18-b1c2-d7c0740e7e9d-getty-1185523800.jpg?w=1020&h=574&fit=crop&crop=faces&auto=format&q=70',
    imageDescription: 'Birdie at a show',
    name: 'Birdie',
    sex: 'F',
    age: 6,
    breed: 'Bulldog',
    story: 'This showdog loves the spotlight'
  },
  {
    imageURL: 'https://www.k9web.com/wp-content/uploads/2019/01/shiba-inu.jpg',
    imageDescription: 'Just a dog with his ball',
    name: 'Paul',
    sex: 'M',
    age: 1,
    breed: 'Shiba Inu',
    story: 'The owner accidentally threw the ball too far, and Paul got lost'
  }
];

const userArray = [
  {
    name: 'John',
    cat: true,
    dog: false
  },
  {
    name: 'Paul',
    cat: false,
    dog: true
  },
  {
    name: 'Ringo',
    cat: true,
    dog: true
  },
  {
    name: 'George',
    cat: true,
    dog: false
  }
];

module.exports = {
  catArray,
  dogArray,
  userArray
};
