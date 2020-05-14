import React, { useState } from 'react';
import { Input, Button, Popup } from 'semantic-ui-react';
import { useServices } from 'src/redux/hooks';
import { isUrlValid } from 'src/utils';

interface IProps {
	name: string;
	onCancel?: () => void;
}

const ServiceListItemEditor = (props: IProps) => {
	const { name, onCancel } = props;
	const [error, setError] = useState('');
	const [inputValue, setInputValue] = useState(name);
	const [isLoading, setIsLoading] = useState(false);
	const { loadServices, editService } = useServices();

	const onSaveClick = async () => {
		if (isUrlValid(inputValue)) {
			setIsLoading(true);
			await editService(name, inputValue);
			await loadServices();
			setInputValue('');
			setIsLoading(false);
		} else {
			setError('Invalid URL');
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
