import * as C from 'fxjs/Concurrency';
import * as L from 'fxjs/Lazy';
import * as S from 'fxjs/Strict';
import ip from 'ip';
import * as ip_utils from 'ip-utils';
import lodash from 'lodash';
import { IP_ADDRESSES } from '../dummy/ip_addresses';

/**
 * @param {Object|Object[]} objs IP List가 포함 되어있는 객체 배열
 * @param {string} key IP List가 들어있는 프로퍼티 명
 * @param {string|undefined} id 식별키
 * @param {string|undefined} name 이름
 * @description IP 배열이 있는 객체 배열을 전달받아 IP 정보를 담은 키(converted_ip_addresses)를 추가한 새로운 객체 배열을 반환한다.
 */
export const convertIpListToLongListInObjects = (objs, key, id, name) => {
  let idx = 0;

  return S.go(
    objs,
    C.map(obj => {
      const errors = []; // 전달된 IP가 유효하지 않다면 에러 메시지 저장할 배열
      const ipList = obj[key];
      const convertedIpList = ipListToLongListConverter(
        lodash.isString(ipList) ? lodash.split(ipList, '\n') : ipList,
        idx,
        errors,
      );

      // 범위 형태 IP와 단일 형태의 IP를 그룹으로 나눔
      const group = lodash.groupBy(
        lodash.uniq(lodash.compact(convertedIpList)),
        item => (lodash.includes(item, '-') ? 'ranges' : 'singles'),
      );

      if (id) group['id'] = obj[id];
      if (name) group['name'] = obj[name];
      // eslint-disable-next-line no-plusplus
      group['index'] = idx++;

      let host_count = 0; // 해당 ip(ranges, singles)에 속하는 전체 호스트 카운트 변수

      if (group['ranges']) {
        group['ranges'] = rangesReducer(group['ranges']);
        group['ranges_readable'] = longListToIpListConverter(group['ranges']);
        host_count =
          host_count +
          lodash.reduce(
            group['ranges'],
            (acc, range) => {
              const parsed = lodash.split(range, '-');
              return acc + (Number(parsed[1]) - Number(parsed[0]) + 1);
            },
            0,
          );
      } else {
        group['ranges'] = [];
        group['ranges_readable'] = [];
      }

      if (group['singles']) {
        group['singles'] = singlesFilter(group['singles'], group['ranges']);
        group['singles_readable'] = longListToIpListConverter(group['singles']);
        host_count = host_count + group['singles'].length;
      } else {
        group['singles'] = [];
        group['singles_readable'] = [];
      }

      // 호스트 수 저장
      group['host_count'] = host_count;
      // eslint-disable-next-line object-shorthand
      return {
        ...obj,
        converted_ip_addresses: group,
        errors,
      };
    }),
    S.takeAll,
  );
};

/**
 * @param {Object[]} ipList IP List
 * @description convertIpListToLongListInObjects 함수로 변환된 아이피 중 에러가 없는 IP의 converted_ip_addresses를 반환한다.
 */
export const comparableIpFilter = S.pipe(
  L.filter(f => lodash.isEmpty(f.errors)),
  C.map(f => f.converted_ip_addresses),
);

/**
 * @param {Object[]} userInputIpList 사용자가 입력한 IP List가 포함 되어있는 객체
 * @param {Object} groupedIpListObject IP List가 들어있는 프로퍼티 명
 * @description IP List가 포함되어 있는 객체에서 inventoryObjectGroupByZone 에 지정한 프로퍼티 명에 해당되는 IP List 를 반환한다.
 */
