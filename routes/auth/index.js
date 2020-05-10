const router = require('express').Router();
const axios = require('axios');

const id = '***';
const secret = '***';

router.get('/', (req,res)=>{
   res.redirect(`https://oauth.yandex.ru/authorize?response_type=code&client_id=${id}`);
})

router.get('/callback', async (req,res)=>{
   const response = await axios.post(`https://oauth.yandex.ru/token`, `grant_type=authorization_code&code=${req.query.code}`, {
       headers: {
           'Content-type': 'application/x-www-form-urlencoded',
           'Authorization': `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`
       }
   });

   res.json(response.data);
})

router.get('/login', async (req,res)=>{
   const response = await  axios.get(`https://login.yandex.ru/info?format=json&oauth_token=${req.query.access_token}`);

   res.json(response.data)
})

module.exports = router;

