import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 配置 webpack 来忽略测试文件和文档文件
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // 使用 IgnorePlugin 忽略 thread-stream 包中的测试文件和文档文件
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /\/test\//,
        contextRegExp: /thread-stream/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /\.(test|spec)\.(js|ts|mjs|tsx)$/,
        contextRegExp: /thread-stream/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /\.(md|txt|zip|sh)$/,
        contextRegExp: /thread-stream/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /LICENSE$/,
        contextRegExp: /thread-stream/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /bench\.js$/,
        contextRegExp: /thread-stream/,
      })
    );
    
    return config;
  },
  
  // 添加空的 turbopack 配置以避免警告
  turbopack: {},
};

export default nextConfig;
