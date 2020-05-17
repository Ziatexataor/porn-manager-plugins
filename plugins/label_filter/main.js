const lower = (s) => s.toLowerCase();

module.exports = ({ args, data }) => {
  const whitelist = (args.whitelist || []).map(lower);
  const blacklist = (args.blacklist || []).map(lower);

  if (!data.labels) return {};

  if (!whitelist.length && !blacklist.length) return {};

  return {
    labels: data.labels.filter((label) => {
      const lowercased = label.toLowerCase();
      if (whitelist.length && !whitelist.includes(label)) return false;
      return blacklist.every((blacklisted) => blacklisted != lowercased);
    }),
  };
};
