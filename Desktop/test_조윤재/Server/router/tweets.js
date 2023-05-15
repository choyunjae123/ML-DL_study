import express from 'express';
import * as tweetController from '../controller/tweet.js';
import { isAuth } from '../middleware/auth.js';
const router = express.Router();

// 1번 연계
router.post('/', isAuth, tweetController.register);

//2번 연계
router.get('/student', isAuth, tweetController.showGrade);

//3번 연계
router.put('/student:id', isAuth, tweetController.update);

//4번 연계
router.delete('/student:id', isAuth, tweetController.deleted);

//5번 연계
router.get('/student', isAuth, tweetController.showByStudentNum);

//6번 연계
router.post('/student', isAuth, tweetController.registerGrade);

//7번 연계
router.put('/student:id', isAuth, tweetController.updateGrade);

//8번 연계
router.delete('/student:id', isAuth, tweetController.deleteGrade);


export default router;    // router를 출력







