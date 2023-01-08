const zero = num => (num < 10 && num >= 0 ? `0${num}` : num);

export const getRemainTime = timestamp => {
  const targetDay = new Date(timestamp);
  const current = new Date();

  let diff = +targetDay - +current;
  const diffDays = Math.floor((targetDay.getTime() - current.getTime()) / (1000 * 60 * 60 * 24));
  diff -= diffDays * (1000 * 60 * 60 * 24);
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  diff -= diffHours * (1000 * 60 * 60);
  const diffMin = Math.floor(diff / (1000 * 60));
  diff -= diffMin * (1000 * 60);
  const diffSec = Math.floor(diff / 1000);

  return {
    diffDays: zero(diffDays),
    diffHours: zero(diffHours),
    diffMin: zero(diffMin),
    diffSec: zero(diffSec),
  };
};

