import { useState } from "react";
import "./mainProfessionalExperienceForm.css";

const MainProfessionalExperienceForm = ({ type }) => {
  // State variables to control the Select component properties
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true); // Set initial loading state to true

  // State variables to hold form data
  const [formData, setFormData] = useState({
    firstname: "",
    surname: "",
    email: "",
    phone: "",
    jobtitle: "",
    gender: null,
    country: null,
  });

  // Handle change for text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value.trim() }));
    setUserDetails({ ...formData, [name]: value });
    // Update localStorage with new data
    localStorage.setItem(
      "Personal details",
      JSON.stringify({ ...formData, [name]: value })
    );
  };

  // Handle change for select inputs
  const handleSelectChange = (selectedOption, action) => {
    const { name } = action;
    setFormData((prevData) => ({ ...prevData, [name]: selectedOption }));
    // Update localStorage with new data
    localStorage.setItem(
      "Personal details",
      JSON.stringify({ ...formData, [name]: selectedOption })
    );
  };

  // Validate form inputs and set error messages
  const validateForm = () => {
    let formErrors = {};
    if (!formData.firstname) formErrors.firstname = "Firstname is required";
    if (!formData.surname) formErrors.surname = "Surname is required";
    if (!formData.email) formErrors.email = "Email is required";
    if (!formData.phone) formErrors.phone = "Phone number is required";
    if (!formData.jobtitle) formErrors.jobtitle = "Job title is required";
    if (!formData.gender) formErrors.gender = "Gender is required";
    if (!formData.country) formErrors.country = "Country is required";
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

  return (
    <form className="">
      <div className="personal__details__single__line__container">
        {/* Firstname Input */}
        <div className="personal__details__single__input__container">
          <label htmlFor="firstname" className="input__label">
            Firstname <span>*</span>
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            className="input"
          />
          {errors.firstname && (
            <p className="input__error__message">{errors.firstname}</p>
          )}
        </div>
        {/* Surname Input */}
        <div className="personal__details__single__input__container">
          <label htmlFor="surname" className="input__label">
            Surname <span>*</span>
          </label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
            className="input"
          />
          {errors.surname && (
            <p className="input__error__message">{errors.surname}</p>
          )}
        </div>
      </div>
    </form>
  );
};

export default MainProfessionalExperienceForm;
