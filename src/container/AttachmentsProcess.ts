import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { BlobsClientFactory } from 'pip-clients-blobs-node';
import { AttachmentsServiceFactory } from '../build/AttachmentsServiceFactory';
import { DefaultRpcFactory } from 'pip-services-rpc-node';

export class AttachmentsProcess extends ProcessContainer {

    public constructor() {
        super("attachments", "Blob attachments microservice");
        this._factories.add(new AttachmentsServiceFactory);
        this._factories.add(new BlobsClientFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
