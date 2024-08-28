import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    let authHeader = req.headers['authorization'];
    console.log(authHeader)
    try {
        if(!authHeader) {
            res.status(401).json({ msg: 'Token is required' })
        }
        const token = authHeader.split(' ')[1];
        console.log(token)

        const user = await jwt.verify(token)

        req.user = user

        next()
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
    
}

export default auth;