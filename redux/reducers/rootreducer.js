import {combineReducers} from 'redux';
import { alluserdatareducer } from './alluserdatareducer';
import { userinforeducer } from './userinforeducer';
import { universalreloadreducer } from './universalreloadreducer';
export default combineReducers({
  alluserdatareducer,
  userinforeducer,
  universalreloadreducer,
});
