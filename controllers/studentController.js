import Student from '../models/students' ;

export const studentRegister = async (req, res, next) => {
    console.log("<__studentRegister__>");

    try {
        const {
            studentName,
            studentPhoneNumber,
            studentEmail,
        } = req.body;

        Student.create({
            studentName,
            studentPhoneNumber,
            studentEmail
        }, (error) => {
            error ? next(error) : res.status(200).send();
        })
    } catch (e) {
        next(e)
    }
}
