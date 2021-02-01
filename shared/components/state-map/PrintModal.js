import React from "react";
import ReactDOM from "react-dom";
import Button from "components/button";
import CTIALogo from "./assets/images/modal/ctia-logo.svg";
import ShapeOne from "./assets/images/modal/shape-1.svg";
import ShapeTwo from "./assets/images/modal/shape-2.svg";
import GdpIcon from "./assets/images/map/gdp-icon.svg";
import JobIcon from "./assets/images/map/job-icon.svg";
import s from "./assets/scss/main.scss";

export default function PrintModal({ closeModal, data }) {
  return ReactDOM.createPortal(
    <div className={s.modal__print}>
      <div className={s.modal__print__innerWrapper}>
        <div className={s.modal__print__action_buttons}>
          <Button className={s.button}>Download PDF</Button>
          <buton className={s.modal__print__back} onClick={closeModal}>
            Back
          </buton>
        </div>
        <div className={s.modal__print__modal_body}>
          <div className={s.modal__print__header}>
            <div>
              <span>5G ECONOMIC IMPACT</span>
              <h3>{data.name}</h3>
            </div>
            <div>
              <CTIALogo />
            </div>
          </div>

          <p className={s.modal__print__impact}>
            The 5G Economy will have a significant impact on America’s cities
            and towns, large and small. Over the next ten years, we will see
            benefits across the country, including <b>4.6M</b> new jobs and
            <b>$1.7T</b> in economic growth.
          </p>

          <div className={s.modal__print__cards}>
            <div className={s.modal__print__cards__shape}>
              <ShapeTwo />
            </div>
            <div className={s.map__info__content__list__boxes}>
              {data && data.gdp && data.gdp.sum_format && (
                <div className={`${s.content__box} ${s.box__blue}`}>
                  <div className={s.row}>
                    <div className={s.content__box__icon}>
                      <GdpIcon />
                    </div>
                    <div className={s.content__box__title}>
                      {data.gdp.sum_format}
                    </div>
                    <div className={s.content__box__ttext}>
                      GDP GROWTH STATEWIDE
                    </div>
                  </div>
                </div>
              )}
              {data && data.job && data.job.sum_format && (
                <div
                  className={`${s.content__box} ${s.content__box__box_green}`}
                >
                  <div className={s.row}>
                    <div className={s.content__box__icon}>
                      <JobIcon />
                    </div>
                    <div className={s.content__box__title}>
                      {data.job.sum_format}
                    </div>
                    <div className={s.content__box__ttext}>
                      NEW JOBS STATEWIDE
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className={s.modal__print__clear} />
          </div>

          {data &&
            data.metro_areas &&
            Object.keys(data.metro_areas).length > 0 && (
              <div className={s.modal__print__metro_table}>
                <div className={s.modal__print__table_head}>
                  <div className={s.modal__print__table_head__title}>
                    Metro Areas
                  </div>
                  <div className={s.modal__print__head__item}>GDP Growth</div>
                  <div className={s.modal__print__head__item}>New Jobs</div>
                </div>
                {Object.keys(data.metro_areas).map((el, i) => (
                  <div
                    className={s.modal__print__table_items}
                    key={`item-${i}`}
                  >
                    <div className={s.modal__print__item_title}>
                      {data.metro_areas[el].name}
                    </div>
                    <div>{data.metro_areas[el].gdp.sum_format}</div>
                    <div>{data.metro_areas[el].job.sum_format}</div>
                  </div>
                ))}
              </div>
            )}

          {data && data.districts && Object.keys(data.districts).length > 0 && (
            <div className={s.modal__print__district_table}>
              <div className={s.modal__print__district_table__shape}>
                <ShapeOne />
              </div>
              <div className={s.modal__print__table_head}>
                <div className={s.modal__print__table_head__title}>
                  Congressional Districts
                </div>
                <div className={s.modal__print__head__item}>GDP Growth</div>
                <div className={s.modal__print__head__item}>New Jobs</div>
              </div>
              {Object.keys(data.districts).map((el, i) => (
                <div className={s.modal__print__table_items} key={`item-${i}`}>
                  <div className={s.modal__print__item_title}>
                    {data.districts[el].name}
                  </div>
                  <div>{data.districts[el].gdp.sum_format}</div>
                  <div>{data.districts[el].job.sum_format}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.querySelector("#portal-modal-print")
  );
}
