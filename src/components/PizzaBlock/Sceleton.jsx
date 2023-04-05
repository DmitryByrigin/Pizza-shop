import React from 'react';
import ContentLoader from 'react-content-loader';

const Sceleton = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={460}
        viewBox="0 0 280 460"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}>
        <circle cx="135" cy="135" r="135"/>
        <rect x="-3" y="280" rx="10" ry="10" width="280" height="30"/>
        <rect x="5" y="399" rx="10" ry="10" width="95" height="30"/>
        <rect x="121" y="399" rx="10" ry="10" width="155" height="30"/>
        <rect x="0" y="325" rx="10" ry="10" width="280" height="60"/>
    </ContentLoader>
);

export default Sceleton;
