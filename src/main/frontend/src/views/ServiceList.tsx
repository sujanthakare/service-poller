import React, { useEffect } from 'react';
import { List } from 'semantic-ui-react';
import { useServices } from 'src/redux/hooks';
import ServiceListItem from './ServiceListItem';

const ServiceList = () => {
	const { services, loadServices } = useServices();

	useEffect(() => {
		loadServices();

		const intervalId = setInterval(() => {
			loadServices();
		}, 1000 * 30);

		return () => {
			clearInterval(intervalId);
		};
	}, [loadServices]);

	return (
		<List relaxed divided>
			{services.map((item) => {
				return (
					<List.Item key={item.url}>
						<ServiceListItem name={item.url} status={item.status} />
					</List.Item>
				);
			})}
		</List>
	);
};

export default ServiceList;
