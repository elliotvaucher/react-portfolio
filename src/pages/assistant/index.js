import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import { Container, Row, Col, Alert, Form } from "react-bootstrap";
import { contactConfig } from "../../content_option";

export const MailUs = () => {
  const [formData, setFormdata] = useState({
    input: "",
    loading: false,
    show: false,
    alertmessage: "",
    variant: "",
    response: "", // Added field for OpenAI's response
  });

  const API_KEY = "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"; // API Key for Chat-GPT API

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
              "You are a HR placement specialist. You are talking to a recruiter that is looking for a new talent to fill a position. The candidate you want to recommend, Elliot Vaucher, has the following profile: Bachelor in Humanities, a Master in Contemporary Arts and a COS in Machine Learning. The candidate has the following interests : AI & Machine Learning, Robots & Automation, Blockchain technologies, Finance & Economics. Based on the recruiter's request, you want to choose the relevant skills to put the candidate forward. Be informal and friendly.",
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
            <h1 className="display-4 mb-4">AI assistant</h1>
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
{/*             <h3 className="color_sec py-4">Get in touch</h3>
            <address>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>
                {contactConfig.YOUR_EMAIL}
              </a>
              <br />
              <br />
              {contactConfig.hasOwnProperty("YOUR_FONE") ? (
                <p>
                  <strong>Phone:</strong> {contactConfig.YOUR_FONE}
                </p>
              ) : (
                ""
              )}
            </address> */}
            <p>My AI personal assistant will tell you how I can complete your team. Just describe your needs, or the role your looking for, and we will do the rest.</p>
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <form onSubmit={handleSubmit} className="contact__form w-100">
              <Row>
                <Col lg="12" className="form-group">
                  <textarea
                    className="form-control rounded-0"
                    id="input"
                    name="input"
                    placeholder="Tell me what you're looking for"
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
      </Container>
      <div className={formData.loading ? "loading-bar" : "d-none"}></div>
    </HelmetProvider>
  );
};
