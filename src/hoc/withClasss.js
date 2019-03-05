import React from 'react';

const withClasss = (WrappedComponent, className) => {
    // here's a functional component that you return, haha
    return props => (
        <div className={className}>
            <WrappedComponent {...props}/>
        </div>
    ); 
}

export default withClasss;