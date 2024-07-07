import "./profile.css";
import {
  ProfileSectionCard,
  ProfessionalExperienceForm,
  ResumeUpload,
  NavButton,
  SkillsAndTools,
} from "../index";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PersonalDetailsForm from "../personalDetailsForm/PersonalDetailsForm";

const Profile = () => {
  const profileSections = [
    { title: "Resume", profileIndex: 1 },
    { title: "Personal details", profileIndex: 2 },
    { title: "Professional experience", profileIndex: 3 },
    { title: "Skills & Tools", profileIndex: 4 },
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

    // Delete the 'exp_sub' parameter
    params.delete("exp_sub");
    params.delete("exp_id");
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

  // Function to check the complete state of a section
  const checkCompleteState = (title) => {
    let state;
    switch (title) {
      case "Resume":
        state = localStorage.getItem(title);
        return state;
      case "Personal details":
        const storedPersonalDetails = JSON.parse(
          localStorage.getItem("Personal details")
        );
        if (
          storedPersonalDetails.firstname &&
          storedPersonalDetails.surname &&
          storedPersonalDetails.email &&
          storedPersonalDetails.phone &&
          storedPersonalDetails.jobtitle &&
          storedPersonalDetails.gender &&
          storedPersonalDetails.country
        ) {
          state = true;
        } else {
          state = false;
        }
        return state;
      case "Skills & Tools":
        const storedSkillsAndTools = JSON.parse(
          localStorage.getItem("Skills & Tools")
        );
        if (storedSkillsAndTools.primarySkills.length > 0) {
          state = true;
        } else {
          state = false;
        }
        return state;
      case "Professional experience":
        const storedProfessionalExperience = JSON.parse(
          localStorage.getItem("Professional experience")
        );
        if (storedProfessionalExperience.length > 0) {
          state = true;
        } else {
          state = false;
        }
        return state;
      default:
        break;
    }
  };
  // End ofunction to check the complete state of a section

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
                isComplete={checkCompleteState(title)}
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
            {activeSection.title === "Skills & Tools" && (
              <SkillsAndTools
                setCompletionStatus={(isComplete) =>
                  setSectionCompletion("Skills & Tools", isComplete)
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
