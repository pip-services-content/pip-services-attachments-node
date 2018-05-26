let _ = require('lodash');

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services-data-node';

import { ReferenceV1 } from '../data/version1/ReferenceV1';
import { BlobAttachmentV1 } from '../data/version1/BlobAttachmentV1';
import { IAttachmentsPersistence } from './IAttachmentsPersistence';

export class AttachmentsMemoryPersistence 
    extends IdentifiableMemoryPersistence<BlobAttachmentV1, string> 
    implements IAttachmentsPersistence {

    constructor() {
        super();
    }

    public addReference(correlationId: string, id: string, reference: ReferenceV1, 
        callback?: (err: any, item: BlobAttachmentV1) => void): void {
        let item: BlobAttachmentV1 = _.find(this._items, (x) => x.id == id);

        if (item != null) {
            item.references = _.filter(item.references, (r) => {
                return !(r.id == reference.id && r.type == reference.type);
            });
            item.references.push(reference)
        } else {
            item = new BlobAttachmentV1(id, [reference]);
            this._items.push(item);
        }

        this._logger.trace(correlationId, "Added reference to %s", id);

        this.save(correlationId, (err) => {
            if (callback) callback(err, item)
        });
    }

    public removeReference(correlationId: string, id: string, reference: ReferenceV1, 
        callback?: (err: any, item: BlobAttachmentV1) => void): void {
        let item: BlobAttachmentV1 = _.find(this._items, (x) => x.id == id);
        
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
                if (callback) callback(err, item)
            });
        } else {
            callback(null, item);
        }
    }

}
