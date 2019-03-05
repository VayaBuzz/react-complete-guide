// use ES 6 for your components, it rocks
// we don't need to import component here, since we're just
// making a function.
import React from 'react';
//import Radium from 'radium';

import classes from './Person.css'; // this is the CSS Modules style.

const person = (props) => {   // you can call this props, myProps, whatever, but props is good
    //const style = {
    //    '@media (min-width: 500px)':{
    //        width: '450px'
    //    }
    //};
    return (
    <div className={classes.Person} >
        <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
        <p>{props.children}</p>  
        <input type="text" onChange={props.changed} value={props.name} />
    </div>
    )
}

export default person;
//export default Radium(person);