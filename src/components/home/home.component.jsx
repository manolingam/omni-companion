import React from 'react';
import Web3 from 'web3';

import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import isURL from 'validator/lib/isURL';
import Microlink from '@microlink/react';

import InfoObject from '../infoObject/infoObject.component';

import './home.style.css';

class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			data: '',
			web3: '',
			warning: false,
			urls: []
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
		let URL = '';

		return (
			<div>
				<Jumbotron fluid>
					<Container>
						<h3>
							Omni Companion<span> v0.2.0</span>
						</h3>
						<p>The Official Omni Wallet companion app</p>
						<InputGroup className='mb-3'>
							<FormControl
								placeholder="What's your wallet address?"
								aria-label="Recipient's address"
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
												data: address,
												warning: false
											});
										} else {
											this.setState({
												warning: true,
												data: ''
											});
										}
									}}
								>
									Check
								</Button>
							</InputGroup.Append>
						</InputGroup>
						<InputGroup className='mb-3'>
							<FormControl
								placeholder="What's the URL?"
								aria-label='URL'
								aria-describedby='basic-addon2'
								onChange={e => (URL = e.target.value)}
								id='url'
							/>
							<InputGroup.Append>
								<Button
									variant='outline-secondary'
									onClick={() => {
										if (isURL(URL)) {
											let urls = this.state.urls;
											if (!urls.includes(URL)) {
												urls.push(URL);
												this.setState({
													urls: urls
												});
											}
										}
									}}
								>
									Add
								</Button>
							</InputGroup.Append>
						</InputGroup>
						<p>Powered by Ethereum</p>
					</Container>
				</Jumbotron>

				<div className='main-body'>
					<InfoObject
						data={this.state.data}
						warning={this.state.warning}
					/>

					<div className='microlink'>
						<h4>Important Links..</h4>
						{this.state.urls.map(url => {
							return <Microlink url={url} />;
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
