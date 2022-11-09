import { enableES5, produce } from 'immer';
//인터넷 익스프로럴에서도 동작하게 하기 위해서 만난다.
export default (...args) => {
  enableES5();
  return produce(...args);
};
