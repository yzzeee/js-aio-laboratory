import { reduce } from 'lodash/collection'
import { isArray, isEmpty, isString } from 'lodash/lang';
import { mapValues } from 'lodash/object';
import { replace } from 'lodash/string';

/**
 * @description 다국어 변환 함수와 다국어 처리 키를 인자로 받아서 다국어 처리된 메시지를 반환하는 함수
 * @param {type IntlFormatters.formatMessage} formatMessage - useIntl hook에서 반환되는 formatMessage 함수(다국어 변환 함수)
 * @param {string | (string | string[])[]} originIntlIds - 다국어 키(문자열, 배열, 튜플)
 * ex) w.name, ['t.input', 'w.name'], ['t.input', ['t.multi', 'w.user', 'w.name']]
 * t.로 시작되는 다국어 키는 배열의 맨 앞에 위치한다.
 * @return {string} - 다국어 처리된 문자
 */
export const toIntl = (formatMessage, originIntlIds) => {
  const r1 = /(c)\./;
  const r2 = /(w|t)\./;

  function _toIntl(f, i) {
    if (!isEmpty(i)) {
      // String 또는 JSX.Element 일 때 처리
      if (!isArray(i)) {
        if (r1.test(i)) {
          return replace(i, 'c.', '');
        }
        if (r2.test(i)) {
          return f({ id: i });
        }
        return i;
      }

      // 배열일 때 처리
      const [h, ...t] = i;
      if (isArray(t[0])) {
        t[0] = `c.${_toIntl(formatMessage, t[0])}`;
      }

      const v = reduce(t, (acc, id, idx) => ({ ...acc, [`arg${idx}`]: _toIntl(f, id) }), {});
      return f({ id: h }, v);
    }
    return '';
  }

  return _toIntl(formatMessage, originIntlIds);
};

/**
 * @description 다국어 변환을 하기 위한 객체를 인자로 받아서 다국어 처리된 객체를 반환하는 함수
 * @param {type IntlFormatters.formatMessage} formatMessage - useIntl hook에서 반환되는 formatMessage 함수(다국어 변환 함수)
 * @param {string | (string | string[])[]} objs - 다국어 키를 값으로 가지는 객체
 * @return {string} - 다국어 처리된 객체
 */
// TODO : 타입 추론
export const getLocaleObject = (
  formatMessage,
  objs,
) => {
  return mapValues(objs, (obj) => toIntl(formatMessage, obj));
};
