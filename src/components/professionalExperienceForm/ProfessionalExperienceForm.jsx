import { useLocation, useNavigate } from "react-router-dom";
import "./professionalExperienceForm.css";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Select from "react-select";
import {
  LoadingComponent,
  MainProfessionalExperienceForm,
  SectionCTA,
  SingleWorkHistory,
} from "../index";
import { arrowDown, ghost } from "../../assets/images";
import ReactQuill from "react-quill";
import DatePicker from "react-datepicker";
import { setYear, setMonth } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "react-quill/dist/quill.snow.css"; // import styles
import { ToastContainer, toast } from "react-toastify";

const ProfessionalExperienceForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [professionalExperience, setProfessionalExperience] = useState([]);

  // State variables to hold error messages
  const [errors, setErrors] = useState({});

  // State variables to control the Select component properties
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true); // Set initial loading state to true

  // State variables to hold form data
  const [formData, setFormData] = useState({
    jobRole: "",
    employer: "",
    country: null,
    cityStateProvince: "",
    startDate: "",
    endDate: "",
    skills: [],
    jobDescription: "",
  });

  const skillsOptions = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "React", label: "React" },
    { value: "Node.js", label: "Node.js" },
    // Add more skill options as needed
  ];

  // Options for country select input
  const colourOptions = [
    { value: "Albania", label: "Albania", code: "AL" },
    { value: "Åland Islands", label: "Åland Islands", code: "AX" },
    { value: "Algeria", label: "Algeria", code: "DZ" },
    { value: "American Samoa", label: "American Samoa", code: "AS" },
    { value: "Andorra", label: "Andorra", code: "AD" },
    { value: "New Zealand", label: "New Zealand", code: "NZ" },
    { value: "Nicaragua", label: "Nicaragua", code: "NI" },
    { value: "Niger", label: "Niger", code: "NE" },
    { value: "Nigeria", label: "Nigeria", code: "NG" },
    { value: "Zimbabwe", label: "Zim", code: "ZW" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value.trim() }));

    // Add condition to handle changes for job description
    if (name === "jobDescription") {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    // Update localStorage with new data
    localStorage.setItem(
      "Professional experience m",
      JSON.stringify({ ...formData, [name]: value })
    );
  };

  const handleSelectChange = (selectedOption, action) => {
    const { name } = action;
    setFormData((prevData) => ({ ...prevData, [name]: selectedOption }));
    // Update localStorage with new data
    localStorage.setItem(
      "Professional experience m",
      JSON.stringify({ ...formData, [name]: selectedOption })
    );
  };

  // Validate form inputs and set error messages
  const validateForm = () => {
    let formErrors = {};
    if (!formData.jobRole) formErrors.jobRole = "Job role is required";
    if (!formData.employer) formErrors.employer = "Employer is required";
    if (!formData.country) formErrors.country = "Country is required";
    if (!formData.cityStateProvince)
      formErrors.cityStateProvince = "City/State/Province is required";
    if (!formData.startDate) formErrors.startDate = "Start date is required";
    if (!formData.jobDescription)
      formErrors.jobDescription = "Job description is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success("Form saved successfully", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // Save experience to local storage
      const storedProfessionalExperience =
        JSON.parse(localStorage.getItem("Professional experience")) || [];
      const newExperience = {
        jobRole: formData.jobRole,
        employer: formData.employer,
        country: formData.country,
        cityStateProvince: formData.cityStateProvince,
        startDate: formData.startDate,
        endDate: formData.endDate,
        skills: formData.skills,
        jobDescription: formData.jobDescription,
      };
      storedProfessionalExperience.push(newExperience);
      localStorage.setItem(
        "Professional experience",
        JSON.stringify(storedProfessionalExperience)
      );

      // Reset the form
      setFormData({
        jobRole: "",
        employer: "",
        country: null,
        cityStateProvince: "",
        startDate: null,
        endDate: null,
        skills: [],
        jobDescription: "",
      });
    } else {
      console.log("Form has errors");
    }
  };

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

  // Simulate loading for seconds
  useEffect(() => {
    setTimeout(() => {
      setIsPageLoading(false);
    }, 1000);
  }, []);

  if (isPageLoading) {
    return (
      <div className="loading__container">
        <LoadingComponent style={{ width: 150, height: 50 }} />
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
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

            {professionalExperience?.map((singleExperience, index) => {
              return (
                <SingleWorkHistory
                  singleExperience={singleExperience}
                  key={index}
                />
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
            <form
              className="personal__details__container"
              onSubmit={handleSubmit}
            >
              <div className="personal__details__single__line__container">
                {/* Job Role Input */}
                <div className="personal__details__single__input__container">
                  <label htmlFor="jobRole" className="input__label">
                    Job role <span>*</span>
                  </label>
                  <input
                    type="text"
                    id="jobRole"
                    name="jobRole"
                    value={formData.jobRole}
                    onChange={handleInputChange}
                    className="input"
                  />
                  {errors.jobRole && (
                    <p className="input__error__message">{errors.jobRole}</p>
                  )}
                </div>
                {/* Employer Input */}
                <div className="personal__details__single__input__container">
                  <label htmlFor="employer" className="input__label">
                    Employer <span>*</span>
                  </label>
                  <input
                    type="text"
                    id="employer"
                    name="employer"
                    value={formData.employer}
                    onChange={handleInputChange}
                    className="input"
                  />
                  {errors.employer && (
                    <p className="input__error__message">{errors.employer}</p>
                  )}
                </div>
              </div>
              <div className="personal__details__single__line__container">
                {/* Country Select Input */}
                <div className="personal__details__single__input__container">
                  <label htmlFor="country" className="input__label">
                    Country <span>*</span>
                  </label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    name="country"
                    options={colourOptions}
                    value={formData.country}
                    onChange={handleSelectChange}
                  />
                  {errors.country && (
                    <p className="input__error__message">{errors.country}</p>
                  )}
                </div>
                {/* City/State/Province Input */}
                <div className="personal__details__single__input__container">
                  <label htmlFor="cityStateProvince" className="input__label">
                    City/State/Province <span>*</span>
                  </label>
                  <input
                    type="text"
                    id="cityStateProvince"
                    name="cityStateProvince"
                    value={formData.cityStateProvince}
                    onChange={handleInputChange}
                    className="input"
                  />
                  {errors.cityStateProvince && (
                    <p className="input__error__message">
                      {errors.cityStateProvince}
                    </p>
                  )}
                </div>
              </div>
              <div className="personal__details__single__line__container">
                {/* Start Date Input */}
                <div className="personal__details__single__input__container">
                  <label htmlFor="startDate" className="input__label">
                    Start date <span>*</span>
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="input"
                  />
                  {errors.startDate && (
                    <p className="input__error__message">{errors.startDate}</p>
                  )}
                </div>
                {/* End Date Input */}
                <div className="personal__details__single__input__container">
                  <label htmlFor="endDate" className="input__label">
                    End date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="input"
                  />
                  {errors.endDate && (
                    <p className="input__error__message">{errors.endDate}</p>
                  )}
                </div>
              </div>

              <div className="personal__details__single__line__container">
                {/* Skills Multiselect Input */}
                <div className="personal__details__single__input__container">
                  <label htmlFor="skills" className="input__label">
                    Skills <span>*</span>
                  </label>
                  <Select
                    isMulti
                    className="basic-multi-select"
                    classNamePrefix="select"
                    name="skills"
                    options={skillsOptions}
                    value={formData.skills}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, { name: "skills" })
                    }
                  />
                  {errors.skills && (
                    <p className="input__error__message">{errors.skills}</p>
                  )}
                </div>
              </div>
              <div className="personal__details__single__line__container">
                {/* Job Description Rich Text Editor */}
                <div className="personal__details__single__input__container">
                  <label htmlFor="jobDescription" className="input__label">
                    Job description <span>*</span>
                  </label>
                  <ReactQuill
                    theme="snow"
                    value={formData.jobDescription}
                    onChange={(value) =>
                      handleInputChange({
                        target: { name: "jobDescription", value },
                      })
                    }
                    className="rich-text-editor"
                  />
                  {errors.jobDescription && (
                    <p className="input__error__message">
                      {errors.jobDescription}
                    </p>
                  )}
                </div>
              </div>
              <div className="CTA__button__container personal__details__CTA__button__container">
                <SectionCTA text={"Save"} handleClick={handleSubmit} />
              </div>
            </form>
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

            {/* <MainProfessionalExperienceForm type={"Edit"} /> */}
          </div>
        )}
      </div>
    </>
  );
};

export default ProfessionalExperienceForm;
