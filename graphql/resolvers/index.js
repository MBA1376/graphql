const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const Event = require('../../models/Event');

const events = (eventIds) => {
    return Event.find({_id : {$in : eventIds}})
        .then(events => {
            return events.map(event => {
                return {...event ,_id : event._id , title:event.title , description:event.description , price: event.price , creator:user.bind(this , event.creator)}
            })
        })
        .catch(err => {throw err;})
}

const user = id => {
    return User.findById(id)
        .then(user => {
            if(!user) {
                throw new Error('there is no user with this id');
            }
            return {...user ,_id: user._id , email:user.email , password:null};
        })
        .catch(err => {
            throw err;
        })

}


module.exports = {
    events: () => {
        return Event.find()
            .then(events => {
                return events.map(event => {
                    return {...event ,_id : event._id ,title:event.title , description:event.description , price:event.price , creator : user.bind(this , event.creator)};
                })
            } )
            .catch(err => {
                throw err;
            });
    } ,
    createEvent: args => {
        const event = new Event({
            title : args.eventInput.title ,
            description : args.eventInput.description ,
            price : +args.eventInput.price ,
            date : new Date() ,
            creator : '5d40906144f3200bc4f1b0bb'
        });
        console.log(event);
        let _event;
        return event.save()
            .then(event =>  {
                _event = {...event , _id:event._id , title:event.title , description:event.description , price:event.price , creator : user.bind(this,event.creator) };
                return User.findById('5d40906144f3200bc4f1b0bb');
            })
            .then(user => {
                if(!user) {
                    throw new Error('user doesnt exists');
                }
                user.createdEvents.push(event);
                return user.save();
                
            })
            .then(user => {
                return _event;
            })
            .catch(err => {throw err})
    } ,
    users : () => {
        return User.find()
            .then(users => {
                return users.map(user => {
                    return {...users , _id:user._id , email:user.email , password:null , createdEvents :events.bind(this , user.createdEvents) };
                });
            })
            .catch(err => console.log(err));
    } ,
    createUser : args => {
        return User.findOne({email : args.userInput.email})
            .then( user => {
                if(user) {
                    throw new Error('user already exists');
                }
                return bcrypt.hash(args.userInput.password , 12);
            })
            .then(hashedPassword => {
                const user = new User({
                    email : args.userInput.email ,
                    password : hashedPassword
                });
                console.log(user);
                return user.save();
            })
            .then(result => {return {...result , _id : result._id , email : result.email , password : null}})
            .catch(err => { throw err });

    }
}