import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

function getFilePath(slug: string) {
  return path.join(process.cwd(), 'data', `${slug}.json`)
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  try {
    const raw = fs.readFileSync(getFilePath(slug), 'utf-8')
    return NextResponse.json(JSON.parse(raw))
  } catch {
    return NextResponse.json(null)
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const body = await req.json()
  fs.writeFileSync(getFilePath(slug), JSON.stringify(body, null, 2), 'utf-8')
  return NextResponse.json({ ok: true })
}
