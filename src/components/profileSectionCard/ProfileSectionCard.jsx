import React from "react";
import "./profileSectionCard.css";
import { Icon } from "@iconify/react";

const ProfileSectionCard = ({ profileSection, isActive, onClick }) => {
  return (
    <div
      className={`profile__section__card ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="profile__section__card__top">
        <h5 className="profile__section__card__title">
          {profileSection.title}
        </h5>
        <Icon icon="lets-icons:done-ring-round-light" className="done__icon" />
      </div>
      <p className="profile__section__card__completion__status">Completed</p>
    </div>
  );
};

export default ProfileSectionCard;
