import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="content flex-1">{children}</main>

      <Footer />
    </div>
  );
}

export default Layout;
