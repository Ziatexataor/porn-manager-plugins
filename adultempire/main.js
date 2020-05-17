module.exports = async ({
  args,
  event,
  $axios,
  $cheerio,
  $throw,
  $log,
  movieName,
  $createImage
}) => {
  if (!movieName)
    $throw("Uh oh. You shouldn't use the plugin for this type of event");

  const name = movieName.replace(/#/g, "").replace(/\s{2,}/g, " ").trim();
  $log(
    `Scraping movie covers for '${name}', dry mode: ${args.dry ||
      false}...`
  );

  const url = `https://www.adultempire.com/allsearch/search?q=${name}`;
  const html = (await $axios.get(url)).data;
  const $ = $cheerio.load(html);

  const firstResult = $(".boxcover").toArray()[0];
  const href = $(firstResult).attr("href");

  if (href) {
    const movieUrl = "https://adultempire.com" + href;
    const html = (await $axios.get(movieUrl)).data;
    const $ = $cheerio.load(html);

    const studioName = $(`.title-rating-section .item-info > a`).eq(0).text().trim();
    $log("Studio = " + studioName);

    const frontCover = $("#front-cover img").toArray()[0];
    const frontCoverSrc = $(frontCover).attr("src");
    const backCoverSrc = frontCoverSrc.replace("h.jpg", "bh.jpg");

    if (args.dry === true) {
      $log({
        movieUrl,
        frontCoverSrc,
        backCoverSrc,
        studioName
      });
    } else {
      const frontCoverImg = await $createImage(
        frontCoverSrc,
        `${movieName} (front cover)`
      );
      const backCoverImg = await $createImage(
        backCoverSrc,
        `${movieName} (back cover)`
      );

      return {
        frontCover: frontCoverImg,
        backCover: backCoverImg,
        studio: studioName
      };
    }
  }

  return {};
};
