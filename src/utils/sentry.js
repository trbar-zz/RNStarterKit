import { Sentry } from 'react-native-sentry'
import { SENTRYURL } from 'react-native-dotenv'

export default function initSentry() {
  Sentry.config(SENTRYURL).install()
}
