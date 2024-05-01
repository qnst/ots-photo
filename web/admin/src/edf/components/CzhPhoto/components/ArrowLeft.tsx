import React from 'react';

function ArrowLeft(props: React.HTMLAttributes<SVGElement>) {
  return (
    // <svg width="44" height="44" viewBox="0 0 768 768" {...props}>
    //   <path d="M640.5 352.5v63h-390l178.5 180-45 45-256.5-256.5 256.5-256.5 45 45-178.5 180h390z" />
    // </svg>

    <svg focusable="false" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" >
      {/* <defs> */}
        <path d="M28.586 1.586l-9 9-9 9c-.39.392-.586.904-.586 1.414 0 .512.196 1.024.586 1.414l9 9 9 9c.392.39.904.586 1.416.586.512 0 1.024-.196 1.414-.586.39-.392.584-.904.584-1.416 0-.512-.196-1.024-.586-1.414l-8.292-8.292-8.294-8.292 8.292-8.292 8.292-8.292c.394-.392.588-.904.588-1.416 0-.512-.196-1.024-.586-1.414-.39-.39-.902-.586-1.414-.586-.512 0-1.024.196-1.414.586z" id="b" />
        {/* <filter x="-36.4%" y="-15%" width="172.7%" height="140%" filterUnits="objectBoundingBox" id="a">
          <feMorphology radius=".5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1" />
          <feOffset in="shadowSpreadOuter1" result="shadowOffsetOuter1" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" in="shadowOffsetOuter1" result="shadowMatrixOuter1" />
          <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter2" />
          <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter2" result="shadowBlurOuter2" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" in="shadowBlurOuter2" result="shadowMatrixOuter2" />
          <feMerge>
            <feMergeNode in="shadowMatrixOuter1" />
            <feMergeNode in="shadowMatrixOuter2" />
          </feMerge>
        </filter> */}
      {/* </defs> */}
      {/* <g fill="none">
        <g fill-rule="nonzero">
          <use fill="#000" filter="url(#a)" />
          <use fill="#fff" />
        </g>
        <path d="M0 0h44v44h-44z" />
      </g> */}
    </svg>
  );
}

export default ArrowLeft;