export const findMatchedIpFromObject = (
  userInputIpList,
  groupedIpListObject,
) => {
  let group = 'production';
  return S.go(
    userInputIpList,
    C.map(item => {
      if (item['group']) group = item['zone'];
      return groupedIpListObject[group];
    }),
    C.map(ipList => comparableIpFilter(ipList)),
    comparableIpList => {
      let index = 0;
      return lodash.map(comparableIpList, ipList => {
        // eslint-disable-next-line no-plusplus
        const target = userInputIpList[index++];
        const targetIps = [...target['ranges'], ...target['singles']];

        // 호스트 수가 동일한 객체를 필터링
        const hostCountMatchedObject = lodash.filter(
          ipList,
          ipInfo => target.host_count === ipInfo.host_count,
        );

        // 호스트 수가 동일한 객체가 없다면 빈 객체 반환
        if (lodash.isEmpty(hostCountMatchedObject))
          return {};

        // 동일한 객체 조회
        const matchedObject = S.go(
          hostCountMatchedObject,
          L.map(filteredIp => {
            const filteredRanges = filteredIp['ranges'];
            const filteredSingles = filteredIp['singles'];

            if (filteredIp['host_count'] === 1) {
              if (filteredSingles[0] === targetIps[0])
                return groupedIpListObject[target['id']][filteredIp['index']];

              return {};
            }

            const targetMap = lodash.map(targetIps, targetIp => {
              if (lodash.includes(targetIp, '-')) {
                const targetStart = Number(lodash.split(targetIp, '-')[0]);
                const targetEnd = Number(lodash.split(targetIp, '-')[1]);
                const range = targetEnd - targetStart + 1;

                if (lodash.includes(filteredRanges, targetIp))
                  // 범위 아이피와 비교하여 동일한 값 있는지 확인
                  return true;

                const ok = lodash.some(filteredRanges, filteredIp => {
                  // 범위 아이피 내에 속하는지 확인
                  const filteredStart = Number(
                    lodash.split(filteredIp, '-')[0],
                  );
                  const filteredEnd = Number(lodash.split(filteredIp, '-')[1]);
                  if (
                    targetStart >= filteredStart &&
                    targetEnd <= filteredEnd
                  )
                    return true;

                });

                if (
                  lodash.includes(filteredSingles, targetStart) &&
                  lodash.includes(filteredSingles, targetEnd)
                ) {
                  const startIndex = lodash.findIndex(
                    filteredSingles,
                    single => single === targetStart,
                  );
                  const endIndex = lodash.findIndex(
                    filteredSingles,
                    single => single === targetEnd,
                  );

                  if (endIndex - startIndex + 1 === range)
                    return true;

                }

                if (ok)
                  return true;

              } else {
                if (lodash.includes(filteredSingles, targetIp))
                  // 단일 아이피와 비교
                  return true;

                // 범위 아이피와 비교
                const ok = lodash.some(filteredRanges, filteredIp => {
                  // 범위 아이피 내에 속하는지 확인
                  const filteredStart = Number(
                    lodash.split(filteredIp, '-')[0],
                  );
                  const filteredEnd = Number(
                    lodash.split(filteredIp, '-')[1],
                  );

                  if (targetIp >= filteredStart && targetIp <= filteredEnd)
                    return true;

                });

                if (ok)
                  return ok;

              }
            });

            if (targetIps.length === S.compact(targetMap).length)
              // targetMap 내의 모든 값이 참일 때 동일 IP
              return groupedIpListObject[group][filteredIp['index']];

          }),
          L.filter(f => !lodash.isEmpty(f)),
          S.take1, // 가장 처음 조회되는 하나만 선택
        );

        return !lodash.isEmpty(matchedObject) ? matchedObject[0] : {};
      });
    },
  );
};

/**
 * @param {Object[]} ipList IP List
 * @param {number} idx IP index
 * @param {Object[]} errors 에러 배열
 * @description IP List를 Long 타입 List로 변환하여 새로운 배열을 반환한다.
 */
export const ipListToLongListConverter = (ipList, idx, errors) => S.go(
  ipList,
  L.map(item => {
    try {
      // eslint-disable-next-line no-param-reassign, no-plusplus
      idx++;
      return ipToLong(item);
    } catch (e) {
      if (errors)
        errors.push(`${item} => ${e}`);

      return '';
    }
  }),
  L.compact,
  S.uniq,
);

/**
 * @param {Object[]} item 단일 IP
 * @description IP를 통해 Long 타입으로 변환된 IP를 반환한다.
 */
