import { Error as errorSerializer } from "jsonapi-serializer";
import errorLogs from "../models/errorLogs";
export default (error, req, res, next) => {
    let type;
    console.log(error)
    switch (error.title) {
        case "ValueError":
            type = "validationError.";
            break;
        case "MongoError":
            type = "databaseError.";
            break;
        case "EmailError":
            type = "sendMailError.";
            break;
        case "TooManyRequest":
            type = "sendManyRequest.";
            break;
        case "IpError":
            type = "requestFrontendIpError.";
            break;
    }
    errorLogs.create(
        {
            type: type,
            title: error.title,
            code: error.code,
            ip: req.connection.remoteAddress,
            details: error.details,
            status: error.status,
            source: {
                pointer: "/contact",
                parameter: "input",
            },
        },
        (error, info) => (error ? next(error) : next())
    );
    res.status(error.status ? error.status : 500).json(
        new errorSerializer(error)
    );
};
