let process = require('process');

import { ConfigParams } from 'pip-services-commons-node';

import { AttachmentsMongoDbPersistence } from '../../src/persistence/AttachmentsMongoDbPersistence';
import { AttachmentsPersistenceFixture } from './AttachmentsPersistenceFixture';

suite('AttachmentsMongoDbPersistence', ()=> {
    let persistence: AttachmentsMongoDbPersistence;
    let fixture: AttachmentsPersistenceFixture;

    setup((done) => {
<<<<<<< HEAD
        let config = YamlConfigReader.readConfig(null, './config/test_connections.yml', null);
        let dbConfig = config.getSection('mongodb');
=======
        var MONGO_DB = process.env["MONGO_DB"] || "test";
        var MONGO_COLLECTION = process.env["MONGO_COLLECTION"] || "attachments";
        var MONGO_SERVICE_HOST = process.env["MONGO_SERVICE_HOST"] || "localhost";
        var MONGO_SERVICE_PORT = process.env["MONGO_SERVICE_PORT"] || "27017";
        var MONGO_SERVICE_URI = process.env["MONGO_SERVICE_URI"];

        var dbConfig = ConfigParams.fromTuples(
            "collection", MONGO_COLLECTION,
            "connection.database", MONGO_DB,
            "connection.host", MONGO_SERVICE_HOST,
            "connection.port", MONGO_SERVICE_PORT,
            "connection.uri", MONGO_SERVICE_URI
        );
>>>>>>> c9366608932e4368a22dd0314d4541da567c4f64

        persistence = new AttachmentsMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new AttachmentsPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
            if (err == null) {
                persistence.clear(null, (err) => {
                    done(err);
                });
            } else {
                done(err);
            }
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });
});