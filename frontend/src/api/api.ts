import axiosInstance from "../services/axiosInstance";

import { IAgentsConfig } from "../redux/ducks/ducks.types";
import { IResetPasswordFormValues } from "../containers/SettingsSecurity/SettingsSecurity";
import { IDay } from "../containers/SettingsSchedule/SettingsSchedule.types";

const logoutUser = () => axiosInstance.post("auth/logout");

const getUser = () => {
  return axiosInstance.get("user");
};

const updateUser = (user: {
  img?: any;
  url?: string;
  name: string;
  type?: number;
  phone?: string;
  description?: string;
}) => {
  // const User = new FormData();

  // User.set("name", user.name || "");
  // User.set("phone", user.phone || "");
  // User.set("description", user.description || "");
  // typeof user.img !== "string" && User.set("img", user.img || "");
  // user.type === 2 && User.set("url", user.url || "");

  const UserInfo: {
    name: string;
    description: string;
    phone: string;
    url: string;
  } = {
    name: user.name ? user.name : "",
    description: user.description ? user.description : "",
    phone: user.phone ? user.phone : "",
    url: user.url ? user.url : "",
  };

  console.log(user);

  return axiosInstance.patch("user/update", UserInfo);
};

const updateUserAvatar = (img: any) => {
  const UserAvatar = new FormData();

  typeof img !== "string" && UserAvatar.set("img", img || "");

  return axiosInstance.post("user/update-avatar", UserAvatar);
};

const deleteUser = () => {
  return axiosInstance.delete("user/delete");
};

const changePassword = (values: IResetPasswordFormValues) => {
  const Password: {
    old_password: string;
    new_password: string;
    new_password_confirmation: string;
  } = {
    old_password: values.oldPassword,
    new_password: values.newPassword,
    new_password_confirmation: values.passwordConfirmation,
  };

  return axiosInstance.put("user/update-password", Password);
};

const getAgencies = (limit: number = 10, offset?: number, search?: string) => {
  const apiConfig: {
    params: {
      limit: number;
      offset?: number;
      search?: string;
    };
  } = {
    params: {
      limit,
    },
  };

  if (offset) {
    apiConfig.params.offset = offset;
  }

  if (search) {
    apiConfig.params.search = search;
  }

  return axiosInstance.get("agent/subscription/followers", apiConfig);
};

const getAgenciesCount = () => {
  return axiosInstance.get("agent/subscription/count-followers");
};

const getAgents = (config: IAgentsConfig) => {
  const apiConfig: {
    params: {
      limit: number;
      search?: string;
      status?: number;
      offset?: number;
    };
  } = {
    params: {
      limit: 10,
    },
  };

  if (config.search) {
    apiConfig.params.search = config.search;
  }
  if (config.filterStatus) {
    apiConfig.params.status = config.filterStatus;
  }
  if (config.offset) {
    apiConfig.params.offset = config.offset;
  }

  return axiosInstance.get("agency/subscription/follows", apiConfig);
};

const getInvites = (offset?: number) => {
  const apiConfig: {
    params: {
      limit: number;
      offset?: number;
    };
  } = {
    params: {
      limit: 10,
    },
  };

  if (offset) {
    apiConfig.params.offset = offset;
  }

  return axiosInstance.get("agency/subscription/requests", apiConfig);
};

const getInvitesCount = () => {
  return axiosInstance.get("agency/subscription/count-follows");
};

const sendInvite = (email: string) => {
  const Invite = new FormData();

  Invite.set("email", email);

  return axiosInstance.post("agency/subscription/send-request", Invite);
};

const unsubscribeAgent = (id: string) => {
  return axiosInstance.delete(`agency/subscription/unsubscribe/${id}`);
};

const getNotificationsCount = () => {
  return axiosInstance.get("agent/subscription/count-requests");
};

const getNotificationsCountAgency = () => {
  return axiosInstance.get("agency/subscription/count-requests");
};

const getNotifications = (offset?: number) => {
  const apiConfig: {
    params: {
      limit: number;
      offset?: number;
    };
  } = {
    params: {
      limit: 10,
    },
  };

  if (offset) {
    apiConfig.params.offset = offset;
  }

  return axiosInstance.get("agent/subscription/requests", apiConfig);
};

const acceptNotification = (id: number) => {
  const Id = new FormData();

  Id.set("id", JSON.stringify(id));

  return axiosInstance.post("agent/subscription/accept", Id);
};

const declineNotification = (id: number) => {
  const Id = { id };

  return axiosInstance.patch("agent/subscription/decline", Id);
};

const deleteInvite = (id: number) => {
  return axiosInstance.delete(`agency/subscription/invite/${id}`);
};

const getWorkTime = () => {
  return axiosInstance.get("agent/settings/schedule/work-time");
};

const setWorkTime = (config: { mode: string; times: IDay | IDay[] }) => {
  const apiConfig: {
    mode: string;
    times: string;
  } = {
    mode: config.mode,
    times: JSON.stringify(config.times),
  };

  return axiosInstance.patch(
    "agent/settings/schedule/set-work-time",
    apiConfig
  );
};

const getAgentSchedule = (date: number) => {
  return axiosInstance.get("agent/schedule", { params: { date } });
};

const addEvent = (
  config: {
    id: null | number;
    start: number;
    end: number;
    agencyId: number;
    type: string;
    description: string;
  },
  action?: string
) => {
  const WorkRecord = new FormData();

  WorkRecord.set("end", JSON.stringify(config.end));
  WorkRecord.set("type", config.type);
  WorkRecord.set("start", JSON.stringify(config.start));
  config.description && WorkRecord.set("description", config.description);
  config.agencyId &&
    WorkRecord.set("agencyId", JSON.stringify(config.agencyId));

  let configApi: {
    id: number | null;
    start: number;
    end: number;
    agencyId?: number;
    type: string;
    description?: string;
  } = {
    id: config.id,
    start: config.start,
    end: config.end,
    type: config.type,
  };

  if (config.description) {
    configApi.description = config.description;
  }

  if (config.agencyId != 0) {
    configApi.agencyId = config.agencyId;
  }

  return action === "update"
    ? axiosInstance.put(
        `agent/schedule/update-work-record/${config.id}`,
        configApi
      )
    : axiosInstance.post("agent/schedule/add-work-record", WorkRecord);
};

const deleteEvent = (eventId: number) => {
  return axiosInstance.delete(`agent/schedule/drop-work-record/${eventId}`);
};

const changeWorkingStatus = (status: 0 | 1) => {
  // const WorkingStatus = new FormData();

  // WorkingStatus.set("is_available", JSON.stringify(status));

  const WorkingStatus = {
    is_available: JSON.stringify(status),
  };

  return axiosInstance.patch(
    "agent/settings/schedule/set-working-status",
    WorkingStatus
  );
};

const API = {
  logoutUser,
  getUser,
  getAgencies,
  getAgenciesCount,
  updateUser,
  deleteUser,
  changePassword,
  getAgents,
  getInvites,
  getInvitesCount,
  sendInvite,
  unsubscribeAgent,
  getNotificationsCount,
  getNotifications,
  acceptNotification,
  declineNotification,
  deleteInvite,
  getWorkTime,
  setWorkTime,
  getAgentSchedule,
  addEvent,
  deleteEvent,
  changeWorkingStatus,
  getNotificationsCountAgency,
  updateUserAvatar,
};

export default API;
