"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
const AttachmentsServiceFactory_1 = require("../build/AttachmentsServiceFactory");
class AttachmentsLambdaFunction extends pip_services3_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("attachments", "Blob attachments function");
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-attachments', 'controller', 'default', '*', '*'));
        this._factories.add(new AttachmentsServiceFactory_1.AttachmentsServiceFactory());
    }
}
exports.AttachmentsLambdaFunction = AttachmentsLambdaFunction;
exports.handler = new AttachmentsLambdaFunction().getHandler();
//# sourceMappingURL=AttachmentsLambdaFunction.js.map