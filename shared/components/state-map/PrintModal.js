import React from "react";
import ReactDOM from "react-dom";
import Button from "components/button";
import CTIALogo from "./assets/images/modal/ctia-logo.svg";
import GdpIcon from "./assets/images/map/gdp-icon.svg";
import JobIcon from "./assets/images/map/job-icon.svg";
import s from "./assets/scss/main.scss";
import { electron } from "webpack";

export default function PrintModal({ closeModal, data }) {
  console.log(data);
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
          </div>

          {data &&
            data.metro_areas &&
            Object.keys(data.metro_areas).length > 0 && (
              <div className={s.modal__print__table_head}>
                <div className={s.modal__print__table_head__title}>
                  Metro Areas
                </div>
                <div className={s.modal__print__table_head__title_item}>
                  GDP Growth
                </div>
                <div className={s.modal__print__table_head__title_item}>
                  New Jobs
                </div>
              </div>
            )}

          {data && data.districts && Object.keys(data.districts).length > 0 && (
            <div>
              <div className={s.modal__print__table_head}>
                <div className={s.modal__print__table_head__title}>
                  Congressional Districts
                </div>
                <div className={s.modal__print__table_head__title_item}>
                  GDP Growth
                </div>
                <div className={s.modal__print__table_head__title_item}>
                  New Jobs
                </div>
              </div>
              {Object.keys(data.districts).map((el, i) => (
                <div className={s.modal__print__table_items} key={`item-${i}`}>
                  <div>{el.name}</div>
                  <div>{el.name}</div>
                  <div>{el.name}</div>
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
