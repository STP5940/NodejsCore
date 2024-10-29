// Filename: T_Example.js 
// Created time: 20-09-2024 15:20:00

const database = require("../Connection");
const DateTime = require("../DateTime");

class T_Example {

    // R => get Or getById
    // C => create
    // U => update
    // D => delete

    async get() {
        try {

            let result = await database.query(
                "ACCOUNTAUDIT",
                `
                SELECT
                    Column1, Column2
                FROM 
                    Example
                `
            );

            if (result.rowsAffected > 0) {
                return result.recordsets[0]
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Get Example Failed');
        }
    }

    async getById(_id) {
        try {
            const sqlParams = [
                { name: "id", value: _id }
            ];

            let result = await database.query(
                "ACCOUNTAUDIT",
                `
                SELECT
                    Column1, Column2
                FROM
                    Example 
                WHERE
                    id = @id
                `,
                sqlParams
            );

            if (result.rowsAffected > 0) {
                return result.recordsets[0]
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Get By ID Example Failed');
        }
    }

    async create(_data) {
        try {
            const sqlParams = [
                ...Object.keys(_data).map(key => ({ name: key, value: _data[key] })),

                { name: "created_at", value: DateTime.Formatdatesave(new Date()) }
            ];

            let result = await database.query(
                "ACCOUNTAUDIT",
                `
                INSERT INTO Example
                    (Column1, Column2, Column3)
                VALUES
                    (@Column1, @Column2, @Column3)
                `,
                sqlParams
            );

            return result;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Create Example Failed');
        }
    }

    async update(_id, _data) {
        try {
            const sqlParams = [
                { name: "id", value: _id },

                ...Object.keys(_data).map(key => ({ name: key, value: _data[key] })),

                { name: "updated_at", value: DateTime.Formatdatesave(new Date()) }
            ];

            let result = await database.query(
                "ACCOUNTAUDIT",
                `
                UPDATE
                    Example 
                SET
                    Column1 = @Column1, 
                    Column2 = @Column2
                WHERE
                    id = @id
                `,
                sqlParams
            );

            return result;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Update Example Failed');
        }
    }

    async delete(_id, _data) {
        try {
            const sqlParams = [
                { name: "id", value: _id },

                ...Object.keys(_data).map(key => ({ name: key, value: _data[key] })),

                { name: "deleted_at", value: DateTime.Formatdatesave(new Date()) }
            ];

            let result = await database.query(
                "ACCOUNTAUDIT",
                `
                DELETE
                FROM 
                    Example 
                WHERE
                    id = @id
                `,
                sqlParams
            );

            return result;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Delete Example Failed');
        }
    }
}

module.exports = T_Example;