

import React from 'react';
import { connect } from 'react-redux';

import { classModifier, getContactAvatar } from '../../../utils'
import { IAgency } from '../../../interfaces/interfaces';

import './AgencyItem.scss';
import { ReactComponent as PhoneIcon } from '../../../icons/phone.svg';
import { ReactComponent as MailIcon } from '../../../icons/mail.svg';
import { ReactComponent as TimeIcon } from '../../../icons/time.svg';
import { ReactComponent as GearIcon } from '../../../icons/gear.svg';
import LazyLoadImage from '../../../components/LazyLoadImage/LazyLoadImage';
import { AppState } from '../../../redux/store';

interface IAgencyProps {
  itemId: number;
  className?: string;
}

interface IAgencyInjectedProps extends IAgencyProps {
  agency: IAgency;
}

const Agency = ({ agency, className }: IAgencyInjectedProps) => {
  return (
    <div className={className ? `agency ${className}`: 'agency'}>
      <div className="agency__header">
        <div className="agency__header-left">
          <div className={classModifier('agency__avatar', (Math.random() > 0.5) ? 'online' : '')}>
            <LazyLoadImage src={getContactAvatar(agency)} />
          </div>

          <div className="agency__name">
            {agency.name}
          </div>
        </div>

        <button className="agency__settings-btn" type="button">
          <GearIcon />
        </button>
      </div>

      <div className="agency__info">
        {agency.phone &&
          <div className="agency__info-item agency__info-item--tel">
            <PhoneIcon className="agency__info-icon agency__info-icon--tel"/>
            <span>{agency.phone}</span>
          </div>
        }

        <div className="agency__info-item agency__info-item--email">
          <MailIcon className="agency__info-icon agency__info-icon--email" />
          <span>{agency.email}</span>
        </div>
      </div>

      <div className="agency__footer">
        <div className="agency__work-time">
          <TimeIcon className="agency__work-time-icon"/>
          <span>8:00am - 7:00 pm</span>
        </div>

        <div className="agency__actions">
          <button className="agency__details-btn" type="button">Details</button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: AppState, ownProps: IAgencyProps) => ({
  agency: state.agencies.entities[ownProps.itemId]
})

export default connect(mapStateToProps)(Agency)
