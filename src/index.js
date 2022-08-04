import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Game extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      visible: false,
      userName: null
    };
}

handleOnClick = (userName) => {
  this.setState({visible: true});
};

  render() {
    return (
      <React.Fragment>
        <div hidden={this.state.visible} className="parentDisable">
          <div className="input-group mb-3" style={{width: "20%", left: "40%", top: "40%"}}>
            <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon2"/>
            <div className="input-group-append">
              <button onClick={() => this.handleOnClick(this.state.userName)} className="btn btn-outline-secondary" type="button" style={{backgroundColor: "#90EE90"}}>Login</button>
            </div>
          </div>
        </div>
        <App player="Marat"/>
      </React.Fragment>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
