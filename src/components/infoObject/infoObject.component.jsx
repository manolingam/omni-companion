import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Microlink from '@microlink/react';

const InfoObject = ({ data, warning }) => {
	return (
		<div style={{ textAlign: 'center', maxWidth: '70%' }}>
			<h4>Omni Pages..</h4>
			{data ? (
				<div style={{ textAlign: 'center' }}>
					<Microlink url={`https://www.omni.fyi/wallet/${data}`} />
				</div>
			) : warning ? (
				<Alert
					variant='warning'
					style={{ width: '50%', margin: 'auto' }}
				>
					Invalid input! Check it out!
				</Alert>
			) : (
				console.log('empty')
			)}
		</div>
	);
};

export default InfoObject;
