import AgentAvatar from '../icons/agent-avatar.svg';
import AgencyAvatar from '../icons/agency-avatar.svg';

const getContactAvatar = (client: { img: null | string, type: number }) => {
  let defaultAvatar;

  switch (client.type) {
    case 1:
      defaultAvatar = AgentAvatar;
      break;
    case 2:
      defaultAvatar = AgencyAvatar;
      break;
    default:
      defaultAvatar = AgentAvatar;
      break;
  }

  if (!client.img) {
    return defaultAvatar;
  }
  else {
    return client.img;
  }
}

export default getContactAvatar;