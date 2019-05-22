let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoosePersistence } from 'pip-services3-mongoose-node';

import { ReferenceV1 } from '../data/version1/ReferenceV1';
import { BlobAttachmentV1 } from '../data/version1/BlobAttachmentV1';
import { IAttachmentsPersistence } from './IAttachmentsPersistence';
import { BlobAttachmentMongooseSchema } from './BlobAttachmentMongooseSchema';

export class AttachmentsMongoDbPersistence 
    extends IdentifiableMongoosePersistence<BlobAttachmentV1, string> 
    implements IAttachmentsPersistence {

    constructor() {
        super('attachments', BlobAttachmentMongooseSchema());
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
