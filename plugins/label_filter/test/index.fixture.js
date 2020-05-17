module.exports = [
  {
    args: {},
    data: {},
    result: {},
  },
  {
    args: {
      blacklist: [],
      whitelist: [],
    },
    data: {
      labels: ["anal", "blonde"],
    },
    result: {},
  },
  {
    args: {
      blacklist: ["anal"],
      whitelist: [],
    },
    data: {
      labels: ["anal", "blonde"],
    },
    result: {
      labels: ["blonde"],
    },
  },
  {
    args: {
      blacklist: ["anal", "blonde"],
      whitelist: [],
    },
    data: {
      labels: ["anal", "blonde"],
    },
    result: {
      labels: [],
    },
  },
  {
    args: {
      blacklist: [],
      whitelist: ["anal"],
    },
    data: {
      labels: ["anal", "blonde"],
    },
    result: {
      labels: ["anal"],
    },
  },
  {
    args: {
      blacklist: [],
      whitelist: ["anal", "blonde"],
    },
    data: {
      labels: ["anal", "blonde"],
    },
    result: {
      labels: ["anal", "blonde"],
    },
  },
  {
    args: {
      blacklist: [],
      whitelist: ["anal", "blonde"],
    },
    data: {
      labels: ["anal", "blonde", "dp"],
    },
    result: {
      labels: ["anal", "blonde"],
    },
  },
  {
    args: {
      blacklist: ["anal", "blonde"],
      whitelist: [],
    },
    data: {
      labels: ["anal", "blonde", "dp"],
    },
    result: {
      labels: ["dp"],
    },
  },
];
