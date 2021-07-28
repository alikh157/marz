import check from 'string-sanitizer' ;


export const studentLoginSanitization = (req, res, next) => {
    req.body.username = check.sanitize(req.body.username);
}
export const adminLoginSanitization = (req, res, next) => {
    console.log("---adminLoginSanitization---")
    req.body.adminUsername = check.sanitize(req.body.adminUsername);
    next()
}
export const teacherLoginSanitization = (req, res, next) => {
    console.log("---teacherLoginSanitization---")
    req.body.teacherUsername = check.sanitize(req.body.teacherUsername);
    next()
}
export const teacherRegisterSanitization = (req, res, next) => {
    console.log("---teacherRegisterSanitization---")
    req.body.teacherName = check.sanitize(req.body.teacherName);
    req.body.teacherUsername = check.sanitize(req.body.teacherUsername);
    req.body.teacherFamily = check.sanitize(req.body.teacherFamily);
    req.body.teacherAddress = check.sanitize.keepSpace(req.body.teacherAddress);
    req.body.teacherInfo = check.sanitize.keepSpace(req.body.teacherInfo);
    console.log(req.body)
    next()
}