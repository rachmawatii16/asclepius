const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');
const InputError = require('../exceptions/InputError'); 

async function postPredictHandler(request, h) {
    try {
        const { image } = request.payload;
        const { model } = request.server.app;

        const { label, suggestion } = await predictClassification(model, image);
        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();

        const data = {
            "id" : id,
            "result" : label,
            "suggestion" : suggestion,
            "createdAt" : createdAt
        };

        await storeData(id, data);

        const response = h.response({
            status: 'success',
            message: 'Model is predicted successfully',
            data,
        });
        response.code(201);
        return response;
    } catch (error) {
        throw new InputError('Terjadi kesalahan dalam melakukan prediksi', 400);
    }
}

module.exports = postPredictHandler;
