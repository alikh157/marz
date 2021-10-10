import check from 'string-sanitizer' ;


export const studentRegisterSanitization = (req,res,next) =>{
    console.log("studentRegisterSanitization");
    req.body.studentName = check.sanitize(req.body.studentName);
    next();
}

export const adminLoginSanitization = (req, res, next) => {
    console.log("---adminLoginSanitization---")
    req.body.adminUsername = check.sanitize(req.body.adminUsername);
    next()
}