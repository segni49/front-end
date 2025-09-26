import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { class: predictedClass, confidence, top3, source, userAgent } = body

    if (typeof predictedClass !== 'string' || typeof confidence !== 'number') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const log = await prisma.predictionLog.create({
      data: {
        class: predictedClass,
        confidence,
        top3,
        source,
        userAgent,
      },
    })

    return NextResponse.json({ ok: true, id: log.id })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}