import { Router } from "express";
import { createTable, createUser, updateUser, login, verifyEmail } from './Controller/Pessoa.js';

const router = Router();

router.post('/login', login);
router.post('/createUser', createUser); 
router.post('/updateUser', updateUser);  
router.post('/verifyEmail', verifyEmail); 

export default router;