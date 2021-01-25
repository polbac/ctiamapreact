import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { withJob } from 'react-jobs';

import LoadingPage from 'containers/loading-page';
import Layout, { Group } from 'components/layout';
import { WordPressHeader, WordPressHelmet } from 'containers/header';
import Form, { Field } from 'components/form';
import TextInput, { Select } from 'components/input';
import axios from 'axios';

import SignupForm from './components/signup-form';
import InfoBlocks, { InfoBlock } from './components/infoblocks';
import ListBox from './components/listbox';

const joinEndpoint = '/api/forms/join';

class BecomeAMember extends Component {

  state = {
    fetching: false,
    success: false,
    error: '',
    invalid: [],
  }

  static propTypes = {
    jobResult: PropTypes.array,
  };

  static defaultProps = {
    jobResult: [],
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
    const { fetching, success, error, invalid } = this.state;

    const {
      jobResult: [page = {}] = [],
    } = this.props;

    const {
      title = '',
      fields: {
        header = {},
        sections = [],
      } = {},
      seo = {},
    } = page;

    const data = {
      ...header,
      pattern: 'our-members',
    };

    return (
      <Layout>
        <WordPressHelmet title={title} seo={seo} />
        <WordPressHeader data={data} title={title} />

        {sections.length > 0 && (
          <Group type="gray shadow">
            <InfoBlocks>
              {sections.map((section, i) => {
                const {
                  title: sectionTitle = '',
                  text: sectionText = '',
                  list = '',
                  link = '/about-ctia/become-a-member/ctia-member-benefits',
                } = section;

                return (
                  <InfoBlock key={i} title={sectionTitle} text={sectionText} to={link}>
                    {list && (
                      <ListBox text={list} />
                    )}
                  </InfoBlock>
                );
              })}
            </InfoBlocks>
          </Group>
        )}

        <Group type="gray" graphics="our-members">
          {success && (
            <SignupForm
              title="Thank you for contacting us"
              subtitle="We’ll contact you shortly."
            />
          )}

          {!success && (
            <form
              ref={(c) => { this.form = c; }}
              method="post"
              encType="application/x-www-form-urlencoded"
              action={joinEndpoint}
              onSubmit={this.handleFormSubmit}
            >
              <SignupForm
                title="Join Us."
                subtitle="Fill in your information and we’ll contact you shortly."
              >
                <Form
                  invalid={invalid.length > 0 && !fetching}
                  error={error}
                >
                  <TextInput
                    id="nameOfOrganization"
                    label="Name of Organization"
                    name="organization"
                    required
                    invalid={invalid.indexOf('organization') >= 0 && !fetching}
                  />

                  <Field columns={2}>
                    <TextInput
                      id="memberName"
                      label="Contact Name"
                      name="member_name"
                      required
                      invalid={invalid.indexOf('member_name') >= 0 && !fetching}
                    />

                    <TextInput
                      id="title"
                      label="Title"
                      name="member_title"
                      required
                      invalid={invalid.indexOf('member_title') >= 0 && !fetching}
                    />
                  </Field>

                  <Field columns={2}>
                    <TextInput
                      id="phonenumber"
                      label="Phone Number"
                      name="phonenumber"
                      required
                      invalid={invalid.indexOf('phonenumber') >= 0 && !fetching}
                    />

                    <TextInput
                      id="email"
                      label="Email"
                      name="email"
                      required
                      type="email"
                      invalid={invalid.indexOf('email') >= 0 && !fetching}
                    />

                  </Field>

                  <Select
                    id="membershipType"
                    label="Membership Type"
                    options={['Carrier Member', 'Industry Member', 'Associate Member', 'Connected Life Member', 'Reverse Logistics & Service Quality (RLSQ) Member']}
                    name="membership_type"
                    invalid={invalid.indexOf('membership_type') >= 0 && !fetching}
                  />
                </Form>
              </SignupForm>
            </form>
          )}
        </Group>
      </Layout>
    );
  }
}

const becomeAMemberWithJob = withJob({
  work: ({ wordpress, location }) =>
    wordpress.getPageOrPreview({ slug: 'become-a-member', querystring: location.search }),
  LoadingComponent: () => <LoadingPage />,
  ErrorComponent: ({ error }) => { // eslint-disable-line
    console.error('Error rendering become a member', error);
    return (
      <div />
    );
  },
})(BecomeAMember);

export default inject('wordpress')(becomeAMemberWithJob);
