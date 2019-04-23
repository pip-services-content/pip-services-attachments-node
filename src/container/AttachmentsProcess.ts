import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';

import { BlobsClientFactory } from 'pip-clients-blobs-node';
import { AttachmentsServiceFactory } from '../build/AttachmentsServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

export class AttachmentsProcess extends ProcessContainer {

    public constructor() {
        super("attachments", "Blob attachments microservice");
        this._factories.add(new AttachmentsServiceFactory);
        this._factories.add(new BlobsClientFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
