"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_seneca_node_1 = require("pip-services-seneca-node");
class AttachmentsSenecaServiceV1 extends pip_services_seneca_node_1.CommandableSenecaService {
    constructor() {
        super('attachments');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-attachments', 'controller', 'default', '*', '1.0'));
    }
}
exports.AttachmentsSenecaServiceV1 = AttachmentsSenecaServiceV1;
//# sourceMappingURL=AttachmentsSenecaServiceV1.js.map