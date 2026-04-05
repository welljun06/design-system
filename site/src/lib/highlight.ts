import { createHighlighter } from 'shiki'

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-light'],
      langs: ['tsx', 'bash', 'typescript'],
    })
  }
  return highlighterPromise
}

export async function highlight(code: string, lang: 'tsx' | 'bash' | 'typescript' = 'tsx'): Promise<string> {
  const highlighter = await getHighlighter()
  return highlighter.codeToHtml(code, {
    lang,
    theme: 'github-light',
  })
}
