const crypto = require('crypto');

// การใช้งานตัวอย่าง
// const { key, iv } = AESCrypto.generateKeyAndIV();
// const cryptoInstance = new AESCrypto(key, iv);

// const encryptedText = cryptoInstance.encryptText('Hello World!');
// console.log('Encrypted:', encryptedText);

// const decryptedText = cryptoInstance.decryptText(encryptedText);
// console.log('Decrypted:', decryptedText);

class AESCrypto {
    constructor(key = process.env.SECURITY_KEY, iv = process.env.SECURITY_IV) {
        // กำหนดคีย์และ IV สำหรับการเข้ารหัส
        this.key = Buffer.from(key, 'hex');
        this.iv = Buffer.from(iv, 'hex');
    }

    /**
     * สร้าง key และ iv สุ่มสำหรับการเข้ารหัส AES-256
     * @returns {object} - วัตถุที่ประกอบด้วย key และ iv
     */
    static generateKeyAndIV() {
        const key = crypto.randomBytes(32)?.toString('hex'); // สร้าง key 32 bytes = 256 bits
        const iv = crypto.randomBytes(16)?.toString('hex');  // สร้าง IV สุ่มขนาด 16 bytes = 128 bits
        return { key, iv };
    }

    /**
     * เข้ารหัสข้อความโดยใช้วิธีการ AES-256-CBC
     *
     * @param {string} text - ข้อความที่ต้องการเข้ารหัส
     * @returns {string} ข้อความที่เข้ารหัสแล้วในรูปแบบ hex
     */
    encryptText(text) {
        if (!text) {
            console.error('Text to encrypt is undefined or null');
            return undefined;
        }

        const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        return encrypted;
    }

    /**
     * ถอดรหัสข้อความที่ถูกเข้ารหัสด้วยวิธีการ AES-256-CBC
     *
     * @param {string} encryptedText - ข้อความที่เข้ารหัสแล้วในรูปแบบ hex
     * @returns {string} ข้อความที่ถูกถอดรหัส
     */
    decryptText(encryptedText) {
        if (!encryptedText) {
            console.error('Encrypted text is undefined or null');
            return undefined;
        }

        const decipher = crypto.createDecipheriv('aes-256-cbc', this.key, this.iv);

        try {
            let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
            decrypted += decipher.final('utf8');

            return decrypted;
        } catch (error) {
            console.error('Error decrypting text:', error);
            return undefined;
        }
    }
}


module.exports = AESCrypto;