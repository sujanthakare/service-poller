import React, { useState } from 'react';
import { Input, Button, Popup } from 'semantic-ui-react';
import { useServices } from 'src/redux/hooks';
import { isUrlValid } from 'src/utils';
import { Service } from 'src/redux/types';

interface IProps {
	data: Service;
	onCancel?: () => void;
}

const ServiceListItemEditor = (props: IProps) => {
	const { data, onCancel } = props;
	const { id, name, url } = data;
	const [error, setError] = useState('');
	const [inputValue, setInputValue] = useState(url);
	const [isLoading, setIsLoading] = useState(false);
	const { loadServices, editService } = useServices();

	const onSaveClick = async () => {
		if (isUrlValid(inputValue)) {
			setIsLoading(true);
			await editService(id, {
				url: inputValue,
				name: '',
			});
			await loadServices();
			setInputValue('');
			setIsLoading(false);
		} else {
			setError('Invalid URL');
		}
		onCancel && onCancel();
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
						<Button.Group>
							<Button
								loading={isLoading}
								disabled={!inputValue || name === inputValue}
								onClick={onSaveClick}>
								Save
							</Button>
							<Button onClick={onCancel}>Cancel</Button>
						</Button.Group>
					}
				/>
			}
		/>
	);
};

export default ServiceListItemEditor;
