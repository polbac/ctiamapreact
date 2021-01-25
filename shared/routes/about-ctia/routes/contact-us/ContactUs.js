import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import axios from 'axios';

import Header from 'containers/header';
import Layout, { Group } from 'components/layout';
import Hero, { Heading, Copy } from 'components/hero';
import Form, { Field } from 'components/form';
import TextInput, { TextArea, Select } from 'components/input';

import ContactForm from './components/contact-form';

const contactEndpoint = '/api/forms/contact';

export default class ContactUs extends PureComponent {

  state = {
    fetching: false,
    success: false,
    error: '',
    invalid: [],
  }

  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: undefined,
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    if (this.form.checkValidity()) {
      this.setState({ fetching: true });

      const data = new FormData(e.target);
      const { method, action: url } = e.target;
      const headers = { 'X-Requested-With': 'XMLHttpRequest' };

      axios({ url, method, data, headers })
        .then(() => {
          this.setState({
            success: true,
            fetching: false,
          });
        })
        .catch((err) => {
          const { data: errorData, status } = err.response;

          // defensive
          const error = typeof errorData.ok === 'undefined' ||
                        (errorData.ok && errorData.errors.length === 0) ||
                        status >= 500;

          this.setState({
            success: false,
            fetching: false,
            error,
            invalid: errorData.errors || [],
          });
        });
    } else {
      const invalidFields = this.form.querySelectorAll(':invalid');
      const invalid = [...invalidFields].map(field => field.name);

      [...invalidFields][0].focus();

      this.setState({
        fetching: false,
        success: false,
        invalid,
      });
    }
  }

  render() {
    const { children } = this.props;
    const { fetching, success, error, invalid } = this.state;

    return (
      <Layout>
        <Helmet title="Contact Us" />

        <Group type="gray" graphics="join-us">
          <Header transparent />

          <Hero center>
            <Heading>Contact Us</Heading>
            {!success && (
              <Copy>If you have any questions or comments, please select a contact and fill out the
              form. We will get back to you as soon as we can.</Copy>
            )}
            {success && (
              <Copy>Thank you for contacting us. We’ll contact you shortly.</Copy>
            )}
          </Hero>
        </Group>

        <Group type="gray">
          <section>
            {children}
          </section>

          {!success && (
            <form
              ref={(c) => { this.form = c; }}
              method="post"
              encType="application/x-www-form-urlencoded"
              action={contactEndpoint}
              onSubmit={this.handleFormSubmit}
            >
              <ContactForm>
                <Form disableSubmit={fetching}>
                  <Select
                    id="pointOfContact"
                    name="point_of_contact"
                    label="Point of Contact"
                    options={['Press & Media', 'Certification', 'Events', 'HR', 'Other']}
                  />

                  <Field columns={2}>
                    <TextInput
                      id="YourName"
                      name="name"
                      label="Your Name"
                      required
                      invalid={invalid.indexOf('name') >= 0 && !fetching}
                    />

                    <TextInput
                      id="EmailAddress"
                      name="email"
                      label="Email Address"
                      type="email"
                      required
                      invalid={invalid.indexOf('email') >= 0 && !fetching}
                    />
                  </Field>

                  <TextInput
                    id="Subject"
                    name="subject"
                    label="Subject"
                    required
                    invalid={invalid.indexOf('subject') >= 0 && !fetching}
                  />

                  <TextArea
                    id="Message"
                    name="message"
                    label="Message"
                    required
                    invalid={invalid.indexOf('message') >= 0 && !fetching}
                  />
                </Form>
                {invalid.length > 0 && !fetching && (
                  <div>
                    Form is invalid, check the fields and try again
                  </div>
                )}
                {error && (
                  <div>Something came up while submitting the form.</div>
                )}
              </ContactForm>
            </form>
          )}
        </Group>
      </Layout>
    );
  }
}
