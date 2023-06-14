const jwt =require('jsonwebtoken')
const crypto = require('crypto');

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

async function jwtSign(data){
   let token=await jwt.sign({data:data},privateKey,{ algorithm: 'RS256' })
  
return token
}

async function jwtVerify(token){
    let tokens=await jwt.verify(token,publicKey,{ algorithm: ['RS256'] })
   
 return tokens
 }
module.exports={jwtSign,jwtVerify}