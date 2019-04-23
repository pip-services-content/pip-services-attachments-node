import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class AttachmentsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/attachments');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-attachments', 'controller', 'default', '*', '1.0'));
    }
}