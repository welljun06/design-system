import fs from 'fs'
import path from 'path'

export type SavedConfig = {
  enumState?: Record<string, string>
  editedLayers?: Record<string, string[]>
  contentMode?: string
  iconName?: string
  stateLoading?: boolean
  stateDisabled?: boolean
  activeVariantIndex?: number
  layerMemory?: Record<string, Record<string, string>>
}

export function readConfig(slug: string): SavedConfig | null {
  const filePath = path.join(process.cwd(), 'data', `${slug}.json`)
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}
