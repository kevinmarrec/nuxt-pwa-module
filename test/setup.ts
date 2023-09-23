import { fetch, useTestContext } from "@nuxt/test-utils";
import { globby } from "globby";
import { join, relative } from "pathe";
import { joinURL } from "ufo";
import { expect } from "vitest";

interface CustomMatchers<R = unknown> {
  toBeGenerated(): R;
  toBeServed(): R;
}

declare module "vitest" {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

function useContext() {
  return useTestContext() as ReturnType<typeof useTestContext> & {
    generatedFiles: string[];
  };
}

function makeWithHashRegex(path: string): RegExp {
  return new RegExp(
    path.replace(/\./g, ".").replace(/\.([^.]*)$/, "(..{8})?.$1")
  );
}

expect.extend({
  async toBeGenerated(received: string) {
    const ctx = useContext();

    if (!ctx.generatedFiles) {
      const { buildDir } = ctx.nuxt!.options;
      const clientDist = join(buildDir, "pwa");
      ctx.generatedFiles = (await globby(clientDist)).map((path) =>
        relative(clientDist, path)
      );
    }

    const withHashRegex = makeWithHashRegex(received);

    return {
      pass: ctx.generatedFiles.some((file) => withHashRegex.test(file)),
      message: () => `${received} is generated`,
    };
  },
  async toBeServed(received: string) {
    const ctx = useContext();
    const { baseURL } = ctx.nuxt!.options.app;
    const withHashRegex = makeWithHashRegex(received);
    const path =
      ctx.generatedFiles?.find((file) => withHashRegex.test(file)) || received;

    return {
      pass: (await fetch(joinURL(baseURL, path))).ok,
      message: () => `${received} is served`,
    };
  },
});
