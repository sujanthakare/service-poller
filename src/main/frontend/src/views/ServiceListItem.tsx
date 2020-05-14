import React, { useState } from 'react';
import { ServiceStatus } from 'src/redux/types';
import { SemanticCOLORS, Grid, Button } from 'semantic-ui-react';
import ServiceListItemEditor from './ServiceListItemEditor';
import { useServices } from 'src/redux/hooks';

const statusColor: { [x: string]: SemanticCOLORS } = {
	[ServiceStatus.OK]: 'green',
	[ServiceStatus.FAIL]: 'red',
	[ServiceStatus.UNKNOWN]: 'blue',
};

interface IProps {
	name: string;
	status: ServiceStatus;
}

const ServiceListItem = (props: IProps) => {
	const { status, name } = props;

	const { deleteService, loadServices } = useServices();
	const [editMode, setEditMode] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const renderStatus = () => {
		return <p style={{ textAlign: 'center' }}>{status}</p>;
	};

	const renderName = () => {
		if (editMode) {
			return (
				<ServiceListItemEditor
					name={name}
					onCancel={() => {
						setEditMode(false);
					}}
				/>
			);
		}

		return <p>{name}</p>;
	};

	const onEditClick = () => {
		setEditMode(true);
	};
	const onDeleteClick = async () => {
		const result = window.confirm('Are you sure?');
		if (!result) {
			return;
		}

		setIsLoading(true);
		await deleteService(name);
		setIsLoading(false);
		await loadServices();
	};

	return (
		<Grid verticalAlign="middle" columns="equal" padded stackable>
			<Grid.Column color={statusColor[status]}>{renderStatus()}</Grid.Column>
			<Grid.Column width="11">{renderName()}</Grid.Column>
			<Grid.Column>
				<Button.Group>
					<Button onClick={onEditClick} disabled={editMode || isLoading}>
						Edit
					</Button>
					<Button onClick={onDeleteClick} disabled={isLoading}>
						Delete
					</Button>
				</Button.Group>
			</Grid.Column>
		</Grid>
	);
};

export default ServiceListItem;
