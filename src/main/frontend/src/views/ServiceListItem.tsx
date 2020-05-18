import React, { useState } from 'react';
import { ServiceStatus, Service } from 'src/redux/types';
import { SemanticCOLORS, Grid, Button, Header, Container, Icon } from 'semantic-ui-react';
import EditServiceForm from './EditServiceForm';
import { useServices } from 'src/redux/hooks';

const statusColor: { [x: string]: SemanticCOLORS } = {
	[ServiceStatus.OK]: 'green',
	[ServiceStatus.FAIL]: 'red',
	[ServiceStatus.UNKNOWN]: 'blue',
};

interface IProps {
	data: Service;
}

const ServiceListItem = ({ data }: IProps) => {
	const { id, status, name, url, createdAt } = data;

	const { deleteService, loadServices } = useServices();
	const [isLoading, setIsLoading] = useState(false);

	const renderServiceInfo = () => {
		return (
			<Container style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
				<Icon size="large" name="circle" color={statusColor[status]} />
				<Header style={{ marginLeft: 18 }}>
					{name}
					<Header.Subheader>{url}</Header.Subheader>
					<Header.Subheader>{createdAt}</Header.Subheader>
				</Header>
			</Container>
		);
	};

	const onDeleteClick = async () => {
		const result = window.confirm('Are you sure?');
		if (!result) {
			return;
		}

		setIsLoading(true);
		await deleteService(id);
		setIsLoading(false);
		await loadServices();
	};

	return (
		<Grid verticalAlign="middle" columns="equal" padded stackable>
			<Grid.Column width="10">{renderServiceInfo()}</Grid.Column>
			<Grid.Column>
				<Grid>
					<EditServiceForm data={data} />
					<Button color="red" onClick={onDeleteClick} disabled={isLoading}>
						Delete
					</Button>
				</Grid>
			</Grid.Column>
		</Grid>
	);
};

export default ServiceListItem;
