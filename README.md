# Blob Attachments Microservice

This is a blob attachments microservice from Pip.Services library. 
It records all documents that attached to a particilar blob.
When last document is disattached, the blob gets removed.

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process, Seneca Plugin
* External APIs: HTTP/REST, Seneca
* Persistence: Memory, Flat Files, MongoDB

This microservice has no dependencies on other microservices.

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* [Configuration Guide](doc/Configuration.md)
* [Deployment Guide](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK](https://github.com/pip-services-content/pip-clients-attachments-node)
* Communication Protocols
  - [HTTP Version 1](doc/HttpProtocolV1.md)
  - [Seneca Version 1](doc/SenecaProtocolV1.md)

##  Contract

Logical contract of the microservice is presented below. For physical implementation (HTTP/REST, Thrift, Seneca, Lambda, etc.),
please, refer to documentation of the specific protocol.

```typescript
class BlobAttachmentV1 implements IStringIdentifiable {
    public id: string;
    public references: ReferenceV1[];
}

class ReferenceV1
{
    public id: string;
    public type: string;
    public name: string;
}

interface IAttachmentsV1 {
    getAttachmentById(correlationId: string, id: string,
        callback: (err: any, attachment: BlobAttachmentV1) => void): void;
    
    addAttachments(correlationId: string, reference: ReferenceV1, ids: string[],
        callback?: (err: any, attachments: BlobAttachmentV1[]) => void): void;

    updateAttachments(correlationId: string, reference: ReferenceV1, oldIds: string[], newIds: string[],
        callback?: (err: any, attachments: BlobAttachmentV1[]) => void): void;

    removeAttachments(correlationId: string, reference: ReferenceV1, ids: string[],
        callback?: (err: any, attachments: BlobAttachmentV1[]) => void): void;

    deleteAttachmentById(correlationId: string, id: string,
        callback?: (err: any, attachment: BlobAttachmentV1) => void): void;
}
```

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services-infrastructure/pip-services-attachments-node.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.json** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.yaml** file. 

Example of microservice configuration
```yaml
- descriptor: "pip-services-container:container-info:default:default:1.0"
  name: "pip-services-attachments"
  description: "Attachments microservice"

- descriptor: "pip-services-commons:logger:console:default:1.0"
  level: "trace"

- descriptor: "pip-services-attachments:persistence:file:default:1.0"
  path: "./data/attachments.json"

- descriptor: "pip-services-attachments:controller:default:default:1.0"

- descriptor: "pip-services-attachments:service:http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8080
```
 
For more information on the microservice configuration see [Configuration Guide](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    dependencies: {
        ...
        "pip-clients-attachments-node": "^1.0.*"
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
var sdk = new require('pip-clients-attachments-node');
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
var client = sdk.AttachmentsHttpClientV1(config);

// Connect to the microservice
client.open(null, function(err) {
    if (err) {
        console.error('Connection to the microservice failed');
        console.error(err);
        return;
    }
    
    // Work with the microservice
    ...
});
```

Now the client is ready to perform operations
```javascript
// Log system event
client.addAttachments(
    null,
    {
        id: '1',
        type: 'document',
        name: 'my_document'
    },
    ['1', '2', '3']
    function (err, attachments) {
        ...
    }
);
```

```javascript
var now = new Date();

// Get the list system events
client.getAttachmentById(
    null,
    '1',
    function(err, attachment) {
    ...    
    }
);
```    

## Acknowledgements

This microservice was created and currently maintained by *Sergey Seroukhov*.

