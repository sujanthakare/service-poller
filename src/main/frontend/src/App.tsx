import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import ServiceList from './views/ServiceList';
import NewServiceForm from './views/NewServiceForm';
import { Container } from 'semantic-ui-react';

function App() {
	return (
		<Provider store={store}>
			<Container style={{ paddingTop: 100 }}>
				<NewServiceForm />
				<ServiceList />
			</Container>
		</Provider>
	);
}

export default App;
