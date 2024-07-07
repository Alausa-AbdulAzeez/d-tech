import "./singleWorkHistory.css";

const SingleWorkHistory = ({ singleExperience }) => {
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
          <p className="single__work__history__company__name">{employer}</p>
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
  console.log(title);
  return <div className="single__skill__container">{title}</div>;
};
