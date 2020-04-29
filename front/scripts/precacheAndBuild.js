const workboxBuild = require('workbox-build');

// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
    // This will return a Promise
    return workboxBuild.injectManifest({
        swSrc: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging' ? 'src/sw.prod.js' : 'src/sw.js',
        swDest: 'dist/front/sw.js',
        globDirectory: 'dist/front',
        globPatterns: [
            '**\/*.{js,css,html,png,jpg,eot,svg,ttf,woff,woff2,json}',
        ],
        maximumFileSizeToCacheInBytes : 120000000
    }).then(({count, size, warnings}) => {
        // Optionally, log any warnings and details.
        warnings.forEach(console.warn);
        if (process.env.NODE_ENV !== 'production') {
          console.log(`${count} files will be precached, totaling ${size} bytes.`);
        }
    });
};

buildSW();
