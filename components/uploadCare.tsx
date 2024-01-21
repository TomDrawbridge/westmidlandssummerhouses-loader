import React, { useEffect, useState } from 'react';
import * as LR from '@uploadcare/blocks';

import blocksStyles from '@uploadcare/blocks/web/lr-file-uploader-regular.min.css?url';

LR.registerBlocks(LR);

function UploadcareProvider({ value, onChange }) {
  useEffect(() => {
    const ctx = document.querySelector('lr-upload-ctx-provider');
    if (ctx) {
      const handleDataOutput = (e) => {
        console.log(e.detail);
        if (onChange) {
          onChange(e.detail); // Call the onChange prop with the new value
        }
      };
      ctx.addEventListener('data-output', handleDataOutput);

      return () => ctx.removeEventListener('data-output', handleDataOutput);
    }
  }, [onChange]);

  return (
    <div>
      <lr-config
        ctx-name="my-uploader"
        pubkey="xxxxxxxxxxxx"
      ></lr-config>

      <lr-file-uploader-regular
        ctx-name="my-uploader"
        css-src={blocksStyles}
      ></lr-file-uploader-regular>

      <lr-data-output
        ctx-name="my-uploader"
        use-console
        use-input
        use-group
        use-event
      ></lr-data-output>

      <lr-upload-ctx-provider
        ctx-name="my-uploader"
      ></lr-upload-ctx-provider>
    </div>
  );
}

export default UploadcareProvider;
