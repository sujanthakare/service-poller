import React, { useState } from 'react';
import { Input, Button, Popup } from 'semantic-ui-react';
import { useServices } from 'src/redux/hooks';
import { isUrlValid } from 'src/utils';

const ServiceForm = () => {
	const [error, setError] = useState('');
	const [inputValue, setInputValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { loadServices, createService } = useServices();

	const onSaveClick = async () => {
		if (isUrlValid(inputValue)) {
			setIsLoading(true);
			await createService({
				name: '',
				url: inputValue,
			});
			await loadServices();
			setInputValue('');
			setIsLoading(false);
		} else {
			setError('Invalid Url');
		}
	};

	return (
		<Popup
			style={{
				color: 'red',
			}}
			content={error}
			open={!!error}
			position="top left"
			trigger={
				<Input
					error={!!error}
					value={inputValue}
					onChange={(e) => {
						setError('');
						setInputValue(e.target.value);
					}}
					style={{ width: '100%' }}
					placeholder="http://service.com"
					action={
						<Button attached loading={isLoading} disabled={!inputValue} onClick={onSaveClick}>
							Save
						</Button>
					}
				/>
			}
		/>
	);
};

export default ServiceForm;
