import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const FooterLinks = () => {
  const location = useLocation();
  const page = location.pathname?.split('/')[2];
  const pages = ["Contact", "Privacy Policy", "Terms of Use", "FAQs"];
  const pageLinks = ["contact", "privacy-policy", "terms-of-use", "faqs"];
  return (
    <>
        {
            pageLinks.map((item, index) => {
                if (item == page){
                    return <Link key={index} className="footer-links current-category" to={"/pages/" + item}>{pages[index]}</Link>
                }
                return <Link key={index} className="footer-links" to={"/pages/" + item}>{pages[index]}</Link>
            })
        }
    </>
  )
}

export default FooterLinks