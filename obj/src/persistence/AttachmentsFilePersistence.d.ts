import { ConfigParams } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';
import { AttachmentsMemoryPersistence } from './AttachmentsMemoryPersistence';
import { BlobAttachmentV1 } from '../data/version1/BlobAttachmentV1';
export declare class AttachmentsFilePersistence extends AttachmentsMemoryPersistence {
    protected _persister: JsonFilePersister<BlobAttachmentV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
