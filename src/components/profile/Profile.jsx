import "./profile.css";
import {
  ProfileSectionCard,
  ProfessionalExperienceForm,
  ResumeUpload,
  NavButton,
} from "../index";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PersonalDetailsForm from "../personalDetailsForm/PersonalDetailsForm";

const Profile = () => {
  const profileSections = [
    { title: "Resume", profileIndex: 1 },
    { title: "Personal details", profileIndex: 2 },
    { title: "Professional experience", profileIndex: 3 },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  const getSectionFromQuery = () => {
    const params = new URLSearchParams(location.search);
    const sectionIndex = params.get("section");
    return profileSections[sectionIndex - 1] || profileSections[0];
  };

  const [activeSection, setActiveSection] = useState(getSectionFromQuery);
  const [completionStatus, setCompletionStatus] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("section", activeSection.profileIndex);
    navigate(`?${params.toString()}`, { replace: true });
  }, [activeSection, navigate]);

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const setSectionCompletion = (sectionTitle, isComplete) => {
    setCompletionStatus((prevStatus) => ({
      ...prevStatus,
      [sectionTitle]: isComplete,
    }));

    // localStorage.setItem(
    //   "completionStatus",
    //   JSON.stringify({
    //     ...completionStatus,
    //     [sectionTitle]: isComplete,
    //   })
    // );
  };

  // useEffect(()=>{
  //   const storedCompletionStatus = JSON.parse(
  //     localStorage.getItem("completionStatus")
  //   );
  //   if (storedCompletionStatus) {
  //     setSelectedResume(storedResume);
  //     setResume(true);
  //     setCompletionStatus(true);
  //   } else {
  //     setCompletionStatus(false);
  //   }
  // },[])

  return (
    <div className="profile__container">
      <h3 className="your__profile__text">Your profile</h3>
      <div className="profile__content__container">
        <div className="profile__content__left">
          {profileSections?.map((profileSection) => {
            const { profileIndex, title } = profileSection;

            return (
              <ProfileSectionCard
                key={profileIndex}
                profileSection={profileSection}
                isActive={profileIndex === activeSection.profileIndex}
                onClick={() => handleSectionClick(profileSection)}
                isComplete={localStorage.getItem([title])}
              />
            );
          })}
        </div>
        <div className="profile__content__right">
          <div className="profile__content__right__header">
            <p className="profile__content__right__header__title">
              {activeSection.title}
            </p>
            <div className="profile__content__right__header__count">
              {activeSection.profileIndex}/
              <span className="profile__section__length">
                {profileSections.length}
              </span>
            </div>
          </div>
          <div>
            {activeSection.title === "Resume" && (
              <ResumeUpload
                setCompletionStatus={(isComplete) =>
                  setSectionCompletion("Resume", isComplete)
                }
              />
            )}
            {activeSection.title === "Personal details" && (
              <PersonalDetailsForm
                setCompletionStatus={(isComplete) =>
                  setSectionCompletion("Personal details", isComplete)
                }
              />
            )}
            {activeSection.title === "Professional experience" && (
              <ProfessionalExperienceForm />
            )}
          </div>
          <div className="profile__content__right__nav">
            <div className="nav__mask nav__mask__left">
              {activeSection.profileIndex > 1 && (
                <NavButton
                  text={
                    profileSections[Number(activeSection.profileIndex) - 2]
                      ?.title
                  }
                  handleClick={() =>
                    handleSectionClick(
                      profileSections[Number(activeSection.profileIndex) - 2]
                    )
                  }
                  leftIcon={activeSection.profileIndex > 1}
                />
              )}
            </div>
            <div className="nav__mask nav__mask__right">
              {activeSection.profileIndex < profileSections.length && (
                <NavButton
                  text={
                    profileSections[Number(activeSection.profileIndex)]?.title
                  }
                  handleClick={() =>
                    handleSectionClick(
                      profileSections[Number(activeSection.profileIndex)]
                    )
                  }
                  rightIcon={
                    activeSection.profileIndex < profileSections.length
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
