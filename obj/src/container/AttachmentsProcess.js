"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
<<<<<<< HEAD
=======
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_oss_node_1 = require("pip-services-oss-node");
>>>>>>> 4dfa76de463adb3f95356d6170d3dbf9122aaf6e
const pip_clients_blobs_node_1 = require("pip-clients-blobs-node");
const AttachmentsServiceFactory_1 = require("../build/AttachmentsServiceFactory");
class AttachmentsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("attachments", "Blob attachments microservice");
        this._factories.add(new AttachmentsServiceFactory_1.AttachmentsServiceFactory);
        this._factories.add(new pip_clients_blobs_node_1.BlobsClientFactory);
<<<<<<< HEAD
=======
        this._factories.add(new pip_services_net_node_1.DefaultNetFactory);
        this._factories.add(new pip_services_oss_node_1.DefaultOssFactory);
>>>>>>> 4dfa76de463adb3f95356d6170d3dbf9122aaf6e
    }
}
exports.AttachmentsProcess = AttachmentsProcess;
//# sourceMappingURL=AttachmentsProcess.js.map