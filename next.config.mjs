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
  // Since this is username.github.io format, we don't need basePath
  // If using a custom domain, this won't matter either
  // We're explicitly setting this to empty to avoid any path issues
  basePath: '',
  assetPrefix: '',
};

export default withMDX(nextConfig);
