var express = require('express');
var router = express.Router();

const connection=require('./coon');

//连接数据
connection.connect(()=>{
  console.log('连接成功');
  
})
/* GET home page. */
router.post('/login', (req, res)=> {
  let{username,password}=req.body;
   const mql=`select * from user where username='${username}' and password='${password}'`;
   connection.query(mql,(err,data)=>{
     if(err){
       throw err;
     }else{
       res.send(data);
     }
   })
});

router.post('/getMenuList', (req, res)=> {
const mysql=`select * from menu`;
connection.query(mysql,(err,data)=>{
  if(err){
    throw err
  }else{
    res.send(data)
  }
})
});

//状态改变
router.post('/stateChange',(req,res)=>{
connection.query(`update menu set state=? where id=?`,[req.body.state,req.body.id],(err,data)=>{
  if(err){
    throw err
  }else{
    res.send(data)
  }
})
})

//添加用户
router.post('/adduser',(req,res)=>{
  //console.log(req.body)
  let sql=`INSERT INTO menu SET ?`
  connection.query(sql,req.body,(err,results)=>{
    if(err){
      throw err
    }else{
      res.send('ok')
    }
  })
})

//修改用户信息
router.post('/update/+this.id',(req,res)=>{
 console.log(req.body)
  //let{id,list}=req.body
  //console.log(id)
 // console.log(list)
  // //let data=[id,list.username,list.email,list.mobile,list.role_name]
  // connection.query(`update menu set username=a,email=a,mobile=a,role_name=a where id=?`,id,(err,results)=>{
  //   if(err){
  //     throw err
  //   }else{
  //     res.send('ok')
  //   }
  // })
  res.send('不会')
})


// //删除
// router.post('/deluser',(req,res)=>{
//   console.log(req.body)
//   //connection.query(`DELETE FROM menu WHERE id`)
// })
// //删除数据
router.post('/deluser',(reg,res)=>{
  connection.query("DELETE FROM menu WHERE id=?",[reg.body.id],(err,results)=>{
      if(err){
          throw err
      }else {
          res.send('ok')
      }
  })
})



module.exports = router;

