import { useLocation, useNavigate } from "react-router-dom";
import "./professionalExperienceForm.css";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const ProfessionalExperienceForm = () => {
  const professionalExperience = [
    { id: 1, title: "Experience 1" },
    { id: 2, title: "Experience 2" },
  ];

  const location = useLocation();
  const navigate = useNavigate();

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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (activeSection === "add") {
      params.set("exp_sub", activeSection);
      navigate(`?${params}`, { replace: true });
    } else if (activeSection === "edit") {
      params.set("exp_id", selectedItem?.id);
      navigate(`?${params}`, { replace: true });
    }
  }, [activeSection, navigate]);

  console.log(activeSection);

  return (
    <div className="professional__experience__form__container">
      {!allowedSubs.includes(activeSection) && (
        <>
          <button
            className="add__new__experience__button"
            onClick={() => handleSubSectionNav("new")}
          >
            Add new experience
          </button>

          {professionalExperience.map((singleExperience) => {
            return (
              <div className="" key={singleExperience.id}>
                <div className="">{singleExperience.title}</div>
                <button
                  onClick={() => handleSubSectionNav(`edit`, singleExperience)}
                >
                  Edit
                </button>
              </div>
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
