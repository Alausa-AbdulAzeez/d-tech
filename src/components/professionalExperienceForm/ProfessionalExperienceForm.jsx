import { useLocation, useNavigate } from "react-router-dom";
import "./professionalExperienceForm.css";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { SectionCTA, SingleWorkHistory } from "../index";
import { arrowDown, ghost } from "../../assets/images";

const ProfessionalExperienceForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [professionalExperience, setProfessionalExperience] = useState([]);

  useEffect(() => {
    const storedProfessionalExperience = JSON.parse(
      localStorage.getItem("Professional experience")
    );
    if (storedProfessionalExperience) {
      setProfessionalExperience(storedProfessionalExperience);
    }
  }, []);

  const getSectionFromQuery = () => {
    const params = new URLSearchParams(location.search);
    const subSectionId = params.get("exp_sub");
    return subSectionId || null;
  };

  const allowedSubs = ["new", "edit"];

  const [activeSection, setActiveSection] = useState(getSectionFromQuery);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSubSectionNav = (section, data) => {
    if (section === "edit") {
      setSelectedItem(data);
    }
    setActiveSection(section);
  };

  const handleBackClick = () => {
    // Create a URLSearchParams object from the current URL search parameters
    const searchParams = new URLSearchParams(location.search);

    // Delete the 'exp_sub' parameter
    searchParams.delete("exp_sub");

    // Delete the 'exp_id' parameter
    searchParams.delete("exp_id");

    // Reset active section
    setActiveSection(null);

    // Construct the new URL
    const newUrl = `${location.pathname}?${searchParams.toString()}`;

    // Use navigate to update the URL
    navigate(newUrl, { replace: true });
  };

  console.log(activeSection);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (activeSection === "new") {
      params.set("exp_sub", activeSection);
      navigate(`?${params}`, { replace: true });
    } else if (activeSection === "edit") {
      params.set("exp_id", selectedItem?.id);
      navigate(`?${params}`, { replace: true });
    }
  }, [activeSection, navigate]);

  return (
    <div className="professional__experience__form__container">
      {!professionalExperience.length > 0 && !activeSection && (
        <div className="no__professional__experience__container">
          <img
            src={ghost}
            alt="no resume"
            className="ghost__image__no__professional__experience"
          />
          <h4 className="no__professional__experience__text">
            No professional experience!
          </h4>
          <p className="click__button__to__upload__text">
            Click the button below to add
          </p>
          <img
            src={arrowDown}
            alt="arrow down"
            className="click__upload__button__arrow__pointer bounce"
          />
          <SectionCTA
            text={"Add experience"}
            handleClick={() => handleSubSectionNav("new")}
          />
        </div>
      )}

      {!allowedSubs.includes(activeSection) && (
        <>
          {professionalExperience.length > 0 && (
            <button
              className="add__new__experience__button"
              onClick={() => handleSubSectionNav("new")}
            >
              Add new experience
            </button>
          )}

          {professionalExperience.map((singleExperience) => {
            return (
              // <div className="" key={singleExperience.id}>
              //   <div className="">{singleExperience.title}</div>
              //   <button
              //     onClick={() => handleSubSectionNav(`edit`, singleExperience)}
              //   >
              //     Edit
              //   </button>
              // </div>
              <SingleWorkHistory />
            );
          })}
        </>
      )}

      {activeSection === "new" && (
        <div className="sub__section__container">
          <div
            className="back__nav__wrapper"
            onClick={() => handleBackClick("goBack")}
          >
            <Icon icon="ion:chevron-back-outline" />
            <div className="">Back</div>
          </div>
          <MainProfessionalExperienceForm type={"New"} />
        </div>
      )}
      {activeSection === "edit" && (
        <div className="sub__section__container">
          <div
            className="back__nav__wrapper"
            onClick={() => handleBackClick("goBack")}
          >
            <Icon icon="ion:chevron-back-outline" />
            <div className="">Back</div>
          </div>
          <MainProfessionalExperienceForm type={"Edit"} />
        </div>
      )}
    </div>
  );
};

export default ProfessionalExperienceForm;

const MainProfessionalExperienceForm = ({ type }) => {
  return <div className="">{type}</div>;
};
