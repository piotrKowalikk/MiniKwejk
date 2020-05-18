import * as React from "react";
import '../assets/scss/Footer.scss'; 
export const Footer: React.SFC = () => {
  return (
  <div >
    {/* style={{position:"relative", height:"100%",display:"flex", flexDirection:"column", justifyContent:"space-between"}} */}
    <footer className="page-footer  indigo" style={{marginTop:"auto", backgroundColor:"black", color:"white"}}>
      <div className="container text-center text-md-left">
      </div>
      <hr className="clearfix w-100 d-md-none" />
      <div className="footer-copyright text-center py-3">© 2020 Copyright: Marcel Wenka, Adrianna Klimczak, Piotr Kowalik
      </div>
    </footer>
    </div>
  );
};

