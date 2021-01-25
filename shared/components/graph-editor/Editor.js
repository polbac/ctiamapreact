import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import GraphBlock, { Graph } from 'components/graph-block';
import { ButtonDropdown } from 'components/button';

import DownloadSvg from 'assets/images/icons/actionicon-download-optim.svg';

import Row from './Row';
import MetaRow from './MetaRow';

import s from './Editor.scss';

class Editor extends Component {

  static propTypes = {
    type: PropTypes.object,
    graph: PropTypes.object,
    onRemove: PropTypes.func,
  }

  state = {
    selectedSet: 0,
  }

  render() {
    const { type, graph, onRemove } = this.props;
    const { selectedSet } = this.state;
    const { data, meta } = graph.getDataset(selectedSet);

    return (
      <GraphBlock
        title={`${type.label} Editor (${selectedSet + 1})`}
        content={
          <Fragment>
            {graph.config.hasMultipleSets && (
              <div className={s.editor__buttons}>
                {graph.data.map((set, i) => (
                  <button
                    aria-label="changes selected item"
                    className={s(s.editor__button, { isActive: selectedSet === i })}
                    onClick={() => this.setState({ selectedSet: i })}
                  >
                    Set #{i + 1}
                  </button>
                ))}
                <button
                  aria-label="sets index on graph"
                  className={s.editor__button}
                  onClick={() => {
                    const setIndex = graph.addSet();

                    this.setState({ selectedSet: setIndex });
                  }}
                >
                  +
                </button>
              </div>
            )}

            {graph.config.hasRows && (
              <div key={`data-set-${selectedSet}`} className={s.editor}>
                <ul className={s.editor__list}>
                  {data.map((row, i) => (
                    <li key={i} className={s.editor__item}>
                      <Row
                        index={row.id}
                        label={selectedSet === 0 ? row.label : graph.data[0][i].label}
                        value={parseInt(row.value, 10)}
                        showLabel={row.showLabel}
                        color={row.color}
                        disableLabel={selectedSet !== 0}
                        showColor={graph.config.hasRowsColor}
                        onChange={(field, value) =>
                          graph.updateRow(row.id, field, value, selectedSet)
                        }
                        onRemove={() => graph.removeRow(row.id, selectedSet)}
                        onColorChange={color => graph.updateRow(row.id, 'color', color.hex)}
                        isDonut={type.id === 'donut'}
                        isFixedDonut={type.id === 'fixed-donut'}
                      />
                    </li>
                  ))}
                </ul>

                <div className={s.editor__functions}>
                  <button
                    aria-label="adds row to graph"
                    className={s.editor__button}
                    onClick={() => graph.addRow(data)}
                  >
                      Add Data Row
                    </button>

                  {selectedSet !== 0 && (
                    <button
                      aria-label="removes selected set from graph"
                      className={s.editor__button}
                      onClick={() => {
                        this.setState({ selectedSet: 0 });
                        graph.removeSet(selectedSet);
                      }}
                    >
                      Remove Set
                    </button>
                  )}
                </div>
              </div>
            )}

            {graph.type === 'number' && (
              <div className={s.editor__content}>
                Supported symbols:
                <ul>
                  {['0-9', '+', '-', '.', '$', '%', '/', 'M', 'I', 'L', 'O', 'N', 'B', 'K', 'T','G (Ghz)','Z (Mhz)','X'].map((char, i) => (
                    <li key={i}>{char}</li>
                  ))}
                </ul>
              </div>
            )}
          </Fragment>
        }
        bottom={[
          <ul key={`meta-${selectedSet}`} className={s(s.editor__list, s.isMeta)}>
            {Object.keys(meta).map(key => (
              <li key={key} className={s.editor__item}>
                <MetaRow
                  label={key}
                  value={meta[key]}
                  multiLine={graph.type === 'number' && key === 'label'}
                  onChange={(value) => {
                    meta[key] = value;
                  }}
                />
              </li>
            ))}
          </ul>,
          <div className={s.editor__output} key="output">
            <textarea
              readOnly
              value={graph.json}
              ref={(el) => { this.codeEl = el; }}
              className={s.editor__textarea}
            />
          </div>,
          <div className={s.editor__functions} key="functions">
            <button
              aria-label="copies an item"
              className={s(s.editor__button, s.primary)}
              onClick={() => {
                this.codeEl.select();
                document.execCommand('copy');
              }}
            >
              Copy code
            </button>

            <ButtonDropdown
              icon={<DownloadSvg />}
              items={[
                <button onClick={() => this.graphEl.saveAsPng()}>Download as PNG</button>,
                <button onClick={() => this.graphEl.saveAsSvg()}>Download as SVG</button>,
              ]}
            />

            <button aria-label="remove item" className={s.row__remove} onClick={onRemove}>+</button>
          </div>,
        ]}
      >
        <Graph
          ref={(el) => { this.graphEl = el; }}
          definition={graph.json}
        />
      </GraphBlock>
    );
  }
}

export default observer(Editor);
