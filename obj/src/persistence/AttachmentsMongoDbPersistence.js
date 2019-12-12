"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_mongodb_node_1 = require("pip-services3-mongodb-node");
class AttachmentsMongoDbPersistence extends pip_services3_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('attachments');
    }
    addReference(correlationId, id, reference, callback) {
        let filter = {
            _id: id
        };
        let data = {
            $addToSet: {
                references: {
                    id: reference.id,
                    type: reference.type,
                    name: reference.name
                }
            }
        };
        let options = {
            returnOriginal: false,
            returnNewDocument: true,
            upsert: true
        };
        this._collection.findOneAndUpdate(filter, data, options, (err, result) => {
            let newItem = result ? this.convertToPublic(result.value) : null;
            if (err != null && newItem != null)
                this._logger.trace(correlationId, "Added reference in %s to id = %s", this._collection, id);
            if (callback)
                callback(err, newItem);
        });
    }
    removeReference(correlationId, id, reference, callback) {
        let filter = {
            _id: id
        };
        let data = {
            $pull: {
                references: {
                    id: reference.id,
                    type: reference.type
                }
            }
        };
        let options = {
            returnOriginal: false,
            returnNewDocument: true
        };
        this._collection.findOneAndUpdate(filter, data, options, (err, result) => {
            let newItem = result ? this.convertToPublic(result.value) : null;
            if (err != null && newItem != null)
                this._logger.trace(correlationId, "Removed reference in %s from id = %s", this._collection, id);
            if (callback)
                callback(err, newItem);
        });
    }
}
exports.AttachmentsMongoDbPersistence = AttachmentsMongoDbPersistence;
//# sourceMappingURL=AttachmentsMongoDbPersistence.js.map