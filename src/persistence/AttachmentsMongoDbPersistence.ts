let _ = require('lodash');

import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';

import { ReferenceV1 } from '../data/version1/ReferenceV1';
import { BlobAttachmentV1 } from '../data/version1/BlobAttachmentV1';
import { IAttachmentsPersistence } from './IAttachmentsPersistence';

export class AttachmentsMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<BlobAttachmentV1, string> 
    implements IAttachmentsPersistence {

    constructor() {
        super('attachments');
    }

    public addReference(correlationId: string, id: string, reference: ReferenceV1, 
        callback?: (err: any, item: BlobAttachmentV1) => void): void {

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
        }

        let options = {
            returnOriginal: false,
            returnNewDocument: true,
            upsert: true
        };
        
        this._collection.findOneAndUpdate(filter, data, options, (err, result) => {
            let newItem = result ? this.convertToPublic(result.value) : null;
            if (err != null && newItem != null)
                this._logger.trace(correlationId, "Added reference in %s to id = %s", this._collection, id);
           
            if (callback) callback(err, newItem);
        });
    }

    public removeReference(correlationId: string, id: string, reference: ReferenceV1, 
        callback?: (err: any, item: BlobAttachmentV1) => void): void {

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
        }

        let options = {
            returnOriginal: false,
            returnNewDocument: true
        };
        
        this._collection.findOneAndUpdate(filter, data, options, (err, result) => {
            let newItem = result ? this.convertToPublic(result.value) : null;
            if (err != null && newItem != null)
                this._logger.trace(correlationId, "Removed reference in %s from id = %s", this._collection, id);
           
            if (callback) callback(err, newItem);
        });
    }
    
}
