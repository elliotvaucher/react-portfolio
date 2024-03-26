import React from "react";
import "./style.css"; // Assuming this CSS file is necessary for basic styling
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";

export const Blog = () => {
  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Personal Blog</title>
          <meta name="description" content="Visit my personal blog for more interesting content." />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Personal blog</h1>
            <hr className="t_border my-4 ml-0 text-left" />
            <p>If you're interested in diving deeper into my thoughts, projects, and reflections, visit my personal blog:</p>
            <a href="https://elliotvaucher.github.io/blog/" target="_blank" rel="noopener noreferrer">https://elliotvaucher.github.io/blog/</a>
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};
