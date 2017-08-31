import { modifyObject } from 'subtender'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton,
} from 'react-bootstrap'

import {
  supportedLocales,
  describeLocale,
} from '../i18n'

import { langSelector } from '../selectors'
import { mapDispatchToProps } from '../store'
import { PTyp } from '../ptyp'

class LangPickerImpl extends Component {
  static propTypes = {
    lang: PTyp.string.isRequired,
    modifyState: PTyp.func.isRequired,
  }

  handleChangeLang = newLang =>
    this.props.modifyState(
      modifyObject('lang', () => newLang)
    )

  render() {
    const {lang} = this.props
    return (
      <ButtonToolbar>
        <ToggleButtonGroup
          type="radio" name="options" value={lang}
          onChange={this.handleChangeLang}
        >
          {
            supportedLocales.map(l => (
              <ToggleButton value={l} key={l}>
                {describeLocale(l)}
              </ToggleButton>
            ))
          }
        </ToggleButtonGroup>
      </ButtonToolbar>
    )
  }
}

const LangPicker = connect(
  state => ({
    lang: langSelector(state),
  }),
  mapDispatchToProps,
)(LangPickerImpl)

export { LangPicker }
