import { Component } from "react";
import { connect } from "react-redux";

// import { SOCKET_ROOT } from '../config/socket-config';
import { API_ROOT } from "../services/axiosInstance";
import {
  addNotification,
  removeNotifications,
} from "../redux/ducks/notifications";
import { addAgent, addInvite, deleteInvite } from "../redux/ducks/agents";
import { addAgency, deleteAgency } from "../redux/ducks/agencies";
import {
  INotification,
  IInvite,
  IAgent,
  IAgency,
} from "../interfaces/interfaces";
import { setUser } from "../redux/ducks/user";
// @ts-ignore
// const PusherJS = require('pusher-js');
import Echo from "laravel-echo";
// @ts-ignore
import Pusher from "pusher-js";
// @ts-ignore
window.Pusher = require("pusher-js");

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
  // state = {
  //   ws: 'test'
  // }

  componentDidMount() {
    console.log("-------------------------START------------------------------");
    this.setupSocket();
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    // const webSocket = this.state.ws;
    // webSocket.close();
  }

  setupSocket = () => {
    // const webSocket = this.state.ws;
    //--------------------------------------------------------------------------------------------------------
    const pusher = new Pusher("app-key", {
      cluster: "",
      forceTLS: false,
      //TODO get from config file
      wsHost: "127.0.0.1",
      //TODO get from config file
      wsPort: 6001,
      enabledTransports: ["ws"],
      // authEndpoint: "http://track.local/api/auth/socket/registration-channel",
      auth: {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
      userAuthentication: {
        transport: "ajax",
        //TODO get from config file uri like http://track.local/ and concat
        endpoint: `${API_ROOT}auth/socket/set-user-connection`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
      channelAuthorization: {
        transport: "ajax",
        //TODO get from config file uri like http://track.local/ and concat
        endpoint: `${API_ROOT}auth/socket/registration-channel`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      },
    });
    pusher.signin();
    pusher.connect();

    // @ts-ignore
    pusher.user.bind("test-event", (data: any) => {
      console.log(data);
    });

    // for agent
    // @ts-ignore
    pusher.bind("new_invite", (data: any) => {
      console.log("Socket_data_new_invite");
      console.log(data);
      this.props.addNotification(data);
    });

    //hello
    // for agency
    // @ts-ignore
    pusher.bind("accept_invite", (data: any) => {
      console.log("Socket_data_accept_invite");
      console.log(data);
      this.props.deleteInvite(data);
    });

    // for agency
    // @ts-ignore
    pusher.bind("decline_invite", (data: any) => {
      console.log("Socket_data_decline_invite");
      console.log(data);
      this.props.deleteInvite(data);
    });

    pusher.bind("new_agent", (data: any) => {
      console.log("Socket_data_new_agent");
      console.log(data);
      this.props.addAgent(data);
    });

    // @ts-ignore
    pusher
      .subscribe("private-channel." + 1)
      .bind("new-message", function (data: any) {
        console.log(data);
      });

    // @ts-ignore
    let channel = pusher.subscribe("presence-channel");
    channel.bind("test-event", (data: any) => {
      console.log(data);
    });

    //--------------------------------------------------------------------------------------------------------

    // const echo = new Echo({
    //   broadcaster: 'pusher',
    //   key: 'app-key',
    //   wsHost: '127.0.0.1',
    //   wsPort: 6001,
    //   forceTLS: false,
    //   disableStats: true,
    //   cluster: '',
    //   flash: true,
    //   encrypted: true,
    //   authEndpoint: "http://track.local/api/auth/socket/registration-channel",
    //   auth: {
    //     headers: {
    //       Authorization: "Bearer " + localStorage.getItem("token"),
    //       Accept: "application/json"
    //     }
    //   }
    //
    //
    // });
    //
    //
    // echo.private("test").listen('my-event', (data: any) => {
    //   console.log('Received data:', data);
    // })
    //
    // echo.join("test").listen('my-event', (data: any) => {
    //     console.log('Received data:', data);
    // })

    // @ts-ignore
    // const userId = 1; // replace with the ID of the current user
    // echo.private(`private-channel.${userId}`).listen('.test-event', (data: any) => {
    //   console.log(data);
    // });
    //
    // echo.channel('private-channel.1').listen('test-event', (data: any) => {
    //   console.log(data)
    // }).subscribed((data: any) => {
    //   console.log(data)
    // })
    //
    // echo.channel('private-channel.1').subscribed((data: any) => {
    //   console.log(data)
    // })
    // echo.channel('my-channel')
    //     .listen('my-event', (data: any) => {
    //       console.log('Received data:', data);
    //       // Do something with the received data
    //     });

    // echo.

    // echo.private()

    // echo.listen('my-channel', 'my-event', function (e: any){
    //   console.log(e)
    // })
    // @ts-ignore
    // echo.connect()

    // client.subscribe('my-channel').bind('message', (message: { sender: any; content: any; }) => {
    //   console.log(`${message.sender} says: ${message.content}`);
    // });

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
  };

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
  removeNotifications,
};

export default connect(null, mapDispatchToProps)(Socket);
