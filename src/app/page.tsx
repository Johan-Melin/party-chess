import Link from "next/link"
import { generatePublicCode } from "@/lib/generatePublicCode"

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Link
        href={`/play/${generatePublicCode()}`}
        className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
      >
        Play
      </Link>
    </main>
  )
}
