const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const User = require('../models/user');
const Photo = require('../models/photo');


User.collection.drop();
Photo.collection.drop();


User
.create([{
  firstName: 'Mike',
  lastName: 'Hayden',
  username: 'mickyginger',
  email: 'mike.hayden@ga.co',
  password: 'password',
  passwordConfirmation: 'password'
}])
.then((users) => {
  console.log(`${users.length} users created`);
  return Photo
  .create([{
    caption: 'Herbert words and also some other stuff',
    image: 'https://images.unsplash.com/photo-1465126188505-4f04a0f23a4d?dpr=2&auto=format&fit=crop&w=1080&h=697&q=80&cs=tinysrgb&crop=&bg=',
    createdBy: users[0]
  },{
    caption: 'Herbert words and also some other stuff',
    image: 'https://images.unsplash.com/photo-1465411801898-f1a78de00afc?dpr=2&auto=format&fit=crop&w=1080&h=718&q=80&cs=tinysrgb&crop=&bg=',
    createdBy: users[0]
  },{
    caption: 'Herbert words and also some other stuff',
    image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?dpr=2&auto=format&fit=crop&w=1080&h=720&q=80&cs=tinysrgb&crop=&bg=',
    createdBy: users[0]
  },{
    caption: 'Herbert words and also some other stuff',
    image: 'https://images.unsplash.com/photo-1482993032093-397e0c525e85?dpr=2&auto=format&fit=crop&w=1080&h=720&q=80&cs=tinysrgb&crop=&bg=',
    createdBy: users[0]
  },{
    caption: 'Herbert words and also some other stuff',
    image: 'https://images.unsplash.com/photo-1486742913764-cdb6b28038f9?dpr=2&auto=format&fit=crop&w=1080&h=1620&q=80&cs=tinysrgb&crop=&bg=',
    createdBy: users[0]
  },{
    caption: 'Herbert words and also some other stuff',
    image: 'https://static.pexels.com/photos/59523/pexels-photo-59523.jpeg',
    createdBy: users[0]
  },{
    caption: 'Herbert words and also some other stuff',
    image: 'https://images.unsplash.com/photo-1494587416117-f102a2ac0a8d?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=&bg=',
    createdBy: users[0]
  },{
    caption: 'Herbert words and also some other stuff',
    image: 'https://images.unsplash.com/photo-1495198661409-17b1ee84cdbe?dpr=2&auto=format&fit=crop&w=1080&h=1618&q=80&cs=tinysrgb&crop=&bg=',
    createdBy: users[0]
  }]);
})
.then((photos) => console.log(`${photos.length} photos created`))
.catch((err) => console.log(err))
.finally(() => mongoose.connection.close());
