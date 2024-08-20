const crypto = require('crypto');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, '../config/', 'id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

class JwtHelper {
    /** Decrypt the hash using the salt and then compares the decrypted
     *  hash/salt with the password that the user provided at login.
     * 
     * @param {*} password - The plain text password
     * @param {*} hash - The hash stored in the database
     * @param {*} salt - The salt stored in the database
     */
    static ValidPassword(password, hash, salt) {
        const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
        return hash === hashVerify;
    }

    /** Generate a salt and hash out of a plain text password.
     * 
     * @param {*} password - The password string that the user inputs to the password field in the register form.
     */
    static GenPassword(password) {
        const salt = crypto.randomBytes(32).toString('hex');
        const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

        return {
            salt: salt,
            hash: genHash
        };
    }

    /** Issue a JWT token whit the 
     * @param {*} user - The user object.
     */
    static IssueJWT(user) {
        const expiresIn = '1d';
    
        const payload = {
            sub: user.id,
            iat: Date.now(),
            nombre: user.nombre,
            email: user.email,
            rol: user.rol,
        };
    
        const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });
    
        return {
            token: "Bearer " + signedToken,
            expires: expiresIn
        }
    }

    /** Desencrypt the token.
     * 
     * @param {*} token - The encrypted token
     */
    static DecodeToken(token) {
        return jsonwebtoken.decode(token, { complete: true });
    }
}
module.exports = { JwtHelper };