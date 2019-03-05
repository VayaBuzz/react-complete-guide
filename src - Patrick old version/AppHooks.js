//import React, { Component } from 'react'; /* react library */
import React, { useState } from 'react'; /* react library */
import './App.css';
import Person from './Person/Person';  // build workflow will append ".js"

//class App extends Component {
//Intead of a class based app, make a hook based app.
const app = props => {
  const [ personsState, setPersonsState] = useState({
      persons: [
        {id: 'asfa1', name: 'Max', age:28},
        {id: 'vasdf1', name: 'Manu', age:29},
        {id: 'asdf11', name: 'Stephanie', age:26}
      ],
      otherState: 'some other value',
      showPersons: false
    } 
  );

  // this is a function, inside a function! We use this in React Hooks.

   const nameChangedHandler = (event, id) => {

    // You're given the id.
    // Find the index of the state that has that id
    const personIndex = personsState.persons.findIndex(p => {
      return p.id === id;
    });
  
    // using the spread ... operator here to 
    // 1. Make a new object.
    // 2. Copy the referenced person into the object.
    // 3. This way we will NOT directly reference
    //    or modify the current person in the state.
    const person = {
            ...personsState.persons[personIndex]   
    };
    // Or here's an alternative approach to the above metod, but we won't use it:
    //const personAlt = Object.assign({}, personsState.persons[personIndex]);
  
    // Update the new person object's name property.
    person.name = event.target.value;
  
    // Make a whole new copy of the persons array.
    const persons = [...personsState.persons];
  
    // Set the particular person in the array with the new 
    // person data we created above.
    persons[personIndex] = person;
  
   // set the state to the whole new persons array.
    //this.setState( {persons: persons});  // class version
    setPersonsState( {persons: persons});  // hooks version
  
    // This was a lot of code, but it's the best way to update
    // the state without mutating it!
      
  }
  

  const togglePersonsHandler = () => {   // define it this way so "this" returns to the class
    const doesShow = personsState.showPersons;
    setPersonsState({showPersons: !doesShow});
  }


  return (  
     <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p> this is really working!</p>
        <button 
          onClick={togglePersonsHandler}>Toggle Persons</button> 
          {persons}
      </div>
    );
    //return React.createElement('div', {className: 'App'}, React.createElement('h1',null,'Does this work now?')) ;
  }


//export default App; // class version
export default app;  // hook version





deletePersonHandler = (personIndex) => {
  //const persons = personsState.persons.slice();
  const persons = [...personsState.persons];   // or use the spread operator
  persons.splice(personIndex, 1);
  this.setState({persons: persons});
}

