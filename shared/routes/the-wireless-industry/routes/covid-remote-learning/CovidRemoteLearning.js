import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import axios from 'axios';

import Header from 'containers/header';
import Layout, { Group } from 'components/layout';
import Hero, { Heading, Copy } from 'components/hero';
import Form, { Field } from 'components/form';
import TextInput, { TextArea, YesNo } from 'components/input';

import ContactForm from './components/contact-form';

const contactEndpoint = '/api/forms/covid';

export default class CovidRemoteLearning extends PureComponent {

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
        <Helmet title="COVID-19 Remote Learning Need Assessment" />

        <Group type="gray" graphics="join-us">
          <Header transparent />

          <Hero center>
            <Heading>COVID-19 Remote Learning Need Assessment</Heading>
            {/* {!success && (
              <Copy>Instructions go here</Copy>
            )} */}
            {success && (
              <Copy>Thank you! Your form has been successfully submitted</Copy>
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

                  <TextInput
                    id="Organization"
                    name="organization"
                    label="Name of Organization"
                    required
                    invalid={invalid.indexOf('organization') >= 0 && !fetching}
                  />

                  <Field columns={2}>
                    <TextInput
                      id="Name"
                      name="name"
                      label="Contact Name"
                      required
                      invalid={invalid.indexOf('name') >= 0 && !fetching}
                    />

                    <TextInput
                      id="Title"
                      name="title"
                      label="Title"
                      required
                      invalid={invalid.indexOf('title') >= 0 && !fetching}
                    />
                  </Field>

                  <Field columns={2}>
                    <TextInput
                      id="Phone"
                      name="phone"
                      label="Phone Number"
                      required
                      invalid={invalid.indexOf('phone') >= 0 && !fetching}
                    />

                    <TextInput
                      id="Email"
                      name="email"
                      label="Email Address"
                      type="email"
                      required
                      invalid={invalid.indexOf('email') >= 0 && !fetching}
                    />
                  </Field>

                  <TextInput
                    id="Location"
                    name="location"
                    label="Service Location (Includes areas of city/county that need to have broadband coverage)"
                    required
                    invalid={invalid.indexOf('location') >= 0 && !fetching}
                  />

                  <TextInput
                    id="TotalImpacted"
                    name="total_impacted"
                    label="Total Impacted Students (how many students need Internet access for remote learning)"
                    required
                    invalid={invalid.indexOf('impacted-students') >= 0 && !fetching}
                  />

                  <Field columns={2}>
                    <TextInput
                      id="StudentsBroadband"
                      name="students_broadband"
                      label="Number of Students Needing Broadband"
                      required
                      invalid={invalid.indexOf('students-broadband') >= 0 && !fetching}
                    />

                    <TextInput
                      id="StudentsDevices"
                      name="students_devices"
                      label="Number of Students Needing Devices"
                      required
                      invalid={invalid.indexOf('students-devices') >= 0 && !fetching}
                    />
                  </Field>

                  {/* <YesNo
                    id="Budget"
                    name="have_budget"
                    label="Budget – do you have funding to support connectivity?"
                    hasExtra
                    extraLabel="How much?"
                    extraId="BudgetAmount"
                    extraName="budget_amount"
                    extraRequired
                  /> */}

                  <YesNo
                    id="ExistingProvider"
                    name="existing_provider"
                    label="Does your school / school district have an existing wireless provider?"
                    required
                    hasExtra
                    extraLabel="Which carrier?"
                    extraId="WhoExistingProvider"
                    extraName="who_existing_provider"
                    extraRequired
                  />

                  <TextInput
                    id="PreferredProvider"
                    name="preferred_provider"
                    label="Please indicate if you would like to be connected with your existing wireless provider, and/or some other preferred provider, or would like us to connect you with all participating providers in your area."
                    required
                    invalid={invalid.indexOf('preferred_provider') >= 0 && !fetching}
                  />

                  <TextArea
                    id="Comments"
                    name="comments"
                    label="Additional Comments"
                    invalid={invalid.indexOf('comments') >= 0 && !fetching}
                  />

                  <p>
                    CTIA will undertake sending your information to the participating carriers in your neighborhood unless you specifically limit
                    your request above. CTIA is not a provider of service and the participating carriers in their own discretion will follow-up with
                    you directly to the contact information provided. Each carrier makes its own decisions and CTIA will have no knowledge as to
                    the status of your requests. Our role is to help connect you with participating wireless carriers who can address your broadband
                    needs. Please remember there may be other broadband options in your community beyond our participating carriers that
                    could help address your needs as well.
                  </p>

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
