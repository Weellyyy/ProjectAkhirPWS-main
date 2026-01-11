const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Middleware untuk validasi API Key
const validateApiKey = async (req, res, next) => {
    try {
        const apiKey = req.headers['x-api-key'];

        if (!apiKey) {
            return res.status(401).json({
                success: false,
                error: 'API Key diperlukan. Sertakan X-API-Key di header request.'
            });
        }

        // Cek apakah API key valid dan aktif
        const [apiKeys] = await db.query(
            'SELECT * FROM api_keys WHERE api_key = ? AND is_active = TRUE',
            [apiKey]
        );

        if (apiKeys.length === 0) {
            return res.status(401).json({
                success: false,
                error: 'API Key tidak valid atau sudah tidak aktif'
            });
        }

        // API Key valid, lanjutkan
        req.apiKeyData = apiKeys[0];
        next();
    } catch (error) {
        console.error('API Key validation error:', error);
        res.status(500).json({
            success: false,
            error: 'Terjadi kesalahan sistem'
        });
    }
};

// GET /api/concerts - Daftar semua konser (dengan filter & search)
router.get('/concerts', validateApiKey, async (req, res) => {
    try {
        const { genre, search } = req.query;
        let query = 'SELECT * FROM concerts WHERE 1=1';
        const params = [];

        // Filter by genre
        if (genre) {
            query += ' AND genre = ?';
            params.push(genre);
        }

        // Search by name or artist
        if (search) {
            query += ' AND (name LIKE ? OR artist LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }

        query += ' ORDER BY date ASC';

        const [concerts] = await db.query(query, params);

        res.json({
            success: true,
            data: concerts
        });
    } catch (error) {
        console.error('API concerts error:', error);
        res.status(500).json({
            success: false,
            error: 'Terjadi kesalahan sistem'
        });
    }
});

// GET /api/concerts/:id - Detail konser spesifik
router.get('/concerts/:id', validateApiKey, async (req, res) => {
    try {
        const concertId = req.params.id;

        const [concerts] = await db.query(
            'SELECT * FROM concerts WHERE id = ?',
            [concertId]
        );

        if (concerts.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Konser tidak ditemukan'
            });
        }

        res.json({
            success: true,
            data: concerts[0]
        });
    } catch (error) {
        console.error('API concert detail error:', error);
        res.status(500).json({
            success: false,
            error: 'Terjadi kesalahan sistem'
        });
    }
});

module.exports = router;
