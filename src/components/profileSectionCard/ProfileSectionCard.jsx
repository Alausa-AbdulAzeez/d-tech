import "./profileSectionCard.css";
import { Icon } from "@iconify/react";

const ProfileSectionCard = ({
  profileSection,
  isActive,
  onClick,
  isComplete,
}) => {
  return (
    <div
      className={`profile__section__card ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="profile__section__card__top">
        <h5 className="profile__section__card__title">
          {profileSection.title}
        </h5>
        {isComplete ? (
          <Icon
            icon="lets-icons:done-ring-round-light"
            className="done__icon"
          />
        ) : (
          <Icon icon="hugeicons:cancel-02" className="not__done__icon" />
        )}
      </div>

      <p
        className={`profile__section__card__completion__status ${
          isComplete ? "Completed" : "Incomplete"
        }`}
      >
        {isComplete ? "Completed" : "Incomplete"}
      </p>
    </div>
  );
};

export default ProfileSectionCard;
