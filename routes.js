const express = require("express");
const router = express.Router();


const axios = require('axios');


router.get("/todos", (req, res) => {
   
    let url = 'https://jsonplaceholder.typicode.com/todos';

    axios({
        method: 'get',
        url,

    })
        .then(function (response) {
            //   res.send(response.data);
            return response.data;
        })
        .then(function (result) {
           result.forEach(object => {
            delete object['userId'];
           })
            res.send(result);
        })
       
        .catch(function (error) {
            console.log(error);
        });

})

router.get('/user/:id',(req,res) => {
    
    const id = req.params.id;
    // let user;
    let url = `https://jsonplaceholder.typicode.com/users/${id}`;

    axios({
        method: 'get',
        url,

    })
        .then(function (response) {
         
            return response.data;
        })
        .then(function (user) {
            const {id ,name, email, phone} = user
            

          
            let url = 'https://jsonplaceholder.typicode.com/todos';

            axios({
                method: 'get',
                url,
        
            })
                .then(function (response) {
                    //   res.send(response.data);
                    return response.data;
                })
                .then(function (result) {
                    function checkId(user){
                        return user.userId==id;
                    }
                  const todos = result.filter(checkId);
                  var output = {
                    id,
                    name,
                    email,
                    phone,
                    todos
                  }
                    res.send(output);
                })
               
                .catch(function (error) {
                    res.send(`No TOdos Available with id: ${id}`)
                    console.log(error);
                });


        
           
        })
       
        .catch(function (error) {
            res.send(`No User Available with id: ${id}`)
            console.log(error);
        });

    
})


module.exports = router;
