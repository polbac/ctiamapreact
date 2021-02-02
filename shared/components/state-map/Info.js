/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import PrintModal from './PrintModal';
import GdpIcon from './assets/images/map/gdp-icon.svg';
import JobIcon from './assets/images/map/job-icon.svg';
import PrintIcon from './assets/images/map/print.svg';
import s from './assets/scss/main.scss';
import ArrowBack from './assets/images/map/arrow.svg';
import {printDocument} from './utils'
class Info extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      navigationType: 'Overall',
      selectedType: false,
      selectedItem: false,
      infoTitle: 'Overall',
      isMobile: false,
      showModal: false,
      isMenuMobileOpen: false,
    };
  }

  componentDidMount() {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

 onResize = () => {
   this.setState({
     ...this.state,
     isMobile: window.matchMedia('(max-width: 1080px)').matches,
   });
 }

 componentDidUpdate(prevProps) {
   if (this.props.data !== prevProps.data) {
     // eslint-disable-next-line react/no-did-update-set-state
     this.setState({
       ...this.state,
       navigationType: 'Overall',
       selectedType: false,
       selectedItem: false,
       infoTitle: 'Overall',
     });
   }
 }

 onSelected(item, type, title) {
   this.setState({
     ...this.state,
     selectedType: type,
     selectedItem: item,
     infoTitle: title,
     isMenuMobileOpen: false,
   });
 }

  handleClickOpenModal() {
    if (1) {
      printDocument(this.props.data);
      return
    }
    this.setState({
      showModal: true,
    });
  }

  handleCloseModal() {
    this.setState({
      showModal: false,
    });
  }

 onTypeChange(type) {
   let selectedItem;
   let infoTitle;
   let selectedType;
   let isMenuMobileOpen = true;

   if (type === 'Overall') {
     infoTitle = 'Overall';
     selectedItem = false;
     selectedType = false;
     isMenuMobileOpen = false;
   }

   if (type === 'Congressional District') {
     selectedItem = this.props.data.districts[0];
     infoTitle = 'District 01';
     selectedType = 'districts';
   }

   if (type === 'Metro Area') {
     const sortMetroAreas = Object.keys(this.props.data.metro_areas).sort();
     const key = sortMetroAreas[0];

     selectedItem = this.props.data.metro_areas[key].name;
     infoTitle = selectedItem;
     selectedType = 'metro_areas';
   }

   this.setState({
     ...this.state,
     navigationType: type,
     selectedType,
     infoTitle,
     selectedItem,
     isMenuMobileOpen,
   });

 }

 toggleMenuMobile() {
   this.setState({
     ...this.state,
     isMenuMobileOpen: !this.state.isMenuMobileOpen,
   });
 }

 render() {
   const { type, data, show } = this.props;
   const sortElements = {};

   let itemData = data;
   let title = 'Metro Area';

   if (data && type === 'states') {
     title = data.name;
     sortElements.districts = Object.keys(data.districts).sort();
     sortElements.areas = Object.keys(data.metro_areas).sort();
     itemData = this.state.selectedType ?
       data[this.state.selectedType][this.state.selectedItem ?
         this.state.selectedItem :
         sortElements[this.state.selectedType].slice(0, 1)] :
       data;
   }

   return (
     <div className={`${s.map__info} ${show && s.map__info__visible}`}>
       {type === 'states' &&
         <div className={`${s.map__info__column} ${show && s.map__info__column__visible} ${!this.state.isMenuMobileOpen && s.map__info__column__mobilenotopen}`}>
           {show && (
             <div>
               <div
                 className={`${s.tab_link} ${(this.state.navigationType === 'Overall') && s.active}`}
                 onClick={() => this.onTypeChange('Overall')}
                 onKeyDown={() => this.onTypeChange('Overall')}
                 tabIndex="0"
                 role="button"
               >Overall
            </div>
               {sortElements.districts.length ?
                 <div
                   className={`${s.tab_link} ${(this.state.navigationType === 'Congressional District') && s.active}`}
                   onClick={() => this.onTypeChange('Congressional District')}
                   onKeyDown={() => this.onTypeChange('Congressional District')}
                   tabIndex="0"
                   role="button"
                 >Congressional District
              </div> : ''}
               {(this.state.navigationType === 'Congressional District' && sortElements.districts.length) &&
               <div className={s.tab_list}>
                 {sortElements.districts.map((item, index) => (
                   <div key={index} className={s.item}>
                     <div
                       onClick={() => this.onSelected(item, 'districts', `District ${item}`)}
                       onKeyDown={() => this.onSelected(item, 'districts', `District ${item}`)}
                       tabIndex="0"
                       role="button"
                       className={`${((!this.state.selectedItem && !index) || (this.state.selectedItem === item)) && s.active}`}
                     >
                       <span>District {item}</span>
                     </div>
                   </div>
                ))}
               </div>}
               {sortElements.areas.length ?
                 <div
                   className={`${s.tab_link} ${(this.state.navigationType === 'Metro Area') && s.active}`}
                   onClick={() => this.onTypeChange('Metro Area')}
                   onKeyDown={() => this.onTypeChange('Metro Area')}
                   tabIndex="0"
                   role="button"
                 >
              Metro Area
              </div> : ''}
               {(this.state.navigationType === 'Metro Area' && sortElements.areas.length) &&
               <div className={s.tab_list}>
                 {sortElements.areas.map((item, index) => (
                   <div key={index} className={s.item}>
                     <div
                       onClick={() => this.onSelected(item, 'metro_areas', item)}
                       onKeyDown={() => this.onSelected(item, 'metro_areas', item)}
                       tabIndex="0"
                       role="button"
                       className={`${((!this.state.selectedItem && !index) || (this.state.selectedItem === item)) && s.active}`}
                     >
                       <span>{item}</span>
                     </div>
                   </div>
                ))}
               </div>}
             </div>)}
         </div>
        }
       <div className={`${s.map__info__content} ${show && s.map__info__content__visible}`}>
         <div className={s.map__info__content__list}>
           <div className={s.map__info__content__list__state}>{title}</div>
            <a 
              className={s.map__info__content__list__print} 
              onClick={() => this.handleClickOpenModal()}
            >
              PRINT
              <PrintIcon />
           </a>
           {this.state.showModal && <PrintModal data={data} closeModal={() => this.handleCloseModal()} />}
           <div className={s.map__info__content__list__title}>
             {type === 'states' && this.state.infoTitle}
             {(type !== 'states' && data) && data.name}
           </div>
           <div className={s.map__info__content__list__boxes}>
             {itemData && itemData.gdp &&
               <div className={`${s.content__box} ${s.box__blue}`}>
                 <div className={s.row}>
                   <div className={s.content__box__icon}>
                     <GdpIcon />
                   </div>
                   <div className={s.content__box__title}>{itemData.gdp.sum_format}</div>
                   <div className={s.content__box__ttext}>GDP GROWTH</div>
                 </div>
               </div>}
             {itemData && itemData.job && itemData.job.sum_format &&
               <div className={`${s.content__box} ${s.content__box__box_green}`}>
                 <div className={s.row}>
                   <div className={s.content__box__icon}>
                     <JobIcon />
                   </div>
                   <div className={s.content__box__title}>{itemData.job.sum_format}</div>
                   <div className={s.content__box__ttext}>NEW JOBS</div>
                 </div>
               </div>}
             <div className={s.district}>
               <a className={s.prev}><span className={`${s.arrow} ${s.left}`} /></a>
               <a className={s.next} href="#!"><span className={`${s.arrow} ${s.right}`} /></a>
             </div>
           </div>

         </div>
       </div>

       {(type === 'states' && this.state.isMobile) &&
         <div className={s.selectbox__bottom} onClick={this.toggleMenuMobile.bind(this)}>
           <div className={s.filtersbox}>
             <div className={`${s.selects} ${s.filters}`}>
               <div className={`${s.filter} ${s.drop}`}>
                 <div className={`${s.option} ${s.selected}`}>
                   <span className={s.text} data-text="Data">
                          Data:
                          <span id="mobile-title">{this.state.navigationType.replace('Congressional', '')}</span>
                   </span>
                 </div>
               </div>
             </div>
           </div>
         </div>}

       <a className={s.map_page__columnleft__map__back__mobile} onClick={this.props.onExit}>
         <ArrowBack />
              Back to filter
          </a>

     </div>

   );
 }
}

Info.propTypes = {
  onExit: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default Info;
