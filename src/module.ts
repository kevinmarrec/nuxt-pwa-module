import { join } from "pathe";
import { addImportsDir, createResolver, defineNuxtModule } from "@nuxt/kit";
import parts from "./parts";
import type { PWAContext, PWAOptions } from "./types";

export default defineNuxtModule<PWAOptions>({
  meta: {
    name: "pwa",
  },
  defaults: (nuxt) => ({
    icon: {
      source: null,
      sizes: [],
      maskablePadding: 20,
      maskableSource: null,
      fileName: "icon.png",
      targetDir: "icons",
      splash: {
        backgroundColor: undefined,
        devices: [],
        targetDir: "splash",
      },
    },
    manifest: {
      name: process.env.npm_package_name! || "Nuxt PWA",
      short_name: process.env.npm_package_name!,
      description: process.env.npm_package_description!,
      lang: "en",
      start_url: `${nuxt.options.app.baseURL}?standalone=true`,
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#000000",
      icons: [],
    },
    meta: {
      name: process.env.npm_package_name! || "Nuxt PWA",
      author: process.env.npm_package_author_name!,
      title: true,
      description: process.env.npm_package_description!,
      favicon: true,
      mobileApp: true,
      mobileAppIOS: false,
      appleStatusBarStyle: false,
      theme_color: undefined,
      lang: "en",
      ogType: "website",
      ogSiteName: true,
      ogTitle: true,
      ogDescription: true,
      ogImage: true,
      ogHost: undefined,
      ogUrl: true,
      twitterCard: "summary",
      twitterSite: undefined,
      twitterCreator: undefined,
    },
    workbox: {
      autoRegister: true,
      cacheOptions: {
        directoryIndex: "/",
        revision: undefined,
      },
      enabled: !nuxt.options.dev,
      preCaching: [],
      templatePath: null,
      workboxVersion: "6.5.3",
      workboxUrl: null,
      // TODO: More Workbox options
    },
  }),
  async setup(options, nuxt) {
    const {
      nitro,
      app: { buildAssetsDir },
      buildDir,
    } = nuxt.options;

    const ctx: PWAContext = {
      ...options,
      _buildAssetsDir: join(buildDir, "pwa", buildAssetsDir),
      _buildDir: join(buildDir, "pwa"),
      _resolver: createResolver(import.meta.url),
    };

    addImportsDir(ctx._resolver.resolve("./runtime/composables"));

    for (const part of parts) await part(ctx);

    // Use nitro public assets to serve `sw.js`, `manifest.json` and assets (icons / splash screens)
    nitro.publicAssets = nitro.publicAssets || [];
    nitro.publicAssets.push({ dir: ctx._buildDir, baseURL: "/" });
  },
});
