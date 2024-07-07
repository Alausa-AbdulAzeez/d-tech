import "./sectionCTA.css";

const SectionCTA = ({ handleClick, text }) => {
  return (
    <button className="section__CTA__button" onClick={handleClick}>
      {text}
    </button>
  );
};

export default SectionCTA;
