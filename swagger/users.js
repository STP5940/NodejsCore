/**
 * @swagger
 * components:
 *   securitySchemes:
 *     AccessToken:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * /api/v1/users/example:
 *   get:
 *     summary: Example
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Successful response with user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: The status of the request
 *                 message:
 *                   type: string
 *                   description: Response message
 *                 username:
 *                   type: string
 *                   description: Username
 *               example:
 *                 status: true
 *                 message: "Show Success"
 *                 username: "johndoe"
 *       400:
 *         description: Invalid Authorization header
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: The status of the request
 *                 message:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 status: false
 *                 message: Invalid Authorization header
 *       401:
 *         description: Invalid or expired Access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: The status of the request
 *                 message:
 *                   type: string
 *                   description: Error message
 *               example:
 *                 status: false
 *                 message: Invalid or expired Access token
 *       429:
 *         description: Too many requests, rate limit exceeded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RateLimitResponse'
 *     security:
 *       - AccessToken: []
 */
