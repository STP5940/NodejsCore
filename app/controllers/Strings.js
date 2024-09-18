class Strings {
    /**
     * สร้างสตริงสุ่มตามความยาวที่ระบุ
     *
     * @param {number} length - ความยาวของสตริงที่ต้องการสร้าง (ค่าเริ่มต้นคือ 10)
     * @returns {string} สตริงสุ่มที่สร้างขึ้น
     */
    static random(length = 10) {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }
}

module.exports = Strings;