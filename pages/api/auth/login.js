//función manejador de petición en este caso de login
import jwt from 'jsonwebtoken';
import {serialize} from 'cookie';

export default function loginHandler(req, res){
  const {email, password} = req.body;

  // check if email and password are valid

  // if email exist

  // if password is correct

  if(email === 'admin@local.local' && password === 'admin'){
    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      email: 'admin@local.local',
      username: 'fazt'
    }, 'secret')
    console.log('dentro del if')
    const serialized = serialize('myTokenName', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: '/'
    });
  
    res.setHeader('Set-Cookie', serialized);
    return res.json('login succesfully');
  }
  console.log('fuera del if')
  return res.status(401).json({
    error: 'invalid email or password'
  })

}