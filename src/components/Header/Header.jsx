import './Header.css';

const Header = () => {
  return (
    <section className="h-wrapper">
      <div className="h-container flexCenter innerWidth paddings">
        <img src="./logo.png" alt="logo" width={100} />

        <div className="flexCenter h-menu">
          <a href="">Residencies</a>
          <a href="">Our Values</a>
          <a href="">Contact</a>
          <a href="">Get Started</a>
          <button className="button">
            <a href="">Contact</a>
          </button>
        </div>
      </div>
    </section>
  );
};

export { Header };
