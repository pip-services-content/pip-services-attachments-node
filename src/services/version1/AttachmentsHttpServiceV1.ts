import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-rpc-node';

export class AttachmentsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/attachments');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-attachments', 'controller', 'default', '*', '1.0'));
    }
}