import "./footer.css";
import logo from "./FooterImg/logo.png";

function Footer() {

    return (
        <footer>
            <div className='footerImg'>
                <img src={logo} alt='ntnu logo' />
            </div>
            <div className='footerInfo'>
                <p>This web page is made as a project as part of the course <b>IDG2671-Web project</b> at NTNU in Gjøvik.</p>
                <p>The contributors are Leonard Avdullahu, Ingunn Hatlehol Andreassen, Knut Standal Anly and Andre Neubauer.</p>
            </div>
      </footer>
  );
}
export default Footer;