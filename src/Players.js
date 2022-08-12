import React from 'react';
import Player from './Player';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Board from './Board';
import { usePlayers } from './Hooks/usePlayers';
import { useMutation } from 'react-query';
import { QueryService } from './Services/QueryService';


// class Players extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       visible: false
//     }
//   }

//   handeClick() {
//     this.setState({ visible: !this.state.visible });
//   }
//   render() {
//     var rows = [];
//     debugger;
//     for (let i = 0; i < this.props.players.length; i++) {
//       rows.push(<Player
//         value={this.props.value} name={this.props.players[i].title} visible={this.state.visible} />);
//     }


//     return (
//       <div>
//         <Board
//           playersDisabled={this.props.playersDisabled}
//           onPlayerSelect={(value) => this.props.onPlayerSelect(value)}
//           numbers={this.props.numbers} />
//         <div className="players">
//           {rows}
//         </div>
//         <button onClick={() => this.handeClick()} type="button" className="btn btn-primary btn-lg player-reveal" disabled={this.props.playersDisabled || this.state.revealDisabled}>Reveal</button>
//       </div>
//     );
//   }а
// }

const Players = () =>
{
  const { data, isLoading } = usePlayers();
  
  if (isLoading) {
    return <h1>Loading...</h1>
  }

  const players = data.data.players;
  // const {data, error, isError, isLoading } = useQuery('posts', fetchPosts) // first argument is a string to cache and track the query result
  // if(isLoading){
  //     return <div>Loading...</div>
  // }
  // if(isError){
  //     return <div>Error! {error.message}</div>
  // }

  var rows = [];
  for (let i = 0; i < players.length; i++) {
    rows.push(<Player
      value={players[i].name} name={players[i].name} visible={true} />);
  }

  return (
    <div>
      {/* <Board
        playersDisabled={this.props.playersDisabled}
        onPlayerSelect={(value) => this.props.onPlayerSelect(value)}
        numbers={this.props.numbers} /> */}
      <div className="players">
        {rows}
      </div>
      <button type="button" className="btn btn-primary btn-lg player-reveal">Reveal</button>
    </div>
  );
}

export default Players;