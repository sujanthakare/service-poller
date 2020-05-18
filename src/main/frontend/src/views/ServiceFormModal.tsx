import React, { useState } from 'react';
import { Input, Button, Modal, Form, Message } from 'semantic-ui-react';
import { ServiceTransferObject } from 'src/redux/types';

interface IProps {
	title?: string;
	error?: string;
	data?: ServiceTransferObject;
	onSave?: (data: ServiceTransferObject) => void;
	onCancel?: () => void;
	open?: boolean;
	loading?: boolean;
}
const ServiceFormModal = (props: IProps) => {
	const { onSave, data = { url: '', name: '' }, open, loading, onCancel, error, title } = props;
	const [formData, setFormData] = useState({
		urlInput: data.url,
		nameInput: data.name,
	});

	const inputChangeHandler = (name: string, value: string) => {
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const onSaveClick = async () => {
		onSave &&
			onSave({
				url: formData.urlInput,
				name: formData.nameInput,
			});
	};

	return (
		<Modal open={open} size="mini">
			{title && <Modal.Header>{title}</Modal.Header>}
			<Modal.Content>
				<Form>
					{error && <Message header="Error" negative content={error} />}
					<Form.Field>
						<label>Name</label>
						<Input
							value={formData.nameInput}
							onChange={(e) => inputChangeHandler('nameInput', e.target.value)}
							style={{ width: '100%' }}
							placeholder="Some Name"
						/>
					</Form.Field>
					<Form.Field>
						<label>URL</label>
						<Input
							value={formData.urlInput}
							onChange={(e) => inputChangeHandler('urlInput', e.target.value)}
							style={{ width: '100%' }}
							placeholder="http://service.com"
						/>
					</Form.Field>
				</Form>
			</Modal.Content>
			<Modal.Actions>
				<Button onClick={onCancel}>Cancel</Button>
				<Button primary loading={loading} onClick={onSaveClick}>
					Save
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default ServiceFormModal;
