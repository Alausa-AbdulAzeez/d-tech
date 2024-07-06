import { useState, useEffect } from "react";
import { arrowDown, ghost } from "../../assets/images";
import { ToastContainer, toast } from "react-toastify";
import { Icon } from "@iconify/react";
import "./resumeUpload.css";

const ResumeUpload = ({ setCompletionStatus }) => {
  const [resume, setResume] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);

  useEffect(() => {
    const storedResume = JSON.parse(localStorage.getItem("resume"));
    if (storedResume) {
      setSelectedResume(storedResume);
      setResume(true);
      setCompletionStatus(true);
    } else {
      setCompletionStatus(false);
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const fileExtension = file?.name.split(".").pop();

    if (file && allowedExtensions.includes(`.${fileExtension}`)) {
      if (file.size < 10 * 1024 * 1024) {
        setSelectedResume(file);
        setResume(true);
        // Extract necessary file properties
        const fileData = {
          name: file.name,
          type: file.type,
          size: file.size,
          lastModified: file.lastModified,
        };
        localStorage.setItem("resume", JSON.stringify(fileData));
        setCompletionStatus(true);
      } else {
        toast.error("File size should be less than 10MB", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      toast.error("Only .pdf, .doc, .docx files are allowed.", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    event.target.value = null;
  };

  const removeFile = () => {
    setResume(false);
    setSelectedResume(null);
    localStorage.removeItem("resume");
    setCompletionStatus(false);
  };

  return (
    <div className="resume__upload">
      <ToastContainer />
      {!resume && (
        <div className="no__resume__container">
          <img
            src={ghost}
            alt="no resume"
            className="ghost__image__no__resume"
          />
          <h4 className="no__resume__text">No resume!</h4>
          <p className="click__button__to__upload__text">
            Click the button below to choose
          </p>
          <img
            src={arrowDown}
            alt="arrow down"
            className="click__upload__button__arrow__pointer bounce"
          />
          <button className="resume__upload__button">
            <input
              type="file"
              accept=".pdf, .doc, .docx"
              id="fileInputMain"
              onChange={handleFileChange}
            />
            <label
              htmlFor="fileInputMain"
              className="resume__upload__button__mask"
            >
              Select
            </label>
          </button>
          <p className="selected__resume__info">
            * Allowed file types: .pdf, .doc, .docx. Max size: 10MB
          </p>
        </div>
      )}

      {resume && (
        <div className="yes_resume__container">
          <p className="">Selected resume</p>
          <FileHolder file={selectedResume} handleClick={removeFile} />
          <button className="choose__another__resume__button">
            <input
              type="file"
              accept=".pdf, .doc, .docx"
              id="chooseDifferentFile"
              onChange={handleFileChange}
            />
            <label
              htmlFor="chooseDifferentFile"
              className="choose__another__resume__button__mask"
            >
              Select a different resume
            </label>
          </button>
        </div>
      )}
    </div>
  );
};

const FileHolder = ({ file, handleClick }) => {
  return (
    <div className="">
      <div className={`resume__holder`}>
        <div className="resume__holder__left">
          <Icon
            icon="majesticons:file"
            color="#151515"
            className={`resume__holder__file__icon`}
          />
          <div className={`resume__holder__file__name`}>{file?.name}</div>
        </div>
        <Icon
          icon="ion:trash-sharp"
          color="#F04037"
          className={`resume__holder__delete__file__icon`}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default ResumeUpload;
