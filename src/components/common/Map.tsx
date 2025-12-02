import React from 'react';

type Props = {
  embedLink: string;
  title?: string;
};

export default function Map({ embedLink, title = "xcellfund" }: Props) {
  return (
    <div className="w-full h-64 md:h-96 relative overflow-hidden shadow-md">
      <iframe
        src={embedLink}
        title={title}
        className="absolute inset-0 w-full h-full border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        aria-label={title}
      ></iframe>
    </div>
  );
}
