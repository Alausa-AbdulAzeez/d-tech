import { useEffect, useState } from "react";
import "./personalDetailsForm.css";
import Select from "react-select";
import SectionCTA from "../sectionCTA/SectionCTA";
import { ToastContainer, toast } from "react-toastify";

/**
 * PersonalDetailsForm component renders a form for collecting personal details.
 *
 * @component
 * @example
 * return (
 *   <PersonalDetailsForm setCompletionStatus={setCompletionStatus} />
 * )
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.setCompletionStatus - Function to set the completion status of the profile section.
 */
const PersonalDetailsForm = ({ setCompletionStatus }) => {
  // State variables to control the Select component properties
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

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

  // State variables to hold error messages
  const [errors, setErrors] = useState({});

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

  // Options for gender select input
  const genders = [
    { value: "Female", label: "Female" },
    { value: "Male", label: "Male" },
    { value: "Other", label: "Other" },
  ];

  // Check localStorage for existing personal details data and update the form state accordingly
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("Personal details"));
    if (storedData) {
      setFormData(storedData); // Set form data if data is found
      setCompletionStatus(true); // Set completion status to true if data is found
    } else {
      setCompletionStatus(false); // Set completion status to false if no data is found
    }
  }, []);

  // Handle change for text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value.trim() }));
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
      toast.success("Form submitted successfully", {
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
    <form className="personal__details__container" onSubmit={handleSubmit}>
      <ToastContainer />
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
      <div className="personal__details__single__line__container">
        {/* Email Address Input */}
        <div className="personal__details__single__input__container">
          <label htmlFor="email" className="input__label">
            Email address <span>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="input"
          />
          {errors.email && (
            <p className="input__error__message">{errors.email}</p>
          )}
        </div>
        {/* Phone Number Input */}
        <div className="personal__details__single__input__container">
          <label htmlFor="phone" className="input__label">
            Phone number <span>*</span>
          </label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="input"
          />
          {errors.phone && (
            <p className="input__error__message">{errors.phone}</p>
          )}
        </div>
      </div>
      <div className="personal__details__single__line__container">
        {/* Job Title Input */}
        <div className="personal__details__single__input__container">
          <label htmlFor="jobtitle" className="input__label">
            Job title <span>*</span>
          </label>
          <input
            type="text"
            id="jobtitle"
            name="jobtitle"
            value={formData.jobtitle}
            onChange={handleInputChange}
            className="input"
          />
          {errors.jobtitle && (
            <p className="input__error__message">{errors.jobtitle}</p>
          )}
        </div>
        {/* Gender Select Input */}
        <div className="personal__details__single__input__container">
          <label htmlFor="gender" className="input__label">
            Gender <span>*</span>
          </label>
          {formData?.gender?.value && (
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={{
                label: formData?.gender?.label,
                value: formData?.gender?.value,
              }}
              isDisabled={isDisabled}
              isLoading={isLoading}
              isClearable={isClearable}
              isRtl={isRtl}
              isSearchable={isSearchable}
              name="gender"
              options={genders}
              onChange={handleSelectChange}
            />
          )}
          {!formData.gender?.value && (
            <Select
              className="basic-single"
              classNamePrefix="select"
              isDisabled={isDisabled}
              isLoading={isLoading}
              isClearable={isClearable}
              isRtl={isRtl}
              isSearchable={isSearchable}
              name="gender"
              options={genders}
              onChange={handleSelectChange}
            />
          )}
          {errors.gender && (
            <p className="input__error__message">{errors.gender}</p>
          )}
        </div>
      </div>
      <div className="personal__details__single__line__container">
        {/* Country Select Input */}
        <div className="personal__details__single__input__container">
          <label htmlFor="country" className="input__label">
            Country <span>*</span>
          </label>
          {formData?.country?.value && (
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={{
                label: formData?.country?.value,
                value: formData?.country?.value,
              }}
              isDisabled={isDisabled}
              isLoading={isLoading}
              isClearable={isClearable}
              isRtl={isRtl}
              isSearchable={isSearchable}
              name="country"
              options={colourOptions}
              onChange={handleSelectChange}
            />
          )}
          {!formData.country?.value && (
            <Select
              className="basic-single"
              classNamePrefix="select"
              isDisabled={isDisabled}
              isLoading={isLoading}
              isClearable={isClearable}
              isRtl={isRtl}
              isSearchable={isSearchable}
              name="country"
              options={colourOptions}
              onChange={handleSelectChange}
            />
          )}
          {errors.country && (
            <p className="input__error__message">{errors.country}</p>
          )}
        </div>
      </div>
      <div className="CTA__button__container personal__details__CTA__button__container">
        <SectionCTA text={"Save"} handleClick={handleSubmit} />
      </div>
    </form>
  );
};

export default PersonalDetailsForm;
