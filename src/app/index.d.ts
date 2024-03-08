declare const api: typeof import("./bridge").default;

declare module '*.svg?inline' {
    const content: unknown;
    export default content;
}

declare module '*.svg' {
    import React = require('react');

    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}