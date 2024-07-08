import "./singleWorkHistory.css";
import { Icon } from "@iconify/react";
const SingleWorkHistory = ({
  singleExperience,
  handleEdit,
  index,
  setIsOpen,
}) => {
  const {
    cityStateProvince,
    country,
    employer,
    endDate,
    jobDescription,
    jobRole,
    startDate,
    skills,
  } = singleExperience;

  const renderHTML = (htmlString) => {
    return { __html: htmlString };
  };

  return (
    <div className="single__work__history__container">
      <div className="single__work__history__left__border"></div>
      <div className="single__work__history__right__content">
        <div className="single__work__history__right__content__top">
          <div className="single__work__history__company__and__actions__container">
            <p className="single__work__history__company__name">{employer}</p>

            <div className="single__work__history__actions__container">
              <Icon
                icon="carbon:pen"
                color="#006aff"
                style={{ cursor: "pointer" }}
                onClick={() => handleEdit(index)}
              />{" "}
              {/**Edit icon */}
              <Icon
                icon="ion:trash-sharp"
                color="#F04037"
                style={{ cursor: "pointer" }}
                onClick={() => setIsOpen(true)}
              />{" "}
              {/**Delete icon */}
            </div>
          </div>
          <div className="single__work__history__title__location__duration">
            <div className="single__work__history__title">{jobRole}</div>
            <div className="vertical__divider"></div>
            <div className="single__work__history__location">
              {cityStateProvince}, {country?.label}
            </div>
            <div className="vertical__divider"></div>
            <div className="single__work__history__duration">
              <div className="single__work__history__from">{startDate} </div>
              <span className="to__span">to</span>

              <div className="single__work__history__to">
                {" "}
                {endDate ? endDate : "Current"}
              </div>
            </div>
          </div>
          <div className="multiple__skills__wrapper">
            {skills.map((skill, index) => {
              return <SingleSkill key={index} title={skill.label} />;
            })}
          </div>
        </div>

        <div
          className="single__work__history__right__content__bottom"
          dangerouslySetInnerHTML={renderHTML(jobDescription)}
        />
      </div>
    </div>
  );
};

export default SingleWorkHistory;

const SingleSkill = ({ title }) => {
  return <div className="single__skill__container">{title}</div>;
};
