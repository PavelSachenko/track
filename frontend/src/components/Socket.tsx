import { Component } from 'react';
import { connect } from 'react-redux';

import { SOCKET_ROOT } from '../config/socket-config';
import { addNotification, removeNotifications } from '../redux/ducks/notifications';
import { addAgent, addInvite, deleteInvite } from '../redux/ducks/agents';
import { addAgency, deleteAgency } from '../redux/ducks/agencies';
import { INotification, IInvite, IAgent, IAgency } from '../interfaces/interfaces';
import { setUser } from '../redux/ducks/user';
import { Centrifuge } from 'centrifuge';

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
    ws: new WebSocket(SOCKET_ROOT + "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiZXhwIjoxNjc2NTc3MjYyfQ.2RoZJxSBBdciS3QjtEZzIgtbiZVbtxtrT4xYKyoSqv8")
  }

  componentDidMount() {
    console.log("--------------------START----------------------------")
    this.setupSocket();
    console.log("--------------------END------------------------------")
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    const webSocket = this.state.ws;

    webSocket.close();
  }

  setupSocket = () => {
    const centrifuge = new Centrifuge('ws://localhost:8000/connection/websocket', {
      //CONNECTION_TOKEN must be obtained from Centrifuge::generateConnectionToken(...)
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiZXhwIjoxNjc2NTczNTA4LCJpbmZvIjp7Im5hbWUiOiJwYXNoYSJ9fQ.hWwDu5KMOkQfWSClA-J3DPNnFmtUumJaSD3lfXBzpdQ'
    })

    // @ts-ignore
    const sub = centrifuge.newSubscription('channel', {
      // @ts-ignore
      getToken: function (ctx) {
        return customGetToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiZXhwIjoxNjc2NjU5NzI4LCJjaGFubmVsIjoiY2hhbm5lbCIsImluZm8iOnsibmFtZSI6InBhc2hhIn19.bufo5mXTOxvjieVbjVtPb43kjgQoI93Mo53HBTaPjWk", ctx);
      },
    })

    // @ts-ignore
      function customGetToken(endpoint, ctx) {
      return new Promise((resolve, reject) => {
        fetch(endpoint, {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(ctx)
        })
            .then(res => {
              if (!res.ok) {
                throw new Error(`Unexpected status code ${res.status}`);
              }
              return res.json();
            })
            .then(data => {
              resolve(data.token);
            })
            .catch(err => {
              reject(err);
            });
      });
    }

    sub.subscribe();
    centrifuge.connect();
  }

  // setupSocket = () => {
  //   const webSocket = this.state.ws;
  //
  //   webSocket.onopen = () => {
  //     console.log('ChatWebSocket - trying to connect!)');
  //
  //     // webSocket.send(JSON.stringify({ type: 'hello', data: localStorage.token }));
  //     webSocket.send('{"connect":{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiZXhwIjoxNjc2NjU4OTMyLCJjaGFubmVsIjoiY2hhbm5lbCIsImluZm8iOnsibmFtZSI6InBhc2hhIn19.7OhmXX4zO7A8CVUubgUWv3-CU5--dVKbDO_apIgrDxY","name":"js"},"id":1}');
  //     // {"connect":{"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiZXhwIjoxNjc2NjMxNTUxfQ.F5okde1HCtFy1E_ObLNb_jR0kWfCFYla5TPnWwkfasY","name":"js"},"id":1}
  //     // {"subscribe":{"channel":"channel"},"id":2}
  //   };
  //
  //   webSocket.onclose = () => {
  //     console.log('ChatWebSocket disconnected!(');
  //   };
  //
  //   webSocket.onerror = (err) => {
  //     console.log('ChatWebSocket error: ', err);
  //   };
  //
  //   webSocket.onmessage = (e: MessageEvent) => {
  //     const { data, type } = JSON.parse(e.data);
  //
  //     console.log('WebSocket event happen!:', 'type:', type, ', data:', data);
  //
  //     switch (type) {
  //       case 'notifications': {
  //         switch (data.type) {
  //           case 'invite': {
  //             this.props.addNotification(data.subscription);
  //             break;
  //           }
  //
  //           case 'delete': {
  //             this.props.removeNotifications([data.subscription.id]);
  //             break;
  //           }
  //
  //           default:
  //             break;
  //         }
  //
  //         break;
  //       }
  //
  //       case 'invites': {
  //         switch (data.type) {
  //           case 'add': {
  //             this.props.addInvite(data.subscription);
  //             break;
  //           }
  //
  //           default:
  //             break;
  //         }
  //
  //         break;
  //       }
  //
  //       case 'agents': {
  //         switch (data.type) {
  //           case 'new_member': {
  //             this.props.addAgent(data.user);
  //             break;
  //           }
  //
  //           case 'delete_invite': {
  //             this.props.deleteInvite(data.subscription.id)
  //             break;
  //           }
  //
  //           default:
  //             break;
  //         }
  //
  //         break;
  //       }
  //
  //       case 'agencies': {
  //         switch (data.type) {
  //           case 'new_agency': {
  //             this.props.addAgency(data.agency);
  //             break;
  //           }
  //
  //           case 'remove_agency': {
  //             this.props.deleteAgency(data.agency.id);
  //             break;
  //           }
  //
  //           default:
  //             break;
  //         }
  //
  //         break;
  //       }
  //
  //       case 'user': {
  //         switch (data.type) {
  //           case 'update': {
  //             this.props.setUser(data.user);
  //             break;
  //           }
  //
  //           default: break;
  //         }
  //
  //         break;
  //       }
  //     }
  //   }
  // }

  render() {
    return null;
  }
}

const mapDispatchToProps = {
  setUser,
  addAgent,
  addInvite,
  deleteInvite,
  addAgency,
  deleteAgency,
  addNotification,
  removeNotifications
}

export default connect(null, mapDispatchToProps)(Socket);