const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');
const InputError = require('../exceptions/InputError');
const getAllData = require('../services/getAllData');

async function postPredictHandler(request, h) {
    try {
        const { image } = request.payload;
        const { model } = request.server.app;

        const { label, suggestion } = await predictClassification(model, image);

        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();

        const data = {
            id,
            result: label,
            suggestion,
            createdAt
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
        throw new InputError('Terjadi kesalahan dalam melakukan prediksi');
    }
}

async function postPredictHistoriesHandler(request, h) {
    try {
        const allData = await getAllData();

        const formatAllData = allData.map(doc => ({
            id: doc.id,
            history: {
                result: doc.result,
                createdAt: doc.createdAt,
                suggestion: doc.suggestion,
                id: doc.id
            }
        }));

        const response = h.response({
            status: 'success',
            data: formatAllData
        });
        response.code(200);
        return response;
    } catch (error) {
        throw new InputError('Terjadi kesalahan dalam mengambil riwayat prediksi');
    }
}

module.exports = {
    postPredictHandler,
    postPredictHistoriesHandler
};
