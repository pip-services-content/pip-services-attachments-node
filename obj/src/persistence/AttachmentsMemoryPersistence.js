"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_data_node_1 = require("pip-services3-data-node");
const BlobAttachmentV1_1 = require("../data/version1/BlobAttachmentV1");
class AttachmentsMemoryPersistence extends pip_services3_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    addReference(correlationId, id, reference, callback) {
        let item = _.find(this._items, (x) => x.id == id);
        if (item != null) {
            item.references = _.filter(item.references, (r) => {
                return !(r.id == reference.id && r.type == reference.type);
            });
            item.references.push(reference);
        }
        else {
            item = new BlobAttachmentV1_1.BlobAttachmentV1(id, [reference]);
            this._items.push(item);
        }
        this._logger.trace(correlationId, "Added reference to %s", id);
        this.save(correlationId, (err) => {
            if (callback)
                callback(err, item);
        });
    }
    removeReference(correlationId, id, reference, callback) {
        let item = _.find(this._items, (x) => x.id == id);
        let removed = false;
        if (item != null) {
            let oldLength = item.references.length;
            item.references = _.filter(item.references, (r) => {
                return !(r.id == reference.id && r.type == reference.type);
            });
            removed = item.references.length != oldLength;
        }
        if (removed) {
            this._logger.trace(correlationId, "Removed reference to %s", id);
            this.save(correlationId, (err) => {
                if (callback)
                    callback(err, item);
            });
        }
        else {
            callback(null, item);
        }
    }
}
exports.AttachmentsMemoryPersistence = AttachmentsMemoryPersistence;
//# sourceMappingURL=AttachmentsMemoryPersistence.js.map