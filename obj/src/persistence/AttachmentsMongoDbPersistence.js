"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_mongoose_node_1 = require("pip-services3-mongoose-node");
const BlobAttachmentMongooseSchema_1 = require("./BlobAttachmentMongooseSchema");
class AttachmentsMongoDbPersistence extends pip_services3_mongoose_node_1.IdentifiableMongoosePersistence {
    constructor() {
        super('attachments', BlobAttachmentMongooseSchema_1.BlobAttachmentMongooseSchema());
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
            new: true,
            upsert: true
        };
        this._model.findOneAndUpdate(filter, data, options, (err, newItem) => {
            if (err != null)
                this._logger.trace(correlationId, "Added reference in %s to id = %s", this._collection, id);
            if (callback) {
                newItem = this.convertToPublic(newItem);
                callback(err, newItem);
            }
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
            new: true
        };
        this._model.findOneAndUpdate(filter, data, options, (err, newItem) => {
            if (err != null && newItem != null)
                this._logger.trace(correlationId, "Removed reference in %s from id = %s", this._collection, id);
            if (callback) {
                newItem = this.convertToPublic(newItem);
                callback(err, newItem);
            }
        });
    }
}
exports.AttachmentsMongoDbPersistence = AttachmentsMongoDbPersistence;
//# sourceMappingURL=AttachmentsMongoDbPersistence.js.map