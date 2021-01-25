/* eslint-disable no-console */
import React from 'react';
import ArrowBack from 'assets/images/map/arrow.svg';
import GdpIcon from 'assets/images/map/gdp-icon.svg';
import JobIcon from 'assets/images/map/job-icon.svg';
import PrintIcon from 'assets/images/map/print.svg';
import s from './scss/main.scss';

class Info extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      navigationType: 'Overall',
      selectedType: false,
      selectedItem: false,
      infoTitle: 'Overall',
      isMobile: false,
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
     isMobile: window.matchMedia('(max-width: 1080px)').matches,
   });
 }

 componentDidUpdate(prevProps) {
   if (this.props.data !== prevProps.data) {
     // eslint-disable-next-line react/no-did-update-set-state
     this.setState({
       navigationType: 'Overall',
       selectedType: false,
       selectedItem: false,
       infoTitle: 'Overall',
     });
   }
 }

 onSelected(item, type, title) {
   this.setState({
     selectedType: type,
     selectedItem: item,
     infoTitle: title,
   });
 }

 onTypeChange(type) {
   this.setState({
     navigationType: type,
     infoTitle: type,
   });
 }

 render() {
   const { type, data } = this.props;
   const sortElements = {};
   let itemData = data;
   let title = 'Metro Area';

   if (type === 'states') {
     title = data.name;
     sortElements.districts = Object.keys(data.districts).sort();
     sortElements.areas = Object.keys(data.metro_areas).sort();
     itemData = this.state.selectedType ?
       data[this.state.selectedType][this.state.selectedItem ?
         this.state.selectedItem :
         sortElements[this.state.selectedType].slice(0, 1)] :
       data;
   }

   console.log(data);

   return (
     <div className={s.map__info}>
       <a href="#!" className={s.map__back}>
         <ArrowBack />
              Back to Map
         </a>
       <a href="#!" className={s.map__back__mobile}>
         <ArrowBack />
            Back to filter
        </a>
       {type === 'states' &&
       <div className={s.map__info__column}>
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
       </div>}
       <div className={s.map__info__content}>
         <div className={s.map__info__content__list}>
           <div className={s.map__info__content__list__state}>{title}</div>
           <a href="#!" className={s.map__info__content__list__print}>
               PRINT
               <PrintIcon />
           </a>
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
             {itemData && itemData.job &&
             <div className={`${s.content__box} ${s.box__green}`}>
               <div className={s.row}>
                 <div className={s.content__box__icon}>
                   <JobIcon />
                 </div>
                 <div className={s.content__box__title}>{itemData.job.sum_format}</div>
                 <div className={s.content__box__ttext}>NEW JOBS</div>
               </div>
             </div>}
             <div className={s.district}>
               <a className={s.prev} href="#!"><span className={`${s.arrow} ${s.left}`} /></a>
               <div className={s.district__title}>District 01 Esto se ve?</div>
               <a className={s.next} href="#!"><span className={`${s.arrow} ${s.right}`} /></a>
             </div>
           </div>

           {(type === 'state' && this.state.isMobile) &&
           <div className={s.select_box__bottom}>
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
         </div>
       </div>
     </div>
   );
 }
}

export default Info;
