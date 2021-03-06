import React, { Component } from "react";
import "../sass/newsletter.scss";
import addToMailchimp from "gatsby-plugin-mailchimp";
import * as EmailValidator from "email-validator";
import ValidatedForm from "./ValidatedForm";
export default class NewsletterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errorMsg: "",
      isValidEmail: null,
      successMsg: "",
      loading: false,
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    const isValidEmail = EmailValidator.validate(this.state.email);

    if (!isValidEmail) {
      const errMsg = "Please enter a valid email";
      this.setState({ isValidEmail, errMsg });
    } else {
      try {
        this.setState({ loading: true });
        const res = await addToMailchimp(this.state.email);
        const loading = false;
        if (res.result === "success") {
          this.setState({ successMsg: "Thanks for subscribing", loading });
        } else if (res.result === "error") {
          const errMsg = "Ooops... newsletter subscribe failed.";
          this.setState({ errMsg, loading });
          //console.error(res.msg);
        }
      } catch (ex) {
        //console.error(ex);
        const errMsg = "Ooops... newsletter subscribe failed.";
        this.setState({ errMsg, loading: false });
      }
    }
  };
  render() {
    const blurbHeader = "Sign up for articles, videos, courses, and more!";
    return (
      <div className="blurb">
        <h2 className="blurbHeader">{blurbHeader}</h2>
        <ValidatedForm
          errMsg={this.state.errMsg}
          id="newsletterForm"
          onSubmit={this.handleSubmit}
          successMsg={this.state.successMsg}
          btnText="Subscribe"
          loading={this.state.loading}
        >
          <input
            type="text"
            name="email"
            id="email"
            placeholder="coolkid@coolkids.com"
            onChange={e => this.setState({ email: e.target.value })}
            value={this.state.email}
            className={this.state.isValidEmail === false ? "error" : ""}
          />
        </ValidatedForm>
      </div>
    );
  }
}
