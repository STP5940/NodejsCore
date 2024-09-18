const { check, validationResult } = require('express-validator');

class Validator {

    // ฟังก์ชันช่วยสำหรับตรวจสอบฟิลด์ Infinity
    static StringRequired(fieldName, minLength = 1, maxLength = 255) {
        return [
            check(fieldName)
                .notEmpty().withMessage(`${fieldName} is required`)
                .isString().withMessage(`${fieldName} must be a string`)
                .isLength({ min: minLength }).withMessage(`${fieldName} must be at least ${minLength} characters`)
                .isLength({ max: maxLength }).withMessage(`${fieldName} must be at most ${maxLength} characters`)
                .escape() // ทำความสะอาด HTML entities เพื่อป้องกัน XSS
                .trim(), // ลบช่องว่างหน้าหลัง
        ];
    }

    // ฟังก์ชันช่วยสำหรับตรวจสอบชื่อผู้ใช้
    static usernameRequired() {
        return [
            check('username')
                .notEmpty().withMessage('Username is required')
                .isString().withMessage('Username must be a string')
                .isLength({ min: 3 }).withMessage('Username must be at least 3 characters')
                .isLength({ max: 50 }).withMessage('Username must be at most 50 characters')
                .matches(/^[a-zA-Z0-9@._-]+$/).withMessage('Username can only contain letters, numbers, and underscores')
        ];
    }

    // ฟังก์ชันช่วยสำหรับตรวจสอบรหัสผ่าน
    static passwordRequired() {
        return [
            check('password')
                .notEmpty().withMessage('Password is required')
                .isString().withMessage('Password must be a string')
                .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
                .matches(/[0-9]/).withMessage('Password must contain at least one number')
                .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
                .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
                .matches(/[@$!%*?&#]/).withMessage('Password must contain at least one special character')
        ];
    }

    // Method สำหรับตรวจสอบ validation
    static validationResult(req, res, next) {
        // ตรวจสอบผลลัพธ์ของการ validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                message: 'Validation error',
                errors: errors.array().map(err => err.msg)
            });
        }
        next(); // ข้อมูลถูกต้อง ให้ดำเนินการต่อไป
    }
}

module.exports = Validator;
