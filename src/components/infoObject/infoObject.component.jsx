import React from 'react';
import Alert from 'react-bootstrap/Alert';

const InfoObject = ({ data, warning }) => {
	return (
		<div style={{ minWidth: '50%', textAlign: 'center' }}>
			<h4>Omni Pages..</h4>
			{data ? (
				// eslint-disable-next-line jsx-a11y/alt-text
				<object
					type='text/html'
					data={`https://www.omni.fyi/wallet/${data}`}
					width='100%'
					height='600px'
					style={{ overflow: 'auto' }}
				></object>
			) : warning ? (
				<Alert
					variant='warning'
					style={{ width: '50%', margin: 'auto' }}
				>
					Invalid input! Check it out!
				</Alert>
			) : null}
		</div>
	);
};

export default InfoObject;
