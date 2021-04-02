var Userdb=require('../model/model');

//create and save new user
exports.create=(req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message:"content can not be emptied!"});
        return;
    }

    //new user
    const user=new Userdb({
        task_name:req.body.task_name,
        task_description:req.body.task_description,
        creater:req.body.creater,
        duration:req.body.duration,
        created_at:req.body.created_at
    })
    //save user in database
    user
      .save(user)
      .then(data=>{
         //res.send(data)
         res.redirect('/add_task');

      })
      .catch(err=>{
          res.status(500).send({
            message:err.message||"some error occured while creating a create operation"
          });
      });

}
//retrieve and return user/ retrieve or return single user
exports.find=(req,res)=>{
    if(req.query.id){
        const id=req.query.id;

        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"not found user with id"+id})
            }
        })
        .catch(err=>{
            res.status(500).send({message:"error retrieving user with is Id"+id})
        })

    }else{
    Userdb.find()
    .then(user=>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({message:err.message||"error occured while retrieving task information"})
    })

    }
    

}
exports.update=(req,res)=>{
    if(req.body){
        return res
        .status(400)
        .send({message:"Data to update can not be emptied"})
    }
    const id=req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:`cannot update user with $(id).maybe user not found`})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error update user information"})
    })

}
//delete a user with specified user id
exports.delete=(req,res)=>{
    const id=req.params.id;

    Userdb.findByIdAndDelete(id)
      .then(data=>{
          if(!data){
              res.status(404).send({message:`cannot delete with id $(id). maybe id is wrong`})
          }else{
              res.send({
                  message:"user was deleted successfully!"
              })
          }
      })
      .catch(err=>{
          res.status(500).send({
              message:"could not delete user with id="+id
          });
      });

}