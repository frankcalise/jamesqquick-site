import React from "react";
import PropTypes from "prop-types";
import "../sass/index.scss";
import Footer from "./footer";
import Navbar from "./navbar";

import "../sass/layout.scss";
import { useStaticQuery } from "gatsby";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div className="layout">
      <Navbar siteTitle={data.site.siteMetadata.title} />
      {children}
      {/* <Footer /> */}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
