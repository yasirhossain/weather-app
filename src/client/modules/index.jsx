import counter from './counter';
import './favicon';
import post from './post';
import weather from './weather';

import Feature from './connector';

//export default new Feature(counter, post, weather);
export default new Feature(counter, weather);
