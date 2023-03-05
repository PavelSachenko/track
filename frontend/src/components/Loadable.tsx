import { lazy } from "react";

const MainPage = lazy(
  () =>
    import(/* webpackChunkName: "MainPageChunk"*/ "../pages/MainPage/MainPage")
);
const SuccessRegisterModal = lazy(
  () =>
    import(
      /* webpackChunkName: "SuccessRegisterModalChunk"*/ "../containers/Modals/components/SuccessRegisterModal/SuccessRegisterModal"
    )
);
const Agencies = lazy(
  () =>
    import(
      /* webpackChunkName: "AgenciesChunk"*/ "../pages/AgenciesPage/AgenciesPage"
    )
);
const Agents = lazy(
  () =>
    import(
      /* webpackChunkName: "AgenciesChunk"*/ "../pages/AgentsPage/AgentsPage"
    )
);
const AgentSchedule = lazy(
  () =>
    import(
      /* webpackChunkName: "AgentScheduleChunk"*/ "../pages/AgentSchedulePage/AgentSchedulePage"
    )
);
const Notifications = lazy(
  () =>
    import(
      /* webpackChunkName: "NotificationsChunk"*/ "../pages/NotificationsPage/NotificationsPage"
    )
);
const Invites = lazy(
  () =>
    import(
      /* webpackChunkName: "InvitesChunk"*/ "../pages/InvitesPage/InvitesPage"
    )
);
const Settings = lazy(
  () =>
    import(
      /* webpackChunkName: "SettingsChunk"*/ "../pages/SettingsPage/SettingsPage"
    )
);
const SettingsGeneral = lazy(
  () =>
    import(
      /* webpackChunkName: "SettingsGeneralChunk"*/ "../pages/SettingsPage/SettingsGeneralPage"
    )
);
const SettingsSchedule = lazy(
  () =>
    import(
      /* webpackChunkName: "SettingsScheduleChunk"*/ "../pages/SettingsPage/SettingsSchedulePage"
    )
);
const SettingsSecurity = lazy(
  () =>
    import(
      /* webpackChunkName: "SettingsSecurityChunk"*/ "../pages/SettingsPage/SettingsSecurityPage"
    )
);
const SuccessPasswordChangeModal = lazy(
  () =>
    import(
      /* webpackChunkName: "SuccessPasswordChangeModalChunk"*/ "../containers/Modals/components/SuccessPasswordChangeModal/SuccessPasswordChangeModal"
    )
);
const SuccessPasswordRecoveryModal = lazy(
  () =>
    import(
      /* webpackChunkName: "SuccessPasswordRecoveryModalChunk"*/ "../containers/Modals/components/SuccessPasswordRecoveryModal/SuccessPasswordRecoveryModal"
    )
);
const AgentModal = lazy(
  () =>
    import(
      /* webpackChunkName: "AgentModalChunk"*/ "../containers/Modals/components/AgentModal/AgentModal"
    )
);
const InviteMemberModal = lazy(
  () =>
    import(
      /* webpackChunkName: "InviteMemberModalChunk"*/ "../containers/Modals/components/InviteMemberModal/InviteMemberModal"
    )
);
const InvitationInstructionsModal = lazy(
  () =>
    import(
      /* webpackChunkName: "InvitationInstructionsModalChunk"*/ "../containers/Modals/components/InvitationInstructionsModal/InvitationInstructionsModal"
    )
);
const DeleteAgentModal = lazy(
  () =>
    import(
      /* webpackChunkName: "DeleteAgentModalChunk"*/ "../containers/Modals/components/DeleteAgentModal/DeleteAgentModal"
    )
);
const DeleteInviteModal = lazy(
  () =>
    import(
      /* webpackChunkName: "DeleteInviteModalChunk"*/ "../containers/Modals/components/DeleteInviteModal/DeleteInviteModal"
    )
);
const DeleteAccountModal = lazy(
  () =>
    import(
      /* webpackChunkName: "DeleteAccountModalChunk"*/ "../containers/Modals/components/DeleteAccountModal/DeleteAccountModal"
    )
);
const DeclineInviteModal = lazy(
  () =>
    import(
      /* webpackChunkName: "DeclineInviteModalChunk"*/ "../containers/Modals/components/DeclineInviteModal/DeclineInviteModal"
    )
);
const EventModal = lazy(
  () =>
    import(
      /* webpackChunkName: "EventModalChunk"*/ "../containers/Modals/components/EventModal/EventModal"
    )
);
const DeleteEventModal = lazy(
  () =>
    import(
      /* webpackChunkName: "DeleteEventModalChunk"*/ "../containers/Modals/components/DeleteEventModal/DeleteEventModal"
    )
);
const AgencySchedule = lazy(
  () => import("../pages/AgencySchedulePage/AgencySchedulePage")
);

const Loadable = {
  MainPage,
  SuccessRegisterModal,
  Agencies,
  Agents,
  AgentSchedule,
  AgencySchedule,
  Notifications,
  Settings,
  SettingsGeneral,
  SettingsSchedule,
  SettingsSecurity,
  SuccessPasswordChangeModal,
  SuccessPasswordRecoveryModal,
  AgentModal,
  Invites,
  InviteMemberModal,
  InvitationInstructionsModal,
  DeleteAgentModal,
  DeleteInviteModal,
  DeleteAccountModal,
  DeclineInviteModal,
  EventModal,
  DeleteEventModal,
};

export default Loadable;
