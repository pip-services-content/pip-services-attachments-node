import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';
import { DefaultNetFactory } from 'pip-services-net-node';
import { DefaultOssFactory } from 'pip-services-oss-node';

import { AttachmentsServiceFactory } from '../build/AttachmentsServiceFactory';

export class AttachmentsProcess extends ProcessContainer {

    public constructor() {
        super("attachments", "Blob attachments microservice");
        this._factories.add(new AttachmentsServiceFactory);
        this._factories.add(new DefaultNetFactory);
        this._factories.add(new DefaultOssFactory);
    }

}
