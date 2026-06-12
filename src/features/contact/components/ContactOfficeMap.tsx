"use client";

import { useState } from "react";

import { UiIcon } from "@/features/global/components/UiIcon";

type ContactOfficeMapProps = {
  address: string;
  directionsUrl: string;
  mapEmbedUrl: string;
};

export function ContactOfficeMap({
  address,
  directionsUrl,
  mapEmbedUrl,
}: ContactOfficeMapProps) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  return (
    <section className="ct-map" aria-label="Office location map">
      <div className="ct-map__frame">
        {isMapLoaded ? (
          <iframe
            className="ct-map__embed"
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Cetakia office map"
          />
        ) : (
          <div className="ct-map__placeholder" role="img" aria-label="Cetakia office map preview">
            <button type="button" className="ct-map__load" onClick={() => setIsMapLoaded(true)}>
              <UiIcon name="bi-pin-map-fill" /> Load Map
            </button>
          </div>
        )}

        <article className="ct-map__overlay">
          <h2>Our Office</h2>
          <p>
            <UiIcon name="bi-geo-alt" />
            <span>{address}</span>
          </p>
          <a href={directionsUrl} target="_blank" rel="noreferrer noopener">
            Get a Direction <UiIcon name="bi-arrow-right" />
          </a>
        </article>
      </div>
    </section>
  );
}
