import React, { useEffect, useState } from 'react';
function Home(props) {
    
    return (
        <div className="container">
            {props.user ? 'Hi ' + props.user : 'You are not logged in'}

                
        </div>

        
    );
}

export default Home;