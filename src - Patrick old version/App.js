import React, { Component } from 'react'; /* react library */
import classes from './App.css'; // we can do this since we unlocked css modules.
//import Radium, {StyleRoot} from 'radium';
import Person from './Person/Person';  // build workflow will append ".js"

class App extends Component {
  state = { // state only works in apps that extend React.Component.
            // use state sparingly otherwise you'll get hard-to-manage code.
            // state is a speical property. You can define other properties, too.
            
            persons: [
              {id: 'asfa1', name: 'Max', age:28},
              {id: 'vasdf1', name: 'Manu', age:29},
              {id: 'asdf11', name: 'Stephanie', age:26}
            ],
            otherState: 'some other value',
            showPersons: false
  } 

  nameChangedHandler = (event, id) => {

    // You're given the id.
    // Find the index of the state that has that id
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // using the spread ... operator here to 
    // 1. Make a new object.
    // 2. Copy the referenced person into the object.
    // 3. This way we will NOT directly reference
    //    or modify the current person in the state.
    const person = {
            ...this.state.persons[personIndex]   
    };
    // Or here's an alternative approach to the above metod, but we won't use it:
    //const personAlt = Object.assign({}, this.state.persons[personIndex]);

    // Update the new person object's name property.
    person.name = event.target.value;

    // Make a whole new copy of the persons array.
    const persons = [...this.state.persons];

    // Set the particular person in the array with the new 
    // person data we created above.
    persons[personIndex] = person;

   // set the state to the whole new persons array.
    this.setState( {persons: persons});

    // This was a lot of code, but it's the best way to update
    // the state without mutating it!
      
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];   // or use the spread operator
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {   // define it this way so "this" returns to the class
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {  
    let persons = null;
    let btnClass = "";

    if (this.state.showPersons){
      persons = (
        <div>    
          {this.state.persons.map((myPerson, index) => {    
            return <Person 
            click={() => this.deletePersonHandler(index)}
            name={myPerson.name}
            age={myPerson.age}
            key={myPerson.id}  
            changed={(event) => this.nameChangedHandler(event, myPerson.id)}
              />
          })}         
      </div> 
      );

      btnClass = classes.Red;
    }

    // Dynamically assign CSS classes to the p.
    // It's just javascript, whoooo!
    //let classes = ['red', 'bold'].join(' ');  // turns array of strings into "red bold" 
    const assignedClasses = [];  // initialize an empty array of css classes
    if (this.state.persons.length <=2) {
      assignedClasses.push( classes.red );   // classes = ['red']
    }
    if (this.state.persons.length <=1) {
      assignedClasses.push( classes.bold );   // classes = ['red', 'bold']
    }

    return (  
     
     <div className={classes.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button 
        className={btnClass}
          onClick={this.togglePersonsHandler}>Toggle Persons</button> 
          {persons}
      </div>
      
    );
    //return React.createElement('div', {className: 'App'}, React.createElement('h1',null,'Does this work now?')) ;
  }
}

export default App;
//export default Radium(App); // this is a higher order component.
                            // basically Radium will "wrap" your component 
                            // and inject extra stuff into it.
                            // in this case, it will help parse your styles.
