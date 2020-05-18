import React, { useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { useServices } from 'src/redux/hooks';
import { isUrlValid } from 'src/utils';
import ServiceFormModal from './ServiceFormModal';
import { ServiceTransferObject } from 'src/redux/types';

const NewServiceForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { loadServices, createService } = useServices();

	const onSaveClick = async (newService: ServiceTransferObject) => {
		if (isUrlValid(newService.url)) {
			setIsLoading(true);
			await createService(newService);
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
				icon
				labelPosition="right"
				onClick={() => {
					setIsOpen(true);
				}}>
				Create New Service
				<Icon name="edit" />
			</Button>
			<ServiceFormModal
				title="New service"
				error={error}
				open={isOpen}
				loading={isLoading}
				onSave={onSaveClick}
				onCancel={() => setIsOpen(false)}
			/>
		</>
	);
};

export default NewServiceForm;
