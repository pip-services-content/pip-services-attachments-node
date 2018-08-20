"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const pip_clients_blobs_node_1 = require("pip-clients-blobs-node");
const AttachmentsServiceFactory_1 = require("../build/AttachmentsServiceFactory");
const pip_services_rpc_node_1 = require("pip-services-rpc-node");
class AttachmentsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("attachments", "Blob attachments microservice");
        this._factories.add(new AttachmentsServiceFactory_1.AttachmentsServiceFactory);
        this._factories.add(new pip_clients_blobs_node_1.BlobsClientFactory);
        this._factories.add(new pip_services_rpc_node_1.DefaultRpcFactory);
    }
}
exports.AttachmentsProcess = AttachmentsProcess;
//# sourceMappingURL=AttachmentsProcess.js.map