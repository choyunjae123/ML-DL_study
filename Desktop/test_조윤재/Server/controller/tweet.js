import * as tweetRepository from '../data/tweet.js';    // data의 tweet에서 전체 내용을 tweetRepository로 가져옴.

// ===================================================================================

// 1번 연계
export async function register(req, res, next){
    const id = req.body.id;
    const data = await tweetRepository.registerStudent(id);
    res.status(201).json(data);
}

// 2번 연계
export async function showGrade(req, res, next){
    const id = req.params.id;
    const data = await tweetRepository.findGrade(id);
        if(data){
            res.status(200).json(data);
        }else{
            res.status(404).json({message: `id (${id}) not found` })
        }
}


//3 번 연계
export async function update(req, res, next){
    const id = req.params.id;
    const text = req.body.text;
    const data = await tweetRepository.updateStudentInfo(id); 
    if(!data){
        res.status(404).json({message: `id (${id}) not found` })
    }
    if(data.userId !== req.userId){
        return res.sendStatus(403);  
    }
    const updated = await tweetRepository.update(id, text);
    res.status(200).json(updated); 
}


// 4번 연계
export async function deleted(req,res,next){
    const id = req.params.id;
    const data = await tweetRepository.deleteStudent(id); 
    if(!data){
        res.status(404).json({message: `id (${id}) not found` })
    }
    if(data.userId !== req.userId){
        return res.sendStatus(403);  
    }
    await tweetRepository.remove(id);
    res.sendStatus(204);
}


// 5번 연계
export async function showByStudentNum(req, res, next){
    const id = req.params.id;
    const data = await tweetRepository.findById(id);
        if(data){
            res.status(200).json(data);
        }else{
            res.status(404).json({message: `id (${id}) not found` })
        }
}


// 6번 연계
export async function registerGrade(req, res, next){
    const {text} = req.body;
    const data = await tweetRepository.registerStudentGrades(text, req.userId);
    res.status(201).json(data);
}

// 7번 연계
export async function updateGrade(req, res, next){
    const id = req.params.id;
    const text = req.body.text;
    const data = await tweetRepository.updateStudentGrades(id); 
    if(!data){
        res.status(404).json({message: ` id (${id}) not found` })
    }
    if(data.userId !== req.userId){
        return res.sendStatus(403);  
    }
    const updated = await tweetRepository.update(id, text);
    res.status(200).json(updated); 
}

// 8번 연계
export async function deleteGrade(req,res,next){
    const id = req.params.id;
    const data = await tweetRepository.deleteStudentGrades(id); 
    if(!data){
        res.status(404).json({message: `id (${id}) not found` })
    }
    if(data.userId !== req.userId){
        return res.sendStatus(403); 
    }
    await tweetRepository.remove(id);
    res.sendStatus(204);
}