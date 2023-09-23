import { existsSync } from "node:fs";
import { fork } from "node:child_process";
import _consola from "consola";
import { relative, resolve } from "pathe";
import { provider } from "std-env";
import { joinURL } from "ufo";
import { addTemplate, useNuxt } from "@nuxt/kit";
import type { PWAContext } from "../../types";
import { defaultDevices, metaFromDevice } from "./splash";
import { generateHash, makeManifestIcon } from "./utils";

const consola = _consola.create({
  level:
    process.env.NUXT_PWA_SILENT === "1" ? Number.NEGATIVE_INFINITY : undefined,
});

export const defaultSizes = [64, 120, 144, 152, 192, 384, 512];

export default async (pwa: PWAContext) => {
  if (!pwa.icon || !pwa.manifest) return;

  if (provider === "stackblitz") {
    return console.warn(
      "[PWA] Disabling icon generation as `sharp` is not currently supported on StackBlitz."
    );
  }

  const options = pwa.icon;
  const nuxt = useNuxt();

  if (!options.source) {
    options.source = resolve(
      nuxt.options.srcDir,
      nuxt.options.dir.public,
      options.fileName
    );
  }

  if (!existsSync(options.source))
    return consola.warn(`[PWA] Icon not found at ${options.source}`);

  if (!options.maskableSource) {
    const possibleSource = options.source.replace(/\.(.*)$/, ".maskable.$1");
    options.maskableSource = existsSync(possibleSource)
      ? possibleSource
      : options.source;
  }

  if (!existsSync(options.maskableSource)) {
    return consola.warn(
      `[PWA] Maskable Icon not found at ${options.maskableSource}`
    );
  }

  if (options.sizes.length === 0)
    options.sizes = [64, 120, 144, 152, 192, 384, 512];

  // Hash as suffix for production & used for build caching strategy
  const hash = await generateHash(options);

  const iconsDir = joinURL(
    nuxt.options.app.baseURL,
    nuxt.options.app.buildAssetsDir,
    options.targetDir
  );

  // Prepare manifest file
  for (const size of options.sizes) {
    pwa.manifest.icons.push(
      makeManifestIcon({ hash, iconsDir, size, purpose: "any" })
    );
    pwa.manifest.icons.push(
      makeManifestIcon({ hash, iconsDir, size, purpose: "maskable" })
    );
  }

  const isSplashSupportEnabled = pwa.meta && pwa.meta.mobileAppIOS;

  // Prepare splash screens
  if (isSplashSupportEnabled) {
    if (!options.splash.backgroundColor)
      options.splash.backgroundColor = pwa.manifest.background_color;

    if (options.splash.devices.length === 0)
      options.splash.devices = defaultDevices;

    pwa._splashMetas = options.splash.devices.map((device) =>
      metaFromDevice(device, {
        assetsDir: joinURL(
          nuxt.options.app.baseURL,
          nuxt.options.app.buildAssetsDir,
          options.splash.targetDir
        ),
        hash,
      })
    );
  }

  const generateOptions = JSON.stringify({
    input: options.source,
    buildAssetsDir: pwa._buildAssetsDir,
    targetDir: options.targetDir,
    sizes: options.sizes,
    maskableInput: options.maskableSource,
    maskablePadding: options.maskablePadding,
    splash: isSplashSupportEnabled ? options.splash : false,
    hash,
  });

  let generate: Promise<void>;

  // Start generation parallel to Nuxt build
  nuxt.hook("build:before", () => {
    // Track time
    const start = Date.now();
    // Generation Promise (generate in a child process using fork)
    generate = new Promise<void>((resolve, reject) => {
      const child = fork(pwa._resolver.resolve("../lib/generate.cjs"), [
        generateOptions,
      ]);
      child.on("exit", (code: number) => (code ? reject(code) : resolve()));
    }).then(() => {
      consola.success(
        `PWA icons${
          isSplashSupportEnabled ? " and splash screens " : " "
        }generated in ${Date.now() - start} ms`
      );
    });
  });

  // Ensure icons (& splash screens) have been generated before Nitro build
  nuxt.hook("nitro:build:before", async () => {
    await generate;
  });

  // Generate types
  const typesPath = addTemplate({
    filename: "types/pwa.d.ts",
    getContents: () =>
      `export type IconSize = number | ${options.sizes
        .map((size) => `'${size}'`)
        .join(" | ")}`,
  }).dst.replace(/\.d\.ts$/, "");

  function relativeWithDot(from: string, to: string) {
    return relative(from, to).replace(/(^.[^/])/, "./$1");
  }

  nuxt.hook("prepare:types", ({ tsConfig }) => {
    tsConfig.compilerOptions.paths["#pwa"] = [
      relativeWithDot(nuxt.options.srcDir, typesPath),
    ];
  });
};
