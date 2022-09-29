import { useTestContext, fetch } from '@nuxt/test-utils'
import globby from 'globby'
import { join, relative } from 'pathe'
import { joinURL } from 'ufo'
import { expect } from 'vitest'

interface CustomMatchers {
  toBeGenerated(): void
  toBeServed(): void
}

declare global {
  namespace Vi {
    interface Assertion extends CustomMatchers {}
  }
}

function useContext () {
  return useTestContext() as ReturnType<typeof useTestContext> & { generatedFiles: string[] }
}

function makeWithHashRegex (path: string): RegExp {
  // eslint-disable-next-line no-useless-escape
  return new RegExp(path.replace(/\./g, '\.').replace(/\.([^\.]*)$/, '(\..{8})?\.$1'))
}

expect.extend({
  async toBeGenerated (received: string) {
    const ctx = useContext()

    if (!ctx.generatedFiles) {
      const { buildDir } = ctx.nuxt!.options
      const clientDist = join(buildDir, 'pwa')
      ctx.generatedFiles = (await globby(clientDist)).map(path => relative(clientDist, path))
    }

    const withHashRegex = makeWithHashRegex(received)

    return {
      pass: ctx.generatedFiles.some(file => withHashRegex.test(file)),
      message: () => `${received} is generated`
    }
  },
  async toBeServed (received: string) {
    const ctx = useContext()
    const { baseURL } = ctx.nuxt!.options.app
    const withHashRegex = makeWithHashRegex(received)
    const path = ctx.generatedFiles?.find(file => withHashRegex.test(file)) || received

    return {
      pass: (await fetch(joinURL(baseURL, path))).ok,
      message: () => `${received} is served`
    }
  }
})
