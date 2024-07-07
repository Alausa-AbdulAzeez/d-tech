import "./singleWorkHistory.css";

const SingleWorkHistory = () => {
  return (
    <div className="single__work__history__container">
      <div className="single__work__history__left__border"></div>
      <div className="single__work__history__right__content">
        <div className="single__work__history__right__content__top">
          <p className="single__work__history__company__name">LifeWORTH HMO</p>
          <div className="single__work__history__title__location__duration">
            <div className="single__work__history__title">
              Frontend developer
            </div>
            <div className="vertical__divider"></div>
            <div className="single__work__history__location">
              Lagos, Nigeria
            </div>
            <div className="vertical__divider"></div>
            <div className="single__work__history__duration">
              <div className="single__work__history__from">01-2023 </div>
              <span className="to__span">to</span>

              <div className="single__work__history__to"> Current</div>
            </div>
          </div>
          <div className="multiple__skills__wrapper">
            {[{}, {}, {}].map((a, index) => {
              return <SingleSkill key={index} title={index} />;
            })}
          </div>
        </div>
        <div className="single__work__history__right__content__bottom">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nulla nam
          eius ullam aliquam debitis aut dicta sed quos, vero et quam fugiat hic
          asperiores autem eos sit magni porro repellendus in cumque laudantium
          nobis quae obcaecati? Magni dolor sunt temporibus architecto
          doloremque deserunt ut veritatis quas, facere illum fuga totam
          similique quam laborum quidem dolores error corrupti minus non, qui
          quod mollitia quibusdam ex labore. Natus excepturi autem facere,
          cupiditate similique consequuntur possimus sapiente voluptatem
          laboriosam veritatis tempore? Atque velit perferendis dicta veritatis
          enim, ipsam esse cum, saepe numquam sapiente sint iure incidunt
          necessitatibus. Assumenda corporis ullam eius illum!
        </div>
      </div>
    </div>
  );
};

export default SingleWorkHistory;

const SingleSkill = ({ title }) => {
  return <div className="single__skill__container">{title}</div>;
};
