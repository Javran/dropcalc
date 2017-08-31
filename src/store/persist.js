import { guessLocale } from '../i18n'

const mkDefaultPersistState = () => ({
  lang: guessLocale(),
})

const loadPersistState = () => {
  try {
    const raw = localStorage.dropCalc
    if (typeof raw === 'undefined')
      return mkDefaultPersistState()

    const parsed = JSON.parse(raw)
    if (parsed.$dataVersion === '0.0.1') {
      const {lang} = parsed
      return {lang}
    } else {
      throw new Error(`invalid $dataVersion ${parsed.$dataVersion}`)
    }
  } catch (e) {
    console.error('error while loading preparedState from localStorage', e)
    return mkDefaultPersistState()
  }
}

const savePersistState = state => {
  const {lang} = state
  localStorage.dropCalc = JSON.stringify({
    lang,
    $dataVersion: '0.0.1',
  })
}

export { loadPersistState, savePersistState }
