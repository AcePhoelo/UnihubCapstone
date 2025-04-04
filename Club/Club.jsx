import React from 'react';

const Club = ({ clubName }) => {
    return (
        <div style={{ padding: '40px' }}>
            <h1>{clubName}</h1>
            <p>Welcome to {clubName} Club Page!</p>
        </div>
    );
};

export default Club;