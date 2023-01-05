export interface WorkboxOptions {
  autoRegister: boolean
  cacheOptions: {
    directoryIndex: string
    revision: string | undefined
  }
  enabled: boolean
  preCaching: Array<string | { revision: string; url: string }>
  templatePath: string | null
  workboxVersion: string
  workboxUrl: string | null
}
