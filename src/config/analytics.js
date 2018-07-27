import { Analytics, Hits as GAHits } from 'react-native-google-analytics';
import { GOOGLE_ANALYTICS_ID } from './secrets';

let analytics = new Analytics(GOOGLE_ANALYTICS_ID);

let track = screen => new GAHits.ScreenView((screen));

export default track;
