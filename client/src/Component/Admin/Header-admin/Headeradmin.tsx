
import "./Header.css";

const Header = () => {
  return (
    <>
      <main>
        <div id="mysidebar" className="sidebar">
          <ul className="sidebar-navlink">
            <li>
              <a href="/">
                <i className="fa-solid fa-house" />
                <span>Trang chủ</span>
              </a>
            </li>
            <li>
              <a href="/adminuser">
                <i className="fa-solid fa-users" />
                <span>Người dùng</span>
              </a>
            </li>
          </ul>
        </div>
      </main>
    </>
  );
};

export default Header;
