import Link from "next/link"
import { ArrowLeft, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await prisma.post.findFirst({
    where: { slug: params.slug, published: true },
  })

  if (!post) {
    notFound()
  }

  return (
    <article className="container py-8 md:py-12 max-w-4xl">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/blog">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад к блогу
        </Link>
      </Button>

      {post.coverImage && (
        <div className="aspect-video rounded-lg overflow-hidden mb-8">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(post.createdAt).toLocaleDateString("ru-RU")}</span>
          </div>
        </div>
      </header>

      {post.excerpt && (
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          {post.excerpt}
        </p>
      )}

      <div className="prose prose-lg max-w-none">
        <div className="whitespace-pre-wrap leading-relaxed">
          {post.content}
        </div>
      </div>
    </article>
  )
}
