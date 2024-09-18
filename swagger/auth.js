/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         username: "johndoe"
 *         password: "P@ss123456789"
 * 
 *     LoginResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: Status of the login process
 *         refresh_token:
 *           type: string
 *           description: JWT refresh token valid for 1 day
 *         access_token:
 *           type: string
 *           description: JWT access token valid for 1 minute
 *       example:
 *         status: true
 *         refresh_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: The status of the request
 *         message:
 *           type: string
 *           description: Error message
 *         errors:
 *           type: array
 *           items:
 *             type: string
 *           description: List of validation errors
 *       example:
 *         status: false
 *         message: Validation error
 *         errors:
 *           - Password is required
 *           - Password must be a string
 *           - Password must be at least 6 characters
 *           - Password must contain at least one number
 *           - Password must contain at least one uppercase letter
 *           - Password must contain at least one lowercase letter
 *           - Password must contain at least one special character
 * 
 *     RateLimitResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           description: The status of the request
 *         message:
 *           type: string
 *           description: Error message
 *       example:
 *         status: false
 *         message: Too many requests from this IP, please try again later.
 * 
 * 
 *   securitySchemes:
 *     RefreshToken:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * 
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       429:
 *         description: Too many requests, rate limit exceeded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RateLimitResponse'
 * 
 * /auth/refresh:
 *   post:
 *     summary: Refresh JWT token
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: The status of the request
 *                 refresh_token:
 *                   type: string
 *                   description: New JWT refresh token
 *                 access_token:
 *                   type: string
 *                   description: New JWT access token
 *               example:
 *                 status: true
 *                 refresh_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
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
 *         description: Invalid or expired Refresh token
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
 *                 message: Invalid or expired Refresh token
 *       429:
 *         description: Too many requests, rate limit exceeded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RateLimitResponse'
 *     security:
 *       - RefreshToken: []
 */
