import { ConfigParams } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';

import { AttachmentsMemoryPersistence } from './AttachmentsMemoryPersistence';
import { BlobAttachmentV1 } from '../data/version1/BlobAttachmentV1';

export class AttachmentsFilePersistence extends AttachmentsMemoryPersistence {
	protected _persister: JsonFilePersister<BlobAttachmentV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<BlobAttachmentV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}