import React from 'react';
import Players from './Players';
import Tasks from './Tasks';

const fibonacci_numbers = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

class App extends React.Component {
constructor(props){
    super(props);

    this.state = {
        admin: "Marat",
        tasks: Array(0),
        tasksVotes: Array(0),
    };
}

handleOnTaskDelete = (i) => {
    var tasks = this.state.tasks;
    tasks = tasks.filter((value, index) => index !== i);
    this.setState({tasks:tasks});
};



    render() {
        return (
          <div>
              <Players numbers={fibonacci_numbers}/>
              <Tasks onTaskClick={(i) => this.handleOnTaskDelete(i)} numbers={fibonacci_numbers}/>
          </div>
        );
      }
}

export default App;