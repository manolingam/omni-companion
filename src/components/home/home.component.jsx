import React from 'react';
import Web3 from 'web3';

import Container from 'react-bootstrap/Container';
// import Jumbotron from 'react-bootstrap/Jumbotron';
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
			checked: localStorage.getItem('theme') === 'dark' ? true : false,
			theme: localStorage.getItem('theme'),
			data: '',
			web3: '',
			warning: false,
			urls: []
		};
	}

	componentDidMount() {
		document
			.getElementsByTagName('HTML')[0]
			.setAttribute('data-theme', localStorage.getItem('theme'));
		this.initializeWeb3();
	}

	initializeWeb3 = async () => {
		let web3 = new Web3(
			`https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`
		);
		this.setState({ web3: web3 });
		// let network = await web3.eth.net.getNetworkType();
	};

	toggleThemeChange = () => {
		const { checked } = this.state;
		if (checked === false) {
			localStorage.setItem('theme', 'dark');

			document
				.getElementsByTagName('HTML')[0]
				.setAttribute('data-theme', localStorage.getItem('theme'));

			this.setState({
				checked: true
			});
		} else {
			localStorage.setItem('theme', 'light');

			document
				.getElementsByTagName('HTML')[0]
				.setAttribute('data-theme', localStorage.getItem('theme'));

			this.setState({
				checked: false
			});
		}
	};

	render() {
		let address = '';
		let URL = '';

		return (
			<div className='home-container'>
				<label className='switch'>
					<input
						type='checkbox'
						//checked={this.state.checked}
						defaultChecked={this.state.checked}
						onChange={() => this.toggleThemeChange()}
					/>
					<span className='slider round' />
				</label>
				<Container className='container'>
					<h4>
						Omni Companion<span> v0.2.1</span>
					</h4>
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
								className='button'
								variant='outline-secondary'
								onClick={() => {
									if (
										this.state.web3.utils.isAddress(address)
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
								<span>Check</span>
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
								className='button'
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
								<span>Add</span>
							</Button>
						</InputGroup.Append>
					</InputGroup>
					<p>Powered by Ethereum</p>
				</Container>

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
