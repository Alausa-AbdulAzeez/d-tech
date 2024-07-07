import { useState, useEffect } from "react";
import "./skillsAndTools.css";
import Select from "react-select";
import SectionCTA from "../sectionCTA/SectionCTA";
import { ToastContainer, toast } from "react-toastify";

const SkillsAndTools = ({ setCompletionStatus }) => {
  // State variables to control the Select component properties
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  // State variables to hold form data
  const [formData, setFormData] = useState({
    primarySkills: [],
  });

  // State variables to hold error messages
  const [errors, setErrors] = useState({});

  // Options for primary skills select input
  const primarySkills = [
    { value: "Backend", label: "Backend" },
    { value: "Frontend", label: "Frontend" },
    { value: "Fullstack", label: "Fullstack" },
    { value: "Wordpress", label: "Wordpress" },
    { value: "Solidity", label: "Solidity" },
  ];

  // Options for secondary skills select input
  const secondarySkills = [
    { value: "ReactJS", label: "ReactJS" },
    { value: "NodeJS", label: "NodeJS" },
    { value: "ExpressJS", label: "ExpressJS" },
    { value: "CSS", label: "CSS" },
    { value: "Typescript", label: "Typescript" },
    { value: "Javascript", label: "Javascript" },
    { value: "Python", label: "Python" },
  ];

  // Options for tools select input
  const tools = [
    { value: "Figma", label: "Figma" },
    { value: "Docker", label: "Docker" },
    { value: "AWS", label: "AWS" },
    { value: "Git", label: "Git" },
    { value: "Jira", label: "Jira" },
  ];

  // Validate form inputs and set error messages
  const validateForm = () => {
    let formErrors = {};
    if (!formData.primarySkills.length > 0)
      formErrors.primarySkills = "Select at least one primary skill";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setCompletionStatus(true); // Set completion status to true if form is valid
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
      // You can add more logic here to handle the form submission, such as sending the data to a server
    } else {
      setCompletionStatus(false); // Set completion status to false if form is invalid
      console.log("Form has errors");
    }
  };

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("Skills & Tools"));
    if (savedData) {
      setFormData(savedData);
      setCompletionStatus(true);
    }
  }, []);

  // Handle change for select inputs
  const handleSelectChange = (selectedOption, action) => {
    const { name } = action;
    setFormData((prevData) => ({ ...prevData, [name]: selectedOption }));
    // Update localStorage with new data
    localStorage.setItem(
      "Skills & Tools",
      JSON.stringify({ ...formData, [name]: selectedOption })
    );
  };

  return (
    <form className="skills__and__tools__container">
      <ToastContainer />
      <div className="skills__and__tools__single__input__container">
        <label htmlFor="" className="input__label">
          Primary skills <span>*</span>
        </label>

        <Select
          className="basic-single"
          classNamePrefix="select"
          isMulti
          value={formData.primarySkills}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          name="primarySkills"
          options={primarySkills}
          onChange={handleSelectChange}
        />
        {errors.primarySkills && (
          <p className="input__error__message">{errors.primarySkills}</p>
        )}
      </div>

      <div className="skills__and__tools__single__input__container">
        <label htmlFor="" className="input__label">
          Secondary skills
        </label>

        <Select
          className="basic-single"
          classNamePrefix="select"
          isMulti
          value={formData.secondarySkills}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          name="secondarySkills"
          options={secondarySkills}
          onChange={handleSelectChange}
        />
      </div>

      <div className="skills__and__tools__single__input__container">
        <label htmlFor="" className="input__label">
          Tools
        </label>

        <Select
          className="basic-single"
          classNamePrefix="select"
          isMulti
          value={formData.tools}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          name="tools"
          options={tools}
          onChange={handleSelectChange}
        />
      </div>
      <div className="CTA__button__container ">
        <SectionCTA text={"Save"} handleClick={handleSubmit} />
      </div>
    </form>
  );
};

export default SkillsAndTools;
