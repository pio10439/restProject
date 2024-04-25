/**
 * @swagger
 * /rates:
 *   get:
 *     summary: Get current exchange rates
 *     tags: [Exchange Rates]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               PLN: 4.20
 *               USD: 1.10
 *               EUR: 1.00
 *               CHF: 1.15
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
/**
 * @swagger
 * /convert:
 *   post:
 *     summary: Convert currency
 *     tags: [Currency Conversion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               sourceCurrency:
 *                 type: string
 *               targetCurrency:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               originalAmount: 100.00
 *               sourceCurrency: USD
 *               targetCurrency: EUR
 *               convertedAmount: 90.00
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 message: "Invalid request parameters"
 */
