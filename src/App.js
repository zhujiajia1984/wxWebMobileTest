import React from 'react';
import { Button } from 'antd-mobile';

//
export default class App extends React.Component {
	//
	constructor(props) {
		super(props);
	}

	//
	render() {
		return (
			<div>
				<h1>Hello, world!</h1>
				<Button type="primary">primary</Button>
			</div>
		);
	}
}