module.exports = async ({
  args,
  event,
  $throw,
  $log,
  actorName,
  $createLocalImage,
  $fs,
  $path,
}) => {
  if (!actorName)
    $throw("Uh oh. You shouldn't use the plugin for this type of event");

  const resolvedPath = $path.resolve(args.path);

  if (!resolvedPath) $throw("Missing folder path!");

  const exts = [".jpg", ".png"];

  $log(`Trying to find picture of ${actorName} in ${resolvedPath}`);

  const files = $fs.readdirSync(resolvedPath);
  const hit = files.find((filename) =>
    filename.toLowerCase().includes(actorName.toLowerCase())
  );

  if (hit && exts.some((ext) => hit.endsWith(ext))) {
    $log(`Found picture for ${actorName}`);
    const image = await $createLocalImage(
      $path.join(resolvedPath, hit),
      actorName,
      true
    );
    return {
      thumbnail: image,
    };
  }
  $log(`Found no picture for ${actorName}`);
  return {};
};
