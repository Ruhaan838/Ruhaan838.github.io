import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
  output: 'export',
  // Ensure GitHub Pages doesn't lose routes on refresh
  trailingSlash: true,
  // Image optimization config for static export
  images: {
    unoptimized: true,
  },
  // Add basePath for GitHub Pages if this is not a custom domain
  // This is needed for repos using the format username.github.io/repo-name
  // If you're using a custom domain or username.github.io format, comment this out
  // basePath: process.env.NODE_ENV === 'production' ? '/Ruhaan838.github.io' : '',
  // Since you're using username.github.io format, we don't need basePath
  // If your site still shows 404, try uncommenting the basePath line above
};

export default withMDX(nextConfig);
