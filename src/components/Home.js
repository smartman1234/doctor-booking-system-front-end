import React, { useEffect, useState } from 'react';
function Home(props) {
    
    return (
        <React.Fragment>
            {props.user ? 'Hi ' + props.user.name_en : 'You are not logged in'}       
        </React.Fragment>     
    );
}

export default Home;