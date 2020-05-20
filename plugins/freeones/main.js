module.exports = async ({
  $createImage,
  args,
  $axios,
  $moment,
  $cheerio,
  $throw,
  $log,
  actorName,
}) => {
  if (!actorName)
    $throw("Uh oh. You shouldn't use the plugin for this type of event");

  $log(
    `Scraping freeones date for ${actorName}, dry mode: ${args.dry || false}...`
  );

  const blacklist = args.blacklist || [];
  if (!args.blacklist) $log("No blacklist defined, returning everything...");

  /* const petiteThreshold = parseInt(args.petiteThreshold) || 160; */

  const url = `https://freeones.xxx/${actorName.replace(/ /g, "-")}/profile`;
  let html;
  try {
    html = (await $axios.get(url)).data;
  } catch (e) {
    $throw("Error fetching url: " + e.message);
  }

  const $ = $cheerio.load(html);

  function getHeight() {
    if (blacklist.includes("height")) return {};
    $log("Getting height...");

    const el = $('[data-test="link_height"] .text-underline-always');
    if (!el) return {};

    const raw = $(el).text();
    const cm = raw.match(/\d+cm/)[0];
    if (!cm) return {};

    return { height: parseInt(cm.replace("cm", "")) };
  }

  function scrapeText(prop, selector) {
    if (blacklist.includes(prop)) return {};
    $log(`Getting ${prop}...`);

    const el = $(selector);
    if (!el) return {};

    return { [prop]: el.text() };
  }

  async function getAvatar() {
    if (args.dry) return {};
    if (blacklist.includes("avatar")) return {};
    $log("Getting avatar...");

    const imgEl = $(".profile-header .img-fluid");
    if (!imgEl) return {};

    const url = $(imgEl).attr("src");
    const imgId = await $createImage(url, `${actorName} (avatar)`);

    return { avatar: imgId };
  }

  function getAge() {
    if (blacklist.includes("bornOn")) return {};
    $log("Getting age...");

    const aTag = $('[data-test="section-personal-information"] a');
    if (!aTag) return {};

    const href = $(aTag).attr("href");
    const yyyymmdd = href.match(/\d\d\d\d-\d\d-\d\d/);

    if (yyyymmdd && yyyymmdd.length) {
      const date = yyyymmdd[0];
      const timestamp = $moment(date, "YYYY-MM-DD").valueOf();
      return {
        bornOn: timestamp,
      };
    } else {
      $log("Could not find actor birth date.");
      return {};
    }
  }

  const custom = {
    ...scrapeText(
      "hairColor",
      '[data-test="link_hair_color"] .text-underline-always'
    ),
    ...scrapeText(
      "eyeColor",
      '[data-test="link_eye_color"] .text-underline-always'
    ),
    ...scrapeText(
      "ethnicity",
      '[data-test="link_ethnicity"] .text-underline-always'
    ),
    ...getHeight(),
  };

  const data = {
    ...getAge(),
    ...(await getAvatar()),
    custom,
  };

  if (!blacklist.includes("labels")) {
    data.labels = [];
    if (custom.hairColor) data.labels.push(`${custom.hairColor} Hair`);
    if (custom.eyeColor) data.labels.push(`${custom.eyeColor} Eyes`);
    if (custom.ethnicity) data.labels.push(custom.ethnicity);
    /* if (custom.height && custom.height <= petiteThreshold)
      data.labels.push("Petite"); */
  }

  if (args.dry === true) {
    $log("Would have returned:", data);
    return {};
  }
  return data;
};
