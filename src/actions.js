import { SWITCH_LIGHTS } from './actionTypes';

/*
 * action creators
 */

export function toggleLight(text) {
  return {
    type: SWITCH_LIGHTS,
    text,
  };
}
