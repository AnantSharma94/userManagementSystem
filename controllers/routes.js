import express from 'express';
import userDB from '../dummyDatabase/userdb.js';

const router = express.Router();

/*--------------- Getting all users or users based on type -------------------------------------------*/

router.get('/users', (req, res, next) => {

    if((Object.keys(req.query).length) === 0){
        (userDB.length == 0) ? res.json('No Users') : res.json(userDB)
    }
    else{
        const type = req.query.type;
        const userTypeUsers = userDB.filter( user => (user.type).toLowerCase() === type.toLowerCase());
        res.json(userTypeUsers);
    } 
    next();
});



//---------------------------------------------------------------------------------------------------

/*----------------------- Getting user based on userId ------------------------------------*/

router.get(`/users/:userId`, (req, res, next) =>{
    const userId = req.params.userId;
    const user = userDB.filter( user => user.userId === userId);

    res.json(user);
    next();
});

//---------------------------------------------------------------------------------------------------

/*--------------------------- Adding new user --------------------------------------------------*/

router.post('/create', (req, res, next) => {
    const newUser = req.body;

    userDB.filter( user => {
        (newUser.userId === user.userId) ? res.json("DATA ALREADY EXISTS") : userDB.push(newUser);
    })
    res.json(userDB);
    next();
});

//---------------------------------------------------------------------------------------------------

/*------------ deleting one or more users based on user id passed as query param ------------------*/

router.delete('/deleteUser', (req , res, next) => {
    const deleteUser = req.query.userId;
    //console.log(deleteUser);
    if(Object.keys(req.query) >= 2){
        deleteUser.filter( (deleteUserId) => {
            for(let index = 0; index < userDB.length; index++){
                if(deleteUserId === userDB[index].userId){
                    userDB.splice(index, 1);
                }
            }
        })
    }
    else{
        for(let index = 0; index < userDB.length; index++){
            if(deleteUser === userDB[index].userId){
                userDB.splice(index, 1);
            }
    }
    

    res.json(userDB);
    next();

    }
});

//-------------------------------------------------------------------------------------------------

/*----------------------- Update user by giving userId as query param -----------------------------*/

router.put('/updateUser', (req, res, next) => {

    const userId = req.query.userId;
    const updatedInfo = req.body;

    for(let index=0 ; index< userDB.length; index++){
        if(userId === userDB[index].userId){
            userDB[index] = {...userDB[index], ...updatedInfo};
        }
    }    
    res.json(userDB);
    next();
})

//--------------------------------------------------------------------------------------------------

export default router;