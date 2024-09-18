const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); // ใช้ uuid เพื่อสร้าง JTI ที่เป็นเอกลักษณ์
const MsgError = require("./MsgError");

class JwtService {
    constructor(options = {}) {
        this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
        this.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        this.options = { algorithm: 'HS512', ...options }; // algorithm set to HS512
        this.tokenVerifyCount = {}; // เก็บจำนวนการ verify สำหรับแต่ละ token
    }

    /**
     * สร้าง Access Token (Method to create an Access Token)
     * 
     * @param {object} payload - ข้อมูลที่ต้องการใส่ใน token
     * @param {string} [expiresIn='1m'] - ระยะเวลาหมดอายุของ token (ค่าเริ่มต้นคือ 1 นาที)
     * @returns {string} - Access Token ที่ถูกสร้าง
     */
    createAccessToken(payload, expiresIn = '1m') {
        return jwt.sign(payload, this.accessTokenSecret, { expiresIn, ...this.options });
    }

    /**
     * สร้าง Refresh Token (Method to create a RefreshToken)
     * 
     * @param {object} payload - ข้อมูลที่ต้องการใส่ใน token
     * @param {string} [expiresIn='1h'] - ระยะเวลาหมดอายุของ token (ค่าเริ่มต้นคือ 1 ชั่วโมง)
     * @returns {string} - Refresh Token ที่ถูกสร้าง
     */
    createRefreshToken(payload, expiresIn = '1h') {
        const jti = uuidv4(); // สร้าง JTI ที่ไม่ซ้ำกัน
        const tokenPayload = { jti, ...payload }; // เพิ่ม jti ลงใน payload
        return jwt.sign(tokenPayload, this.refreshTokenSecret, { expiresIn, ...this.options });
    }

    /**
     * ตรวจสอบ Access Token (Method to verify an Access Token)
     * 
     * @param {string} bearerToken - Token ในรูปแบบ Bearer
     * @returns {object} - ข้อมูลที่ถูก decode จาก token
     * @throws {MsgError} - Error เมื่อ token ไม่ถูกต้องหรือหมดอายุ
     */
    verifyAccessToken(bearerToken) {
        if (typeof bearerToken !== 'string' || !bearerToken.startsWith('Bearer ')) {
            throw new MsgError('Invalid Authorization header', 400);
        }

        try {
            // เอา Bearer และช่องว่างออก
            const token = bearerToken.replace('Bearer ', '');
            const decoded = jwt.verify(token, this.accessTokenSecret);
            return decoded;
        } catch (error) {
            throw new MsgError('Invalid or expired Access Token', 401);
        }
    }

    /**
     * ตรวจสอบ Refresh Token (Method to verify a RefreshToken)
     * 
     * @param {string} bearerToken - Token ในรูปแบบ Bearer
     * @returns {object} - ข้อมูลที่ถูก decode จาก token
     * @throws {MsgError} - Error เมื่อ token ไม่ถูกต้องหรือหมดอายุ
     */
    verifyRefreshToken(bearerToken) {
        
        if (typeof bearerToken !== 'string' || !bearerToken.startsWith('Bearer ')) {
            throw new MsgError('Invalid Authorization header', 400);
        }

        try {
            // เอา Bearer และช่องว่างออก
            const token = bearerToken.replace('Bearer ', '');
            const decoded = jwt.verify(token, this.refreshTokenSecret);
            const { jti } = decoded; // ตรวจสอบ jti จาก decoded payload

            // ถ้ามีการตรวจสอบ token นั้นๆ ครบ 1 ครั้งแล้ว ให้ถือว่า token หมดอายุ
            if (!jti || this.tokenVerifyCount[jti] >= 1) {
                throw new MsgError('Invalid or expired Refresh token', 401);
            }

            // เพิ่มจำนวนการ verify สำหรับ token นั้นๆ
            if (!this.tokenVerifyCount[jti]) {
                this.tokenVerifyCount[jti] = 0;
            }

            // เพิ่มจำนวนครั้ง verify
            this.tokenVerifyCount[jti]++;

            return decoded;
        } catch (error) {
            throw new MsgError('Invalid or expired Refresh token', 401);
        }
    }

    /**
     * Decode token โดยไม่ทำการ verify (Method to decode a token)
     * 
     * @param {string} token - Token ที่ต้องการ decode
     * @returns {object} - ข้อมูลที่ถูก decode จาก token
     */
    decodeToken(token) {
        return jwt.decode(token);
    }

    /**
     * คืนค่าจำนวนการ verify ของ jti นั้นๆ
     * 
     * @param {string} jti - JTI ที่ต้องการตรวจสอบจำนวนการ verify
     * @returns {number} - จำนวนครั้งที่ถูก verify
     */
    getRefreshTokenVerifyCount(jti) {
        return this.tokenVerifyCount[jti] || 0; // ถ้า jti ไม่ถูกตรวจสอบ จะคืนค่า 0
    }
}

module.exports = JwtService;
