
// การใช้งานตัวอย่าง
// const dateTime = new DateTime();

// console.log(dateTime.formatDate());
// console.log(dateTime.formatDate("DD-MM-YYYY"));

class DateTime {
    /**
     * คืนค่าวันที่ในรูปแบบที่ระบุ
     *
     * @param {string} [_format="YYYYMMDDHHmmss"] - รูปแบบของวันที่ที่ต้องการ (ค่าเริ่มต้นคือ "YYYYMMDDHHmmss")
     * @returns {string} วันที่ในรูปแบบที่ระบุ
     */
    formatDate(_format = "YYYYMMDDHHmmss") {
        const now = new Date();
        const formattedDate = moment(now).format(_format);

        return formattedDate;
    }

    /**
     * แปลงวันที่และเวลาให้อยู่ในรูปแบบ ISO-8601
     *
     * @param {Date} _DateTime - วันที่และเวลาที่ต้องการแปลง
     * @returns {string} วันที่และเวลาในรูปแบบ ISO-8601
     */
    formatDateSave(_DateTime) {
        const formattedDateTime = _DateTime.toISOString(); // ใช้ฟังก์ชัน toISOString() เพื่อรับวันที่และเวลาในรูปแบบ ISO-8601

        return formattedDateTime;
    };

    /**
     * คืนค่าปีจากข้อมูลที่ระบุ
     *
     * @param {Date} _DateTime - วันที่และเวลาที่ต้องการดึงปี
     * @returns {string} ปีในรูปแบบ "YYYY"
     */
    getYear(_DateTime) {
        const now = _DateTime;
        const dateStringWithTime = moment(now).format("YYYY");

        return dateStringWithTime;
    };


    /**
     * แปลง UNIX timestamp เป็นวันที่และเวลาที่อ่านได้ง่าย
     *
     * @param {number} _unixTimestamp - _unixTimestamp ที่ต้องการแปลง
     * @returns {string} เดือนในรูปแบบภาษาอังกฤษ
     *
     * @example
     * ตัวอย่างการใช้งาน
     * fromUnixTimestamp(new Date().getTime());
     * fromUnixTimestamp(1688619561388);
     */
    fromUnixTimestamp(_unixTimestamp) {
        const date = new Date(_unixTimestamp);
        const months = [
            "Jan", "Feb", "Mar",
            "Apr", "May", "Jun",
            "Jul", "Aug", "Sep",
            "Oct", "Nov", "Dec",
        ];

        const year = date.getFullYear();
        const month = months[date.getMonth()];
        const day = date.getDate();
        const hour = date.getHours();
        const min = date.getMinutes();
        const sec = date.getSeconds();

        return `${day} ${month} ${year} ${hour}:${min}:${sec}`;
    };


    /**
     * แปลงสตริงวันที่เป็นรูปแบบวันที่ในภาษาไทย
     *
     * @param {string} _dateStr - สตริงวันที่ ที่ต้องการแปลง
     * @returns {string} รูปแบบเดือนในภาษาไทย
     */
    toThaiDate(_dateStr) {
        const date = new Date(_dateStr);

        const monthNamesThai = [
            "มกราคม", "กุมภาพันธ์", "มีนาคม",
            "เมษายน", "พฤษภาคม", "มิถุนายน",
            "กรกฎาคม", "สิงหาคม", "กันยายน",
            "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
        ];

        const day = date.getDate();
        const month = monthNamesThai[date.getMonth()];
        const year = date.getFullYear();

        return day + " " + month + " " + year;
    };


    /**
     * แปลงสตริงวันที่เป็นรูปแบบวันที่และเวลาในภาษาไทย
     *
     * @param {string} _dateStr - สตริงวันที่ ที่ต้องการแปลง
     * @param {boolean} [_short=false] - กำหนดว่าจะแสดงชื่อเดือนแบบย่อหรือไม่ (ค่าเริ่มต้นคือแบบเต็ม)
     * @returns {string} เดือนในภาษาไทยแบบย่อ หรือแบบเต็ม
     */
    toThaiDateTime(dateStr, short = false) {
        const date = new Date(dateStr);
        const monthNamesThai = short
            ? ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."]
            : ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

        const day = date.getDate();
        const month = monthNamesThai[date.getMonth()];
        const year = date.getFullYear();
        const hour = date.getHours();
        const min = date.getMinutes();
        const sec = date.getSeconds();
        return `${day} ${month} ${year} ${hour}:${min}:${sec}`;
    }
}

module.exports = DateTime;