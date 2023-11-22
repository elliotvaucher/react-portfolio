import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import { Container, Row, Col, Alert } from "react-bootstrap";
// import { contactConfig } from "../../content_option";

export const MailUs = () => {
  const [formData, setFormdata] = useState({
    input: "",
    loading: false,
    show: false,
    alertmessage: "",
    variant: "",
    response: "", // Added field for OpenAI's response
  });

  const API_KEY = process.env.REACT_APP_API_KEY; // API Key for Chat-GPT API

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormdata({ ...formData, loading: true });

    try {
      const apiRequestBody = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Geppetto is a specialized GPT dedicated to converting software or business ideas into technical specifications, exclusively for software development purposes. It excels in formulating clear, actionable instructions for product development, focusing on frameworks, libraries, software architecture, and key development milestones. Geppetto's guidance is technically sound, adhering strictly to the latest industry standards and practices. It concentrates solely on the software development aspects, deliberately avoiding business development steps, marketing strategies, or target market suggestions.",
          },
          {
            role: "user",
            content: formData.input,
          },
        ],
        temperature: 0.7,
        // max_tokens: 150
      };

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setFormdata({
          ...formData,
          loading: false,
          alertmessage: "Success ! Thanks for trying out our services.",
          variant: "success",
          show: true,
          response: data.choices[0].message.content, // Save OpenAI's response
        });
      } else {
        throw new Error("Failed to send message.");
      }
    } catch (error) {
      console.log(error);
      setFormdata({
        ...formData,
        alertmessage: `Failed to send! ${error.message}`,
        variant: "danger",
        show: true,
      });
      document.getElementsByClassName("co_alert")[0].scrollIntoView();
    }
  };

  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <HelmetProvider>
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{meta.title} | Assistant</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Try Me</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="12">
            <Alert
              variant={formData.variant}
              className={`rounded-0 co_alert ${
                formData.show ? "d-block" : "d-none"
              }`}
              onClose={() => setFormdata({ ...formData, show: false })}
              dismissible
            >
              <p className="my-0">{formData.alertmessage}</p>
            </Alert>
          </Col>
          <Col lg="5" className="mb-5">
            <p>Tell me about the software of your dreams. The more specific you can be about the app you are trying to build, the better I will be able to answer your needs. 
            <br></br><br></br><i>E.g : I want to build a social media app that allows users to share pictures and videos.</i>
            </p>
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <form onSubmit={handleSubmit} className="contact__form w-100">
              <Row>
                <Col lg="12" className="form-group">
                  <textarea
                    className="form-control rounded-0"
                    id="input"
                    name="input"
                    placeholder="Describe your project here"
                    rows="5"
                    value={formData.input}
                    onChange={handleChange}
                    required
                  ></textarea>
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg="12" className="form-group">
                  <button className="btn ac_btn" type="submit">
                    {formData.loading ? "Sending..." : "Send"}
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
        <Row>
          <Col lg="12" className="form-group">
            {formData.response && (
              <div className="response">
                <h4>Assistant's answer</h4>
                <p>{formData.response}</p>
              </div>
            )}
          </Col>
        </Row>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Ready for the next step ?</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="12">
            <Alert
              variant={formData.variant}
              className={`rounded-0 co_alert ${
                formData.show ? "d-block" : "d-none"
              }`}
              onClose={() => setFormdata({ ...formData, show: false })}
              dismissible
            >
              <p className="my-0">{formData.alertmessage}</p>
            </Alert>
          </Col>
          <Col lg="5" className="mb-5">
            <p>If you're interested in building your app, we can give you a quote, and put you in contact with the best developpers out there for the smallest possible price. Don't worry, we'll handle all the technical details so that the devs build exactly what you want.</p>
          </Col>
          </Row>
      </Container>
      <div className={formData.loading ? "loading-bar" : "d-none"}></div>
    </HelmetProvider>
  );
};
