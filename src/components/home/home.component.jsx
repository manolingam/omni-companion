import React from 'react';
import Web3 from 'web3';

import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import InfoObject from '../infoObject/infoObject.component';

class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			address: '',
			web3: '',
			warning: false
		};
	}

	componentDidMount() {
		this.initializeWeb3();
	}

	initializeWeb3 = async () => {
		let web3 = new Web3(
			`https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`
		);
		this.setState({ web3: web3 });
		// let network = await web3.eth.net.getNetworkType();
	};

	render() {
		let address = '';

		return (
			<div>
				<Jumbotron
					fluid
					style={{ paddingTop: '10px', paddingBottom: '10px' }}
				>
					<Container>
						<h3>
							Omni Companion<span> v0.1.0</span>
						</h3>
						<p>The Official Omni Wallet companion app</p>
						<InputGroup className='mb-3'>
							<FormControl
								placeholder="What's your wallet address?"
								aria-label="Recipient's username"
								aria-describedby='basic-addon2'
								onChange={e => (address = e.target.value)}
							/>
							<InputGroup.Append>
								<Button
									variant='outline-secondary'
									onClick={() => {
										if (
											this.state.web3.utils.isAddress(
												address
											)
										) {
											this.setState({
												address: address,
												warning: false
											});
										} else {
											this.setState({
												warning: true,
												address: ''
											});
										}
									}}
								>
									Check
								</Button>
							</InputGroup.Append>
						</InputGroup>
						<p style={{ textAlign: 'center' }}>
							Powered by Ethereum
						</p>
					</Container>
				</Jumbotron>
				<InfoObject
					address={this.state.address}
					warning={this.state.warning}
				/>
			</div>
		);
	}
}

export default Home;
