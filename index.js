Hapi = require('@hapi/hapi');

const schemas = require('./utilities/schemas');
const errors = require('./utilities/errors');
const success = require('./utilities/success');

const mockDataStorage = {} // Dictionary storage => Note: Data should go into a permanent storage like DynamoDB

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });


    server.route({
        method: 'GET',
        path: '/jobs',
        handler: (request, h) => {
            // Convert ISO date to time to compare and sort job entries in descending order
            return Object.values(mockDataStorage).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

        }
    });

    server.route({
        method: 'GET',
        path: '/jobs/{id}',
        handler: (request, h) => {
            if (mockDataStorage[request.params.id]) {
                return mockDataStorage[request.params.id]
            }
            const errorMessage = errors.generateErrorMessage(`Did not find job id ${request.params.id}`, 404)
            return errorMessage;
        }
    });

    server.route({
        method: 'DELETE',
        path: '/jobs/{id}',
        handler: (request, h) => {
            if (mockDataStorage[request.params.id]) {
                delete mockDataStorage[request.params.id];
                const successfulJobMsg = success.generateSuccessMessage(`Job id: ${request.params.id} is successfully deleted!`, 204)
                return successfulJobMsg;
            }
            const errorMessage = errors.generateErrorMessage(`Did not find job id ${request.params.id}`, 404)
            return errorMessage;
        }
    });

    server.route({
        method: 'PATCH',
        path: '/jobs/{id}',
        handler: async (request, h) => {
            if (mockDataStorage[request.params.id]) {
                try {
                    const payload = request.payload;
                    const value = await schemas.patchJobSchema.validateAsync(payload);

                    const keys = Object.keys(value);
                    keys.forEach((key, index) => {
                        mockDataStorage[request.params.id][key] = value[key]
                    });
                    console.log(value);
                    const successfulJobMsg = success.generateSuccessMessage(`Job id: ${request.params.id} is successfully patched!`)
                    return successfulJobMsg;
                }
                catch (err) {
                    const errorMessage = errors.generateErrorMessage(err, 400)
                    return errorMessage;
                }
            }
            const errorMessage = errors.generateErrorMessage(`Did not find job id ${request.params.id}`, 404)
            return errorMessage;
        }
    });

    server.route({
        method: 'POST',
        path: '/jobs',
        options: {
            auth: false,
        },
        handler: async (request, h) => {

            const payload = request.payload;
            payload.createdAt = request.payload.createdAt || new Date().toISOString();
            try {
                const value = await schemas.jobSchema.validateAsync(payload);
                mockDataStorage[value.id] = value; // store into dictionary data struct as key - value pairs
                console.log(mockDataStorage)
                const successfulJobMsg = success.generateSuccessMessage(`Job id: ${payload.id} is successfully stored!`)
                return successfulJobMsg;
            }
            catch (err) {
                const errorMessage = errors.generateErrorMessage(err, 400)
                return errorMessage;
            }


        },
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();