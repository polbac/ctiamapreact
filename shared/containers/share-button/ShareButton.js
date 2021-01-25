import React, { PureComponent } from 'react';
import share from 'utils/share';

import { ButtonDropdown } from 'components/button';

import ShareSvg from 'assets/images/icons/actionicon-share-optim.svg';
import FacebookSvg from 'assets/images/icons/actionicon-facebook-optim.svg';
import TwitterSvg from 'assets/images/icons/actionicon-twitter-optim.svg';
import LinkedinSvg from 'assets/images/icons/actionicon-linkedin-optim.svg';

export default class ShareButton extends PureComponent {

  render() {
    return (
      <ButtonDropdown
        icon={<ShareSvg />}
        items={[
          <button onClick={() => share('Facebook')}><FacebookSvg /> Facebook</button>,
          <button onClick={() => share('Twitter')}><TwitterSvg /> Twitter</button>,
          <button onClick={() => share('LinkedIn')}><LinkedinSvg /> LinkedIn</button>,
        ]}
      />
    );
  }
}
