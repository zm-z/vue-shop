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
  console.log(req);
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
router.post('/update',(req,res)=>{
  let{id,newlist}=req.body
  let sql=`UPDATE menu SET username=?,email=?,mobile=?,role_name=?,state=? where id=? `
  let data=[newlist.username,newlist.email,newlist.mobile,newlist.role_name,newlist.state,id]
  connection.query(sql,data,(err,results)=>{
    if(err){
      throw err
    }else{
      res.send('ok')
    }
  })
})

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

//查看数据
router.post('/look',(req,res)=>{
  let sql=`select * from menu where id=?`
  connection.query(sql,[req.body.id],(err,results)=>{
    if(err){
      throw err
    }else{
      res.send(results)

    }
  })
})

module.exports = router;

