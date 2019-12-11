import React from 'react';
import Alert from 'react-bootstrap/Alert';

const InfoObject = ({ address, warning }) => {
	return (
		<div style={{ textAlign: 'center' }}>
			{address ? (
				// eslint-disable-next-line jsx-a11y/alt-text
				<object
					type='text/html'
					data={`https://www.omni.fyi/wallet/${address}`}
					width='100%'
					height='600px'
					style={{ overflow: 'auto' }}
				></object>
			) : warning ? (
				<Alert
					variant='warning'
					style={{ width: '50%', margin: 'auto' }}
				>
					Invalid address! Check it out!
				</Alert>
			) : null}
		</div>
	);
};

export default InfoObject;
