import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { useServices } from 'src/redux/hooks';
import { isUrlValid } from 'src/utils';
import ServiceFormModal from './ServiceFormModal';
import { ServiceTransferObject, Service } from 'src/redux/types';

interface IProps {
	data: Service;
}

const EditServiceForm = (props: IProps) => {
	const { data } = props;
	const { id, url, name } = data;
	const [isOpen, setIsOpen] = useState(false);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { loadServices, editService } = useServices();

	const onSaveClick = async (newService: ServiceTransferObject) => {
		if (isUrlValid(newService.url)) {
			setIsLoading(true);
			await editService(id, newService);
			await loadServices();
			setIsLoading(false);
			setIsOpen(false);
		} else {
			setError('Invalid Url');
		}
	};

	return (
		<>
			<Button
				onClick={() => {
					setIsOpen(true);
				}}>
				Edit
			</Button>
			<ServiceFormModal
				title="Edit service"
				error={error}
				data={{ url, name }}
				open={isOpen}
				loading={isLoading}
				onSave={onSaveClick}
				onCancel={() => setIsOpen(false)}
			/>
		</>
	);
};

export default EditServiceForm;
