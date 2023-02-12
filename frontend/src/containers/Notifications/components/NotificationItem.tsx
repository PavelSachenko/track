import { useState } from "react";
import { connect } from "react-redux";

import API from "../../../api/api";
import { INotification } from "../../../interfaces/interfaces";
import { getContactAvatar, classModifier } from "../../../utils";
import { AppState } from "../../../redux/store";
import { reduceNotificationsCount } from "../../../redux/ducks/notifications";
import { MODAL_TYPES, openModal } from "../../../redux/ducks/activeWindows";

import "./NotificationItem.scss";
import { ReactComponent as CheckIcon } from "../../../icons/check.svg";
import LazyLoadImage from "../../../components/LazyLoadImage/LazyLoadImage";
import AsyncBtn from "../../../components/AsyncBtn/AsyncBtn";

interface INotificationItemProps {
  itemId: number;
  className?: string;
  setAcceptedNotificationIds: (cb: (ids: number[]) => number[]) => void;
}

interface INotificationItemInjectedProps extends INotificationItemProps {
  item: INotification;
  openModal: (type: string, props: any) => void;
  reduceNotificationsCount: (value: number) => void;
}

const NotificationItem = (props: INotificationItemInjectedProps) => {
  const {
    item,
    itemId,
    className,
    openModal,
    reduceNotificationsCount,
    setAcceptedNotificationIds,
  } = props;

  const [isAccepted, setIsAccepted] = useState(false);

  const acceptNotification = () => {
    return API.acceptNotification(item.id)
      .then(() => {
        setIsAccepted(true);
        reduceNotificationsCount(1);
        setAcceptedNotificationIds((prev: number[]) => [...prev, itemId]);
      })
      .catch(console.error);
  };

  const declineNotification = () => {
    openModal(MODAL_TYPES.declineInviteModal, {
      itemId,
      token: item.id,
    });
  };

  const dateCreated = new Date(item.created_at).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div
      className={
        className ? `notification-item ${className}` : "notification-item"
      }
    >
      <div className="notification-item__header">
        <div className="notification-item__agency">
          <div className="notification-item__agency-avatar">
            <LazyLoadImage
              src={getContactAvatar({ img: item.img, type: item.type })}
            />
          </div>

          <div className="notification-item__agency-name">{item.name}</div>
        </div>

        <div className="notification-item__date">{dateCreated}</div>
      </div>

      <div className="notification-item__main">
        <div className="notification-item__title">
          The agency invites you to become a member.
        </div>
        <div className="notification-item__message">
          {item.message
            ? item.message
            : "”Greetings, we discussed this with you trough the phone. Hope you are accept our invite”"}
        </div>
      </div>

      <div className="notification-item__footer">
        <div className="notification-item__actions">
          {isAccepted ? (
            <div className="notification-item__action-btn notification-item__action-btn--accepted">
              <CheckIcon />
              <span>Accepted</span>
            </div>
          ) : (
            <AsyncBtn
              onClick={acceptNotification}
              type="button"
              spinnerSize="10px"
              className="notification-item__action-btn notification-item__action-btn--accept"
            >
              Accept
            </AsyncBtn>
          )}

          <button
            onClick={declineNotification}
            disabled={isAccepted}
            type="button"
            className={classModifier("notification-item__action-btn", [
              "decline",
              isAccepted && "disabled",
            ])}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (
  state: AppState,
  ownProps: INotificationItemProps
) => ({
  item: state.notifications.entities[ownProps.itemId],
});

const mapDispatchToProps = {
  openModal,
  reduceNotificationsCount,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationItem);
