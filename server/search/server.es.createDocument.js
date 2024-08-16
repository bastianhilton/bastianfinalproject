import { client } from './server.client'

export const createDocument = (index, newDocument) => {
    client.index({
        index: index,
        body: ''
    }, function(error, response, status) {
        if (error) {
            console.log('error', error);
        } else {
            console.info('🚀 Created a New Document');
            console.info(response);
        }
    });

}