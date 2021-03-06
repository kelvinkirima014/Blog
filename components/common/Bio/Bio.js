import clsx from "clsx";

import { Image } from "..";
import { getSiteMetaData } from "@utils/helpers";

export function Bio({ className }) {
  const { author, social } = getSiteMetaData();

  return (
    <div className={clsx(`flex items-center`, className)}>
      <Image
        className="flex-shrink-0 mb-0 mr-3 rounded-full w-14 h-14"
        src={require("../../../content/assets/me.jpeg")}
        webpSrc={require("../../../content/assets/me.jpeg?webp")}
        previewSrc={require("../../../content/assets/me.jpeg?lqip")}
        alt="Profile"
      />

      <p className="text-base leading-7">
        I am <b className="font-semibold">{author.name}</b>{" "}
        {author.summary}{" "}
        <a href={`https://github.com/${social.github}`}>
          View on Github.
        </a>
      </p>
    </div>
  );
}
