import { globby } from 'globby'
import { join, relative } from 'pathe'
import { useTestContext } from '@nuxt/test-utils'

export async function getClientFiles (): Promise<string[]> {
  const ctx = useTestContext() as ReturnType<typeof useTestContext> & { clientFiles: string[] }

  if (!ctx.clientFiles) {
    console.log('globby')
    const { buildDir } = ctx.nuxt!.options
    const clientDist = join(buildDir, 'pwa')
    ctx.clientFiles = (await globby(clientDist)).map(path => relative(clientDist, path))
  }

  return ctx.clientFiles
}

export async function findClientFile (pattern: RegExp): Promise<string | undefined> {
  const files = await getClientFiles()
  return files.find(file => pattern.test(file))
}
