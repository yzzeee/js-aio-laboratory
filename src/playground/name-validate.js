import { size } from 'lodash/collection';
import { DNS_1123_LABEL, DNS_1123_SUBDOMAIN } from '../dummy/name-validate';

const dns1123LabelFmt = '[a-z0-9]([-a-z0-9]*[a-z0-9])?';
const dns1123LabelRegexp = new RegExp(`^${dns1123LabelFmt}$`);
const dns1123LabelMaxLength = 63;

/**
 * @description DNS RFC 1123 레이블 이름 검증
 * @param {string} value 대상 문자열
 * @return {boolean} 패턴 매치 여부
 * @link https://github.com/kubernetes/kubernetes/blob/53a9d106c4aabcd550cc32ae4e8004f32fb0ae7b/pkg/util/validation.go
 */
export const isDNSLabel = (value) => {
  return size(value) <= dns1123LabelMaxLength && dns1123LabelRegexp.test(value);
};

const dns1123SubdomainFmt = `${dns1123LabelFmt}(\\.${dns1123LabelFmt})*`;
const dns1123SubdomainRegexp = new RegExp(`^${dns1123SubdomainFmt}$`);
const dns1123SubdomainMaxLength = 253;

/**
 * @description DNS RFC 1123 서브 도메인 검증
 * @param {string} value 대상 문자열
 * @return {boolean} 패턴 매치 여부
 * @link https://github.com/kubernetes/kubernetes/blob/53a9d106c4aabcd550cc32ae4e8004f32fb0ae7b/pkg/util/validation.go
 */
export const isDNS1123Subdomain = (value) => {
  return size(value) <= dns1123SubdomainMaxLength && dns1123SubdomainRegexp.test(value);
};

// Test
// for (let val of DNS_1123_LABEL.GOOD_VALUE) console.log('DNS 1123 LABEL 👍', isDNSLabel(val));
// for (let val of DNS_1123_LABEL.BAD_VALUE) console.log('DNA 1123 LABEL 👎', isDNSLabel(val));
//
// for (let val of DNS_1123_SUBDOMAIN.GOOD_VALUE) console.log('DNS 1123 SUBDOMAIN  👍', isDNS1123Subdomain(val));
// for (let val of DNS_1123_SUBDOMAIN.BAD_VALUE) console.log('DNS 1123 SUBDOMAIN 👎', isDNS1123Subdomain(val));