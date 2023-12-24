const Sequelize = require('../models/expense');

exports.postExpense=async (req, res) => {
  console.log("id fetch>>>>>>>>>>"+ req.user)
    try {

      const name = req.body.name;
      const price = req.body.price;
      const date=  req.body.date;
      const category = req.body.category;
     
      
      const data = await Sequelize.create({
        Itemname: name,
        price: price,
        date:date,
        category: category,
        userId:req.user.id
    
        
       
      });        
      res.status(201).json({ newexpenseDetail: data });
    } catch (err) { 
      console.log("error"+err)      
    res.status(500).json({ error: err }) 
    }
  }
  // {where:{userId:req.user.id}}

  exports.getExpense=async(req,res)=>{
    try{
    const expenses=await Sequelize.findAll({where:{userId:req.user.id}});
    console.log(req.user.id)
    res.status(200).json({allExpenses:expenses});
    }catch(err){
        console.log('get user is failing', JSON.stringify(err))
        res.status(500).json({error:err })
    }
}


exports.deleteExpense=async(req,res)=>{
    try{
      const uId=req.params.id
        if(uId=='undefined'|| uId.length === 0){
            console.log('ID is missing')
            return res.status(400).json({success: false, })
        }
    ;
   const noofrows= await Sequelize.destroy({where:{id:uId,userId:req.user.id}})
   console.log("noofrows",noofrows)
   if(noofrows === 0){     
    return res.status(404).json({success: false, message: 'Expense doenst belong to the user'})
}
return res.status(200).json({ success: true, message: "Deleted Successfuly"})     

    }
    catch(err){
      console.log(err);
        return res.status(500).json({ success: true, message: "Failed"})
    }
  }


  