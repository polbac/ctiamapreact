/* eslint-disable prefer-const */
/* eslint-disable no-fallthrough */

import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import _kebabCase from 'lodash/kebabCase';
import _get from 'lodash/get';

import { WordPressImage } from 'components/image';
import Animator from 'components/animator';

import Text from './components/text';
import GridGallery from './components/grid-gallery';
import GridTiles from './components/grid-tiles';
import ImageGallery from './components/image-gallery';
import ImageCover from './components/image-cover';
import Quote from './components/quote';
import { Heading } from './components/heading';
import Divider from './components/divider';
import Video from './components/video';
import VideoGallery from './components/video-gallery';
import Audio from './components/audio';
import Document from './components/document';
import Employees from './components/employees';
import Footnote from './components/footnote';
import Intro from './components/intro';
import Infograph from './components/infographic';
import Iframe from './components/iframe';
import SubpageNav, { NavBlock } from './components/subpage-nav';
import Logos, { Item as Logo } from './components/logos';
import Buttons, { Button } from './components/buttons';
import { Speakers } from './components/speakers';
import ModularComponent from './components/modular-component';
import Map from './components/week-in-5g-map';
import ExternalLinks from './components/external-links';
import AdSpaceSidebar from './components/adspace-sidebar';
import Timeline from './components/timeline';
import PostCarousels from './components/twi5g-post-carousels';

import s from './Slices.scss';

export default class Slices extends PureComponent {

  static propTypes = {
    // empty slices from WP are set as "false"
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    theme: PropTypes.string,
    isWide: PropTypes.bool,
  }

  static defaultProps = {
    data: [],
    isWide: false,
  }

  static addAttachmentIndices(data) {
    let attachmentIndex = 0;

    const addAttachmentIndex = (item) => {
      attachmentIndex += 1;
      item.attachmentIndex = attachmentIndex;

      return {
        ...item,
        attachmentIndex,
      };
    };

    return data.map((content) => {
      const isText = content.acf_fc_layout === 'text';
      const hasDocument = content.document && content.show_document && content.document.length > 0;
      const hasGlossary = content.glossary && content.show_glossary && content.glossary.length > 0;

      if (!isText) {
        return content;
      }

      const newContent = {
        ...content,
      };

      if (hasGlossary) {
        newContent.glossary = content.glossary
          .map(addAttachmentIndex);
      }

      if (hasDocument) {
        newContent.document = content.document
          .map(addAttachmentIndex);
      }

      return newContent;
    });
  }

  static addNumbersToHeaders(data) {
    let number = 1;

    return data.map((content) => {
      if (content.acf_fc_layout !== 'heading' || !content.show_number) {
        return content;
      }

      content.number = number;
      number += 1;
      return content;
    });
  }

