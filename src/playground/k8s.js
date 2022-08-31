import { chain, concat, includes, isEqual, map, reduce } from 'lodash';
import { CONFIG_MAP, SECRET, SECRET_CONFIG_MAP } from '../dummy/k8s';

const labels = {
  'kubernetes.io/basic-auth': 'w.gitbasicauth',
  'kubernetes.io/ssh-auth': 'SSH',
};

export const 변경전 = map(
  reduce(
    SECRET_CONFIG_MAP,
    (acc, item) => {
      const { metadata: { name } } = item;
      if (
        includes(
          ['kubernetes.io/basic-auth', 'kubernetes.io/ssh-auth'],
          item.type,
        )
      )
        if (!acc[item.type])
          acc[item.type] = [{ label: name, value: name }];
        else
          acc[item.type] = concat(acc[item.type], { label: name, value: name });

      return acc;
    },
    {},
  ),
  (value, key) => ({
    label: labels[key],
    options: value,
  }),
);

export const 변경후 = chain(SECRET_CONFIG_MAP)
  .filter(item => includes(['kubernetes.io/basic-auth', 'kubernetes.io/ssh-auth'], item.type),
  )
  .groupBy('type')
  .map((group, type) => ({
    label: labels[type],
    options: map(group, ({ metadata: { name } }) => ({
      label: name,
      value: name,
    })),
  }))
  .value();

// console.log(isEqual(변경전, 변경후));

export const 변경전2 = map(
  reduce(
    concat(CONFIG_MAP, SECRET),
    (acc, item) => {
      const { metadata: { name } } = item;
      if (!acc[item.kind])
        acc[item.kind] = [{ label: name, value: item }];
      else
        acc[item.kind] = concat(acc[item.kind], { label: name, value: item });

      return acc;
    },
    {},
  ),
  (value, kind) => ({
    label: kind === 'ConfigMap' ? 'ConfigMap' : 'Secret',
    options: value,
  }),
);

export const 변경후2 = chain(concat(CONFIG_MAP, SECRET))
  .groupBy('kind')
  .map((group, type) => ({
    label: labels[type],
    options: map(group, item => ({ label: item.name, value: item })),
  }))
  .value();

// console.log(변경전2, 변경후2);