export const ipToLong = item => {
  if (lodash.includes(item, '-')) {
    // 범위 형태 처리
    const parsedIp = lodash.split(item, '-');
    const prev = parsedIp[0];
    const next = parsedIp[1];

    if (parsedIp.length !== 2)
      throw new Error('범위 형태 입력 확인 필요');

    if (!ip_utils.isValidIp(prev) || !ip_utils.isValidIp(next))
      throw new Error('입력 IP 확인 필요');

    if (!ip_utils.isValidIpv4(prev) || !ip_utils.isValidIpv4(next))
      throw new Error('IPv6 Unsupported');

    if (ip.toLong(prev) >= ip.toLong(next))
      throw new Error('입력 IP 범위 확인 필요');

    return lodash.join(
      lodash.map(parsedIp, o => ip.toLong(o)),
      '-',
    );
  } else if (lodash.includes(item, '/'))
    // cidr 형태 처리
    try {
      const obj = ip.cidrSubnet(item);

      if (obj['subnetMaskLength'] >= 32)
        throw new Error('유효하지 않은 서브넷');

      return `${ip.toLong(obj['firstAddress'])}-${ip.toLong(
        obj['lastAddress'],
      )}`;
    } catch (e) {
      throw new Error(e.message);
    }
  else {
    if (!ip_utils.isValidIp(item))
      throw new Error('입력 IP 확인 필요');

    if (!ip_utils.isValidIpv4(item))
      throw new Error('IPv6 Unsupported');

    return ip.toLong(item);
  }
};

/**
 * @param {Object[]} ipList IP List
 * @description Long 타입의 IP List를 Readable IP List로 변환된 새로운 배열을 반환한다.
 */
export const longListToIpListConverter = ipList => lodash.map(ipList, item => {
  if (lodash.includes(item, '-')) {
    const parsed = lodash.split(item, '-');
    return `${ip.fromLong(parsed[0])}-${ip.fromLong(parsed[1])}`;
  }
  return `${ip.fromLong(item)}`;

});

/**
 * @param ranges long 타입으로 변환된 범위 형태의 IP 배열
 * @description 범위 형태 IP 배열의 중복된 범위를 축약하여 새로운 배열로 반환한다.
 * @example ['181825315-181825318', '181825315-181825319', '181825321-181825322'] -> ['181825315-181825319', '181825321-181825322']
 */
export const rangesReducer = ranges => {
  const sortedRanges = lodash.sortBy(ranges);
  return (function recur(ranges) {
    const range = [ranges[0]];
    for (let i = 0; i < ranges.length - 1; i++) {
      const prev = lodash.split(ranges[i], '-');
      const next = lodash.split(ranges[i + 1], '-');

      if (ranges[i] === ranges[i + 1]) {
        if (!lodash.includes(range, ranges[i]))
          range.push(ranges[i]);

      } else if (prev[1] >= next[0]) {
        const resLast = lodash.split(range[lodash.findLastIndex(range)], '-');
        range[lodash.findLastIndex(range)] = `${
          prev[0] > resLast[0] ? resLast[0] : prev[0]
        }-${prev[1] > next[1] ? prev[1] : next[1]}`;
      } else
        range.push(lodash.join(next, '-'));

    }
    return range.length === ranges.length ? range : recur(lodash.sortBy(range));
  }(sortedRanges));
};

/**
 * @param singles long 타입으로 변환된 IP 배열
 * @param ranges long 타입으로 변환된 범위 형태의 IP 배열
 * @description 단일 형태 IP 배열 중 ranges 포함되어 있는 IP를 필터링한 새로운 배열을 반환한다.
 */
export const singlesFilter = (singles, ranges) => lodash.sortBy(
  lodash.reject(singles, single => {
    let contain = false;
    lodash.each(ranges, range => {
      if (
        lodash.split(range, '-')[0] <= single &&
          single <= lodash.split(range, '-')[1]
      )
        contain = true;

    });
    return contain;
  }),
);

// ---------------------------------------------------------------------------------------------------------------------

// console.log(
//   findMatchedIpFromObject(
//     comparableIpFilter(
//       convertIpListToLongListInObjects(
//         [
//           {
//             id: '유저가 입력한 데이터',
//             ip_addresses: ['10.214.11.13-10.214.11.25'],
//           },
//         ],
//         'ip_addresses',
//         'id',
//         'id'
//       )
//     ),
//     {
//       production: convertIpListToLongListInObjects(
//         IP_ADDRESSES,
//         'ip_addresses',
//         'id',
//         'id'
//       ),
//     }
//   )
// );