  renderSlice = (content, i) => {
    const { theme, ...props } = this.props;
    const key = `content-${i}`;

    switch (content.acf_fc_layout) {
      case 'heading':
        return (
          <Heading
            id={_kebabCase(content.heading)}
            key={key}
            text={content.heading}
            includeInNavBar={content.include_in_navbar}
            isCentered={content.centered}
            hasDivider={content.show_divider}
            hasNumber={content.show_number}
            number={content.number}
            theme={theme}
            {...props}
          />
        );

      case 'divider':
        return (<Divider key={key} />);

      case 'text':
        return (
          <Text
            key={key}
            text={content.text}
            showGlossary={content.show_glossary}
            showInfographic={content.show_infographic}
            showDocument={content.show_document}
            showVideo={content.show_video}
            showImage={content.show_image}
            showSidebarText={content.show_sidebar_text}
            glossary={content.glossary}
            infographic={content.infographic}
            document={content.document}
            video={{
              caption: content.video_caption,
              youtube_id: content.video_youtube_id,
              image: content.video_image,
            }}
            sbImage={{
              caption: content.sidebar_image_caption,
              image: content.sidebar_image,
            }}
            sbText={content.sidebar_text}
            {...props}
          />
        );

      case 'quote':
        return (
          <Animator key={key}>
            <Quote
              text={content.text}
              name={content.name}
              source={content.source}
              {...props}
            />
          </Animator>
        );

      case 'image':
      {
        let caption = content.override_caption ? content.caption : content.image.caption;

        if (content) {
          return (
            <Animator key={key} isAnimated={!content.isHero}>
              <ImageCover
                src={content.image.url}
                caption={caption}
                isCover={content.cover_image}
                {...props}
              />
            </Animator>
          );
        }

        if (content.image && typeof content.image === 'object') {
          content.image.caption = caption;
        }

        return (
          <WordPressImage
            key={key}
            image={content.image}
          />
        );
      }

      case 'gallery':
        return (
          <ImageGallery
            key={key}
            images={content.images}
          />
        );

      case 'grid_gallery':
        return (
          <GridGallery
            key={key}
            images={content.grid_images}
          />
        );

      case 'grid_tiles':
        return (
          <GridTiles
            key={key}
            tiles={content.tile_block}
            {...props}
          />
        );

      case 'document':
        return (
          <Document
            key={key}
            title={content.title}
            link={content.link}
          />
        );

      case 'sub_page_navigation':
        return (
          <SubpageNav
            key={key}
            {...props}
          >
            {content.pages.map(item => (
              <NavBlock
                key={item.id}
                title={item.title}
                iconUrl={_get(item, 'fields.header.icon.url')}
                to={`/${item.slug}`}
              />
            ))}
          </SubpageNav>
        );

      case 'video':
      {
        let {
          title = '',
          video: {
            url = '',
            caption = '',
          } = {},
          link_to_existing: linked = false,
          linked_item: items = [],
        } = content;

        if (linked) {
          let [{
            title: itemTitle = '',
            fields: {
              url: itemUrl = '',
              caption: itemCaption = '',
            } = {},
          }] = items;

          return (
            <Video
              key={key}
              title={itemTitle}
              link={itemUrl}
              caption={itemCaption}
            />
          );
        }

        return (
          <Video
            key={key}
            title={title}
            link={url}
            caption={caption}
          />
        );
      }

      case 'audio':
      {
        let {
          title = '',
          audio: {
            url = '',
            caption = '',
          } = {},
          link_to_existing: linked = false,
          linked_item: items = [],
        } = content;

        if (linked) {
          let [{
            title: itemTitle = '',
            fields: {
              url: itemUrl = '',
              caption: itemCaption = '',
            } = {},
          }] = items;

          return (
            <Audio
              key={key}
              title={itemTitle}
              link={itemUrl}
              caption={itemCaption}
            />
          );
        }

        return (
          <Audio
            key={key}
            title={title}
            link={url}
            caption={caption}
          />
        );
      }

      case 'video_gallery':
      {
        return (
          <VideoGallery
            key={key}
            videos={content.video_gallery}
            {...props}
          />
        );
      }

      case 'external_links':
      {
        return (
          <ExternalLinks
            key={key}
            appearsIn={content.external_link_appears_in}
            externalLinks={content.external_link}
            {...props}
          />
        );
      }

      case 'employees':
        return (
          <Employees
            key={key}
            employees={content.employees}
            isEven={content.employees.length === 1 || content.employees.length % 2 === 0}
            {...props}
          />
        );

      case 'footnote':
        return (
          <Footnote
            key={key}
            text={content.text}
            {...props}
          />
        );

      case 'infographic': {
        const { title, fields = {} } = content.infographic;

        return (
          <Animator key={key}>
            <Infograph
              key={key}
              title={title}
              definition={fields.definition}
              {...props}
            />
          </Animator>
        );
      }

      case 'intro':
        return (
          <Intro
            key={key}
            text={content.text}
            {...props}
          />
        );

      case 'iframe':
        return (
          <Iframe
            key={key}
            title={content.title}
            height={content.height}
            src={content.src}
            {...props}
          />
        );

      case 'sponsors':
      case 'logos':
        return (
          <Logos key={key} {...props}>
            {content.logos.map((item, ii) => (
              <Logo
                key={ii}
                image={_get(item, 'image.sizes.medium', item.image.url)}
                url={item.link}
              />
            ))}
          </Logos>
        );

      case 'speakers':
        return (
          <Speakers
            key={key}
            heading={content.heading || undefined}
            headingNote={content.heading_note || undefined}
            speakers={content.speaker || []}
            {...props}
          />
        );

      case 'buttons':
        return (
          <Buttons key={key} alignment={content.alignment} {...props}>
            {content.buttons.map((item, ii) => (
              <Button
                key={ii}
                to={item.link}
              >
                {item.title}
              </Button>
            ))}
          </Buttons>
        );

      case 'modular_component': {
        const { title, fields = {} } = content.modular_component;

        return (
          <ModularComponent
            key={key}
            title={title}
            html={fields.component_html}
            scripts={fields.component_scripts || []}
            height={fields.component_height}
            customHeight={fields.component_custom_height}
            iframeTitle={key}
            {...props}
          />
        );
      }
      case 'week_in_5g_map':
        return (
          <Map
            key={key}
            heading="5G is Spreading"
            subline={
              <span>Choose your city and state to see the latest 5G news</span>
            }
            map_data={content.map_data}
            {...props}
            // onChange={this.onChange}
            // onClose={this.onClose}
            // options={options}
            type="5g"

          />
        );

      case 'adspace_sidebar':
        return (
          <AdSpaceSidebar
            key={key}
            hasMobileMinuteSubscription={content.has_mobile_minute_subscription}
            buttonText="Sign Up"
            adSpaceRepeater={content.adspace_repeater}
            {...props}
          />
        );

      case 'timeline':
        return (
          <Timeline
            key={key}
            title={content.title}
            description={content.description}
            instructions={content.instructions}
            json={content.json}
            {...props}
          />
        );

      case 'post_carousels':
        return (
          <PostCarousels
            key={key}
            mobileViewInstructions={content.mobile_view_instructions}
            postCategory={content.post_category}
            {...props}
          />
        );

      default:
        return null;
    }
  }

  render() {
    const { data } = this.props;
    let adSpaceSlices = null;
    let adSpaceSidebar = null;

    if (typeof data === 'boolean') {
      return null;
    }

    const slicesWithIndices = Slices.addAttachmentIndices(data);
    const slices = Slices.addNumbersToHeaders(slicesWithIndices);

    // Check to see if AdSpace Sidebar component is used,
    // need to render page differently if it exists
    let adSpaceIndex = slices.findIndex(content => content.acf_fc_layout === 'adspace_sidebar');

    if (adSpaceIndex !== -1) {
      // Split the components after and including the adspace into a separate array
      adSpaceSlices = slices.splice(adSpaceIndex);
      // Split off the adspace component into its own variable
      adSpaceSidebar = adSpaceSlices.shift();
      return (
        <Fragment>
          {slices.map(this.renderSlice)}
          <div className={s.slices}>
            <div className={s.slices__col}>
              <div className={s.slices__row}>
                <div className={s.sidebarleft}>
                  {adSpaceSlices.map(this.renderSlice)}
                </div>
                <div className={s.sidebarright}>
                  <div className={s.sidebarright__sticky}>
                    {this.renderSlice(adSpaceSidebar, 1)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      );
    }

    return slices.map(this.renderSlice);
  }
}
