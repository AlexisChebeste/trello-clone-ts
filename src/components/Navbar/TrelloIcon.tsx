import React from "react";

const TrelloIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg"  width="800px" height="800px" viewBox="0 0 32 32" version="1.1">
      <path fill="currentColor" d="M14.96 23.567v-16.642c0-0.152-0.049-0.276-0.146-0.374s-0.222-0.146-0.374-0.146h-7.801c-0.152 0-0.276 0.049-0.374 0.146s-0.146 0.222-0.146 0.374v16.642c0 0.152 0.049 0.276 0.146 0.374s0.222 0.146 0.374 0.146h7.801c0.152 0 0.276-0.049 0.374-0.146s0.146-0.222 0.146-0.374zM25.881 17.326v-10.401c0-0.152-0.049-0.276-0.146-0.374s-0.222-0.146-0.374-0.146h-7.801c-0.152 0-0.276 0.049-0.374 0.146s-0.146 0.222-0.146 0.374v10.401c0 0.152 0.049 0.276 0.146 0.374s0.222 0.146 0.374 0.146h7.801c0.152 0 0.276-0.049 0.374-0.146s0.146-0.222 0.146-0.374zM28.482 4.844v22.883c0 0.282-0.103 0.526-0.309 0.732s-0.45 0.309-0.731 0.309h-22.883c-0.282 0-0.525-0.103-0.731-0.309s-0.309-0.45-0.309-0.732v-22.883c0-0.282 0.103-0.526 0.309-0.731s0.45-0.309 0.731-0.309h22.883c0.282 0 0.526 0.103 0.731 0.309s0.309 0.45 0.309 0.731z"/>
    </svg>
  );
};

export default TrelloIcon;