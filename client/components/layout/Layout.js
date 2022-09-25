import Navigation from "../navbar/Navbar";
import Footer from "../footer/Footer";

const Layout = ({ children }) => {
  return (
    <div style={{ backgroundColor: "#000", minHeight: "1200px", width: "100%" }}>
      <Navigation />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
