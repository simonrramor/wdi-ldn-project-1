const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const User = require('../models/user');
const Photo = require('../models/photo');
const Group = require('../models/group');


User.collection.drop();
Photo.collection.drop();
Group.collection.drop();


User
.create([{
  firstName: 'Simon',
  lastName: 'Amor',
  image: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAaPAAAAJDFhNzNhZjliLWQyNTQtNGM4MS04YmZhLWYxMGFlOTVlOGFlNQ.jpg',
  username: 'simonrramor',
  email: 'simonrramor@gmail.com',
  password: 'password',
  passwordConfirmation: 'password'
},{
  firstName: 'Lucy',
  lastName: 'Carstenns',
  image: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAaPAAAAJDFhNzNhZjliLWQyNTQtNGM4MS04YmZhLWYxMGFlOTVlOGFlNQ.jpg',
  username: 'Lucy',
  email: 'lucy@gmail.com',
  password: 'password',
  passwordConfirmation: 'password'
},{
  firstName: 'Jane',
  lastName: 'Amor',
  image: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAaPAAAAJDFhNzNhZjliLWQyNTQtNGM4MS04YmZhLWYxMGFlOTVlOGFlNQ.jpg',
  username: 'JaneAmor',
  email: 'Jane@gmail.com',
  password: 'password',
  passwordConfirmation: 'password'

}])
.then((users) => {
  console.log(`${users.length} users created`);

  return Group
  .create([{
    name: 'Friends',
    members: [users[0]],
    description: 'This is a group to post images to your Friends'
  },{
    name: 'Family',
    members: [users[0]],
    description: 'This is a group to post images to your family'
  },{
    name: 'Travel Buddies',
    members: [users[0]],
    description: 'Group of people we met traveling'
  },{
    name: 'Work Friends',
    members: [users[0]],
    description: 'Work Friends'
  },{
    name: 'Uni Legends',
    members: [users[0]],
    description: 'The grew from Uni'
  }])
  .then((groups) => {
    console.log(`${groups.length} groups created`);
    return Photo
    .create([{
      caption: 'Herbert words and also some other stuff',
      image: 'https://images.unsplash.com/photo-1469461084727-4bfb496cf55a?dpr=2&auto=format&fit=crop&w=1500&h=994&q=80&cs=tinysrgb&crop=&bg=',
      createdBy: users[0],
      groups: [groups[0]],
      date: '10-06-2017'
    },{
      caption: 'Herbert words and also some other stuff',
      image: 'https://images.unsplash.com/photo-1465126188505-4f04a0f23a4d?dpr=2&auto=format&fit=crop&w=1080&h=697&q=80&cs=tinysrgb&crop=&bg=',
      createdBy: users[0],
      groups: [groups[0]],
      date: '10-06-2017'
    },{
      caption: 'Herbert words and also some other stuff',
      image: 'https://images.unsplash.com/photo-1473445361085-b9a07f55608b?dpr=2&auto=format&fit=crop&w=1500&h=958&q=80&cs=tinysrgb&crop=&bg=',
      createdBy: users[0],
      groups: [groups[0]],
      date: '10-06-2017'
    },{
      caption: 'Herbert words and also some other stuff',
      image: 'https://images.unsplash.com/photo-1487777266562-c209de215ec2?dpr=2&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg=',
      createdBy: users[0],
      groups: [groups[0]],
      date: '10-06-2017'
    },{
      caption: 'Herbert words and also some other stuff',
      image: 'https://images.unsplash.com/photo-1465411801898-f1a78de00afc?dpr=2&auto=format&fit=crop&w=1080&h=718&q=80&cs=tinysrgb&crop=&bg=',
      createdBy: users[0],
      groups: [groups[0]],
      date: '12-06-2017'
    },{
      caption: 'Herbert words and also some other stuff',
      image: 'https://images.unsplash.com/photo-1489753735160-2cbf3d9006d4?dpr=2&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg=',
      createdBy: users[0],
      groups: [groups[0]],
      date: '12-06-2017'
    },{
      caption: 'Herbert words and also some other stuff',
      image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?dpr=2&auto=format&fit=crop&w=1500&h=1000&q=80&cs=tinysrgb&crop=&bg=',
      createdBy: users[0],
      groups: [groups[0]],
      date: '12-06-2017'
    },{
      caption: 'Herbert words and also some other stuff',
      image: 'https://images.unsplash.com/photo-1465411801898-f1a78de00afc?dpr=2&auto=format&fit=crop&w=1080&h=718&q=80&cs=tinysrgb&crop=&bg=',
      createdBy: users[0],
      groups: [groups[1]],
      date: '12-06-2017'
    },{
      caption: 'Herbert words and also some other stuff',
      image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?dpr=2&auto=format&fit=crop&w=1080&h=720&q=80&cs=tinysrgb&crop=&bg=',
      createdBy: users[0],
      groups: [groups[0]],
      date: '09-06-2017'
    },{
      caption: 'Herbert words and also some other stuff',
      image: 'https://images.unsplash.com/photo-1482993032093-397e0c525e85?dpr=2&auto=format&fit=crop&w=1080&h=720&q=80&cs=tinysrgb&crop=&bg=',
      createdBy: users[0],
      groups: [groups[0]],
      date: '12-06-2017'
    },{
      caption: 'Herbert words and also some other stuff',
      image: 'https://images.unsplash.com/photo-1486742913764-cdb6b28038f9?dpr=2&auto=format&fit=crop&w=1080&h=1620&q=80&cs=tinysrgb&crop=&bg=',
      createdBy: users[0],
      groups: [groups[1]],
      date: '12-06-2017'
    },{
      caption: 'Herbert words and also some other stuff',
      image: 'https://static.pexels.com/photos/59523/pexels-photo-59523.jpeg',
      createdBy: users[0],
      groups: [groups[0]],
      date: '10-06-2017'
    },{
      caption: 'Herbert words and also some other stuff',
      image: 'https://images.unsplash.com/photo-1494587416117-f102a2ac0a8d?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=&bg=',
      createdBy: users[0],
      groups: [groups[1]],
      date: '10-06-2017'
    },{
      caption: 'Herbert words and also some other stuff',
      image: 'https://images.unsplash.com/photo-1495132280856-0de542e5f919?dpr=2&auto=format&fit=crop&w=1500&h=2000&q=80&cs=tinysrgb&crop=&bg=',
      createdBy: users[0],
      groups: [groups[1]],
      date: '10-06-2017'
    },{
      caption: 'Herbert words and also some other stuff',
      image: 'https://images.unsplash.com/photo-1465311041514-598f1a16ada0?dpr=2&auto=format&fit=crop&w=1500&h=1004&q=80&cs=tinysrgb&crop=&bg=',
      createdBy: users[0],
      groups: [groups[1]],
      date: '10-06-2017'
    }]);
  });
})
.then((photos) => console.log(`${photos.length} photos created`))
.catch((err) => console.log(err))
.finally(() => mongoose.connection.close());
