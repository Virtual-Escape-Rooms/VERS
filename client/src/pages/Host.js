import React, { Component } from 'react';
import * as SocketIO from "socket.io-client";

import './Host.css'

import Chat from "../components/Chat";
import Timer from "../components/Timer";
import Elevator from  "../components/Elevator";
import ActorMoving from "../components/ActorMoving";
import VaultDoor from "../components/VaultDoor";

import warehouse_1dark_preview from "../warehouse_images/warehouse-1dark-preview.jpg";
import warehouse_2thermal_preview from "../warehouse_images/warehouse-2thermal-preview.jpg";
import warehouse_3powered_preview from "../warehouse_images/warehouse-3powered-preview.jpg";

const baseURL = new URL(window.location.href).host;

const chatFiles = {
  floor_plan_4: <div className="file"><strong>Floor Plan 4.bp</strong></div>,

  no_thermal_warehouse: <img src={warehouse_1dark_preview} style={{ height: "60px", width: "80px" }}/>,

  thermal_warehouse: <img src={warehouse_2thermal_preview} style={{ height: "60px", width: "80px" }}/>,

  thermal_warehouse_wires: <img src={warehouse_3powered_preview} style={{ height: "60px", width: "80px" }}/>,

  elevator_landing: <img src="/hallways/hallway.jpg" style={{ height: "60px", width: "80px" }}/>,
  vault_door: <img src="/vault/door.jpg" style={{ height: "60px", width: "80px" }}/>,
}

class Host extends Component {
  // Initialize the state
  constructor(props){
    super(props);

    this.socket = SocketIO(baseURL);
    this.room = this.props.match.params.code;

    this.state = {
        state: 0,
        lines: [],
        chatColor: "#65fc31"
    }

    this.socket.on("joinRoomStatus", ({ state }) => {
        this.setState({ 
          state,
          lines: this.getLines(state),
        });
    });

    this.socket.on("roomStateUpdate", ({state}) => {
      this.setState({ 
        state,
        lines: this.getLines(state),
      });
    });

    this.socket.on("floor-plan-wrong", ({line}) => {
      this.setState({ 
        lines: [line],
      });
    });
  }

  // Fetch the list on first mount
  componentDidMount() {
    this.socket.emit("joinRoom", { room: this.room, password: "HOST" });
  }

  render() {
    return (
      <div className="app host">
        <div className="header">
          <h1>Actor's Panel ({this.room})</h1>
        </div>
        <div className="body">
          <div className="main">
            <div className="location">
              <h2>Location:</h2>
              <h2>{ this.getLocation() } ({this.state.state} / 80)</h2>
            </div>
            <div className="line-prompter">
              <h2>Line Prompter</h2>
              {this.state.lines.map((line, key) => (<p key={key}>{line}</p>))}
            </div>
            <div className="available-actions">
              <h2>Available Actions</h2>
            {this.renderMain()}
            </div>
          </div>
          <div className="side-bar">
            <Timer socket={this.socket}/>
            <Chat room={this.room} viewer="@lex" chatColor={this.state.chatColor} files={chatFiles} socket={this.socket}/>
          </div>
        </div>
      </div>
    );
  }

  getLocation = () => {
    if (this.state.state < 10) {
      return "Outside Warehouse";
    }
    else if (this.state.state < 20) {
      return "Warehouse";
    }
    else if (this.state.state < 30) {
      return "Elevator";
    }
    else if (this.state.state < 40) {
      return "Hallways Near Elevator";
    }
    else if (this.state.state < 50) {
      return "Hallways";
    }
    else if (this.state.state < 60) {
      return "Outside Alien Room";
    }
    else if (this.state.state < 70) {
      return "Inside Alien Room";
    }
    else if (this.state.state < 80) {
      return "Success";
    }
    else if (this.state.state < 90) {
      return "Failure";
    }
    return "Unknown";
  }

  getLines = (state) => {
    switch (state) {
      case 0:
        return ["It's dark in here... from what I can see it looks like any ordinary warehouse?"];
      case 10:
        return ["I'm enter the facility. I think I tripped an alarm. The average response time is about an hour. You can use the timer application to keep track."];
      case 20:
        return ["I've attached the device to hack into their system. I'm going to head toward the elevator. What floor should I head to?"];
      case 30:
        return ["This looks like the right floor, but it looks like they have a lot of security installed. We will need to plot out where these sensors are.", "Feel free to send the map for me to double check!"];
      case 40:
        return ["This map looks like what I am seeing here. I've shared my location with you and am streaming a feed of an electrical panel. I am wearing laser reflecting material so don't worry about tripping the laser trip wires. Please guide me!"];
      case 50:
        return ["I'm at the vault door! There is terminal asking for a Guard's ID number."];
      case 60:
        return ["I'm inside the vault."];
      case 70:
        return [];
      case 80:
        return [];
      default:
        return ["Something wrong has occured"];
    }
  }

  renderMain = () => {
    switch (this.state.state) {
      case 0:
        return(
          <div>
            <button onClick={() => {
              this.socket.emit("start-time", {room: this.room});
            }}>Start Timer</button>

            {/*Example Button for sending file1*/}
            {/* <button onClick={() => {
              this.sendFile("file1");
            }}>Send File 1</button> */}

          </div>
        )
      case 10:
        return(
          <div>
            <button onClick={() => {
              this.sendFile("no_thermal_warehouse");
            }}>Send Dark Warehouse Image</button>
            <button onClick={() => {
              this.sendFile("thermal_warehouse");
            }}>Send Thermal Warehouse Image (Power Off)</button>
            <button onClick={() => {
              this.sendFile("thermal_warehouse_wires");
            }}>Send Thermal Warehouse Image (Power On)</button>
            <button onClick={() => {
              this.socket.emit("setRoomState", {roomCode: this.room, state: 20});
            }}>Move to Elevator</button>
          </div>
        )
      case 20:
        return(
          <div>
            <Elevator successCallback={() => {
              this.socket.emit("setRoomState", {roomCode: this.room, state: 30});
            }}/>
          </div>
        )
      case 30:
        return <button onClick={() => {
          this.sendFile("elevator_landing");
        }}>Send Hallway Image</button>;
      case 40:
            return <ActorMoving socket={this.socket} room={this.room} />;
      case 50: 
            return <>
              <button onClick={() => {
                this.sendFile("vault_door");
              }}>Send Vault Door Image</button>
              <VaultDoor socket={this.socket} room={this.room} /></>
      case 60:
        return <button onClick={() => {
          this.socket.emit("setRoomState", {roomCode: this.room, state: 70});
          }}>Complete Mission</button>
      default:
        return "Something wrong has occured";
    }
  }

  // Use this function to "send" files
  // content should be the id specified in Guest
  sendFile = (content) => {
    this.socket.emit("newFileMessage", {content, sender: "@lex", roomCode: this.room, color: this.state.chatColor });
  }
}

export default Host;