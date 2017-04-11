import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-net-node';

export class AttachmentsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('attachments');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-attachments', 'controller', 'default', '*', '1.0'));
    }
}