import { CommandSet } from 'pip-services3-commons-node';
import { ICommand } from 'pip-services3-commons-node';
import { Command } from 'pip-services3-commons-node';
import { Schema } from 'pip-services3-commons-node';
import { Parameters } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

import { BlobAttachmentV1 } from '../data/version1/BlobAttachmentV1';
import { ReferenceV1Schema } from '../data/version1/ReferenceV1Schema';
import { IAttachmentsController } from './IAttachmentsController';

export class AttachmentsCommandSet extends CommandSet {
    private _logic: IAttachmentsController;

	constructor(logic: IAttachmentsController) {
		super();

		this._logic = logic;

		// Register commands to the database
		this.addCommand(this.makeGetAttachmentByIdCommand());
		this.addCommand(this.makeAddAttachmentsCommand());
		this.addCommand(this.makeUpdateAttachmentsCommand());
		this.addCommand(this.makeRemoveAttachmentsCommand());
		this.addCommand(this.makeDeleteAttachmentByIdCommand());
	}

	private makeGetAttachmentByIdCommand(): ICommand {
		return new Command(
			"get_attachment_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('id', TypeCode.String),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let id = args.getAsNullableString("id");
				this._logic.getAttachmentById(correlationId, id, callback);
			}
		);
	}

	private makeAddAttachmentsCommand(): ICommand {
		return new Command(
			"add_attachments",
			new ObjectSchema(true)
				.withRequiredProperty('reference', new ReferenceV1Schema())
				.withRequiredProperty('ids', new ArraySchema(TypeCode.String)),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let reference = args.get("reference");
				let ids = args.get("ids");
				this._logic.addAttachments(correlationId, reference, ids, callback);
			}
		);
	}
    
	private makeUpdateAttachmentsCommand(): ICommand {
		return new Command(
			"update_attachments",
			new ObjectSchema(true)
				.withRequiredProperty('reference', new ReferenceV1Schema())
				.withRequiredProperty('old_ids', new ArraySchema(TypeCode.String))
				.withRequiredProperty('new_ids', new ArraySchema(TypeCode.String)),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let reference = args.get("reference");
				let oldIds = args.get("old_ids");
				let newIds = args.get("new_ids");
				this._logic.updateAttachments(correlationId, reference, oldIds, newIds, callback);
			}
		);
	}

	private makeRemoveAttachmentsCommand(): ICommand {
		return new Command(
			"remove_attachments",
			new ObjectSchema(true)
				.withRequiredProperty('reference', new ReferenceV1Schema())
				.withRequiredProperty('ids', new ArraySchema(TypeCode.String)),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let reference = args.get("reference");
				let ids = args.get("ids");
				this._logic.removeAttachments(correlationId, reference, ids, callback);
			}
		);
	}

	private makeDeleteAttachmentByIdCommand(): ICommand {
		return new Command(
			"delete_attachment_by_id",
			null,
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let id = args.getAsNullableString("id");
				this._logic.deleteAttachmentById(correlationId, id, callback);
			}
		);
	}

}