import { Component } from 'react';
import { connect } from 'react-redux';
// @ts-ignore
import Centrifuge from 'centrifuge';
import { SOCKET_ROOT } from '../config/socket-config';
// import { addNotification, removeNotifications } from '../redux/ducks/notifications';
// import { addAgent, addInvite, deleteInvite } from '../redux/ducks/agents';
// import { addAgency, deleteAgency } from '../redux/ducks/agencies';
import { INotification, IInvite, IAgent, IAgency } from '../interfaces/interfaces';
// import { setUser } from '../redux/ducks/user';

interface ISocketProps {
  addAgent: (agent: IAgent) => void;
  addAgency: (agency: IAgency) => void;
  addInvite: (invite: IInvite) => void;
  deleteInvite: (id: number) => void;
  deleteAgency: (id: number) => void;
  setUser: (user: IAgent | IAgency) => void;
  addNotification: (notification: INotification) => void;
  removeNotifications: (ids: number[]) => void;
}

class Socket extends Component<ISocketProps> {
  state = {
    ws: new WebSocket(SOCKET_ROOT)
  }

  componentDidMount() {
    this.setupSocket();
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    const webSocket = this.state.ws;

    webSocket.close();
  }

  setupSocket = () => {
    console.log("--------------START-------------------")
    const centrifuge = new Centrifuge('ws://localhost:8000/connection/websocket');
    centrifuge.setToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaW5mbyI6eyJuYW1lIjoicGFzaGEifX0.X0kGGJfG8-BJjwP3Mo3waIODT2nVdtLIFgP76pAH7i8");

    centrifuge.subscribe("test", function(ctx: { data: any; }) {
      console.log(ctx.data)
    });

    centrifuge.connect();
    console.log("---------------END--------------------")
    //
    // var centrifuge = new Centrifuge('ws://centrifuge.example.com/connection/websocket');
    //
    // centrifuge.subscribe("news", function(message) {
    //   console.log(message);
    // });
    //
    // centrifuge.connect();
    //
    // const webSocket = this.state.ws;
    //
    // webSocket.onopen = () => {
    //   console.log('ChatWebSocket - trying to connect!)');
    //
    //   webSocket.send(JSON.stringify({ type: 'hello', data: localStorage.token }));
    // };
    //
    // webSocket.onclose = () => {
    //   console.log('ChatWebSocket disconnected!(');
    // };
    //
    // webSocket.onerror = (err) => {
    //   console.log('ChatWebSocket error: ', err);
    // };
    //
    // webSocket.onmessage = (e: MessageEvent) => {
    //   const { data, type } = JSON.parse(e.data);
    //
    //   console.log('WebSocket event happen!:', 'type:', type, ', data:', data);
    //
    //   switch (type) {
    //     case 'notifications': {
    //       switch (data.type) {
    //         case 'invite': {
    //           this.props.addNotification(data.subscription);
    //           break;
    //         }
    //
    //         case 'delete': {
    //           this.props.removeNotifications([data.subscription.id]);
    //           break;
    //         }
    //
    //         default:
    //           break;
    //       }
    //
    //       break;
    //     }
    //
    //     case 'invites': {
    //       switch (data.type) {
    //         case 'add': {
    //           this.props.addInvite(data.subscription);
    //           break;
    //         }
    //
    //         default:
    //           break;
    //       }
    //
    //       break;
    //     }
    //
    //     case 'agents': {
    //       switch (data.type) {
    //         case 'new_member': {
    //           this.props.addAgent(data.user);
    //           break;
    //         }
    //
    //         case 'delete_invite': {
    //           this.props.deleteInvite(data.subscription.id)
    //           break;
    //         }
    //
    //         default:
    //           break;
    //       }
    //
    //       break;
    //     }
    //
    //     case 'agencies': {
    //       switch (data.type) {
    //         case 'new_agency': {
    //           this.props.addAgency(data.agency);
    //           break;
    //         }
    //
    //         case 'remove_agency': {
    //           this.props.deleteAgency(data.agency.id);
    //           break;
    //         }
    //
    //         default:
    //           break;
    //       }
    //
    //       break;
    //     }
    //
    //     case 'user': {
    //       switch (data.type) {
    //         case 'update': {
    //           this.props.setUser(data.user);
    //           break;
    //         }
    //
    //         default: break;
    //       }
    //
    //       break;
    //     }
    //   }
    // }
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = {
  // setUser,
  // addAgent,
  // addInvite,
  // deleteInvite,
  // addAgency,
  // deleteAgency,
  // addNotification,
  // removeNotifications
}

export default connect(null, mapDispatchToProps)(Socket);