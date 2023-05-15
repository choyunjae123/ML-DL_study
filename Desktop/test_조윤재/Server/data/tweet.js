import SQ from 'sequelize' // sequelize 모듈 사용
import { sequelize } from '../db/database.js'; // database.js파일의 sequelize 매개변수 사용.

const DataTypes = SQ.DataTypes // datatypes라는 매개변수를 sequelize의 메서드를 이용하여 사용.

// 학생 테이블 필드 생성
export const Student = sequelize.define('student', {
    id: {
        type: DataTypes.INTEGER, // 일렬번호(자동증가) 생성
        autoIncrement: true,
        primaryKey: true
    },
    studentNumber: {
        type: DataTypes.STRING  // 학번(문자열) 생성
    },
    name: {
        type: DataTypes.STRING   // 이름(문자열) 생성
    },
    contact: {
        type: DataTypes.STRING   // 연락처(문자열) 생성
    },
    email: {
        type: DataTypes.STRING   // 이메일 생성
    },
    address: {
        type: DataTypes.STRING   // 주소(문자열) 생성
    },
    registeredDate: {
        type: DataTypes.DATE,   // 등록된 날짜 생성
        defaultValue: DataTypes.NOW
    },
},
    { timestamps: false, } // timestamp로 등록시간 조정
);

// 성적 테이블 필드 생성
export const Grade = sequelize.define('grade', {
    id: {
        type: DataTypes.INTEGER,  // 일렬번호(숫자) 생성
        autoIncrement: true,
        primaryKey: true
    },
    javaScore: {
        type: DataTypes.STRING   // 자바점수(숫자) 생성
    },
    pythonScore: {
        type: DataTypes.STRING  // 파이썬점수(숫자) 생성
    },
    cScore: {
        type: DataTypes.STRING   // C언어점수(숫자) 생성
    },
    registeredDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW  // 등록된 날짜 생성
    },
    totalScore: {
        type: DataTypes.STRING   // 총점(숫자) 생성
    },
    averageScore: {
        type: DataTypes.STRING  // 평균(숫자) 생성
    },
},    { timestamps: false, }  // timestamp로 등록시간 조정
);

Student.belongsTo(Grade);  // student와 grade의 join



 // join했을 때 보고싶은것만 뽑아오는 목록을 새롭게 정의.
const INCLUDE_USER = {
    attributes: [
        ['id'],
        ['studentNumber'],
        ['name'],
        [sequelize.col('grade.javaScore'), 'javaScore'],
        [sequelize.col('grade.pythonScore'), 'pythonScore'],
        [sequelize.col('grade.cScore'), 'cScore'],        
        [sequelize.literal('RANK() OVER (ORDER BY Grade.averageScore DESC'), 'rank'],
    ],
    include: {         
        model: Student,
        attributes: [],
    }
}

 // 다음 필터인 학번을 기준으로 내림차순으로 가져옴.
const ORDER_DESC = {     
    order: [['studentNumber', 'DESC']]
}

// ===================================================================================

// 1번 문제. 학생을 등록한다. (10점)
export async function registerStudent(user){
    return Student.create(user).then((data)=>data.datavalues.id);
}

// 2. 학생의 등록된 정보를 성적(평균)으로 내림차순으로 출력한다. (10점)
// (단, 학생의 점수를 출력한다. 등록된 학생의 전체 수와 해당 학생의 석차를 같이 출력한다. 동점인 경우 학번으로 내림차순으로 함)
export async function findGrade() {
    return INCLUDE_USER.findOne({where:{id}})
}

// 3. 학생정보를 수정한다. (10점)
export async function updateStudentInfo(id) {
    return Student.update(id).then((data)=>data.datavalues.id)
}


// 4. 학생정보를 삭제한다. 학생정보를 삭제할 경우 점수도 같이 삭제한다. (10점)
export async function deleteStudent() {
    return Student.destroy();
}


// 5. 학번으로 검색한다. (10점) (단, 학생의 점수를 출력한다.)
export async function findById(id) {
    return INCLUDE_USER.findOne({where:{id}})
}


// 6. 학생점수를 등록한다. 점수를 등록할 때 총점, 평균을 계산하여 같이 저장한다. (10점)
export async function registerGrade(user){
    return Grade.create(user)
    .then((data)=>data.datavalues.id)
    .then(totalScore, averageScore)
}


// 7. 학생점수를 수정한다. 점수를 수정할 경우 총점, 평균을 계산하여 같이 저장한다. (10점)
export async function updateGrade(id) {
    return Grade.update(id)
    .then((data)=>data.datavalues.id)
    .then(totalScore, averageScore)
}



// 8. 학생점수를 삭제한다. (10점)
export async function deleteGrade() {
    return Grade.destroy();
}

// ===================================================================================
