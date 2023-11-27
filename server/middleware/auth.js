import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;
        // if user signed in manually we use this
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test')
            req.userId = decodedData?.id
        } else {
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub
        }
        // if user signed in by google... sub is google's token
        next()
    } catch (error) {
        console.log(error)
    }
}

export default auth;