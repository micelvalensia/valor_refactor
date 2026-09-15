import { Card } from "@/components/ui/card"
import { PostItem } from "../service/home-service"
import { AlertCircle, ExternalLink, GitBranch, MessageSquare, Star, Sparkles, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ListContentHomeProps {
  posts: PostItem[]
  isLoading: boolean
  isError: boolean
  onRetry: () => void
}

function timeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return "baru saja"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m yang lalu`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}j yang lalu`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}h yang lalu`
  return date.toLocaleDateString("id-ID", { month: "short", day: "numeric" })
}

function CardSkeleton() {
  return (
    <Card className="rounded-xl border border-border/50 bg-secondary p-5 flex flex-col gap-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-white/10" />
          <div className="flex flex-col gap-1.5">
            <div className="h-4 w-28 rounded bg-white/10" />
            <div className="h-3 w-20 rounded bg-white/10" />
          </div>
        </div>
        <div className="h-6 w-20 rounded-full bg-white/10" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-5 w-3/4 rounded bg-white/10" />
        <div className="h-4 w-full rounded bg-white/10" />
        <div className="h-4 w-2/3 rounded bg-white/10" />
      </div>

      <div className="flex gap-2">
        <div className="h-6 w-16 rounded-md bg-white/10" />
        <div className="h-6 w-20 rounded-md bg-white/10" />
        <div className="h-6 w-14 rounded-md bg-white/10" />
      </div>
    </Card>
  )
}

function PostCard({ post }: { post: PostItem }) {
  const isProject = post.type === "project"
  const title = isProject ? post.project?.title : post.problem?.title
  const description = isProject ? post.project?.description : post.problem?.description
  const authorInitial = post.user.username ? post.user.username[0].toUpperCase() : "U"

  return (
    <Card className="rounded-xl border border-border/50 bg-secondary p-5 lg:p-6 flex flex-col gap-4 transition-all duration-200 hover:border-border/90 hover:shadow-lg hover:shadow-black/20">
      {/* Header: User & Type Badge */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="size-10 rounded-full bg-main/20 text-main font-semibold flex items-center justify-center shrink-0 border border-main/30">
            {authorInitial}
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white truncate text-sm lg:text-base">
                @{post.user.username}
              </span>
              {post.user.level && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#353440] text-emerald-400 border border-emerald-500/20">
                  <Sparkles className="size-3" />
                  Lvl {post.user.level.level_number}
                </span>
              )}
            </div>
            <span className="text-xs text-white/40">
              {timeAgo(post.created_at)} {post.user.level?.title ? `• ${post.user.level.title}` : ""}
            </span>
          </div>
        </div>

        {/* Type Badge */}
        {isProject ? (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#385EC6] text-white shrink-0">
            <span>Project</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#C69238] text-white shrink-0">
            <span>Problem</span>
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="flex flex-col gap-2">
        <h2 className="text-base lg:text-lg font-bold text-white leading-snug tracking-tight">
          {title}
        </h2>
        <p className="text-sm lg:text-base text-white/70 leading-relaxed line-clamp-4 whitespace-pre-line">
          {description}
        </p>
      </div>

      {/* Project Links (Demo / Repo) */}
      {isProject && post.project && (post.project.demo_url || post.project.repository_url) && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {post.project.demo_url && (
            <a
              href={post.project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-main text-white hover:bg-main/80 transition-colors"
            >
              <ExternalLink className="size-3.5" />
              Live Demo
            </a>
          )}
          {post.project.repository_url && (
            <a
              href={post.project.repository_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-white/10 text-white/90 hover:bg-white/15 border border-white/10 transition-colors"
            >
              <GitBranch className="size-3.5" />
              Repository
            </a>
          )}
        </div>
      )}

      {/* Tech Stacks Tags */}
      {post.stacks && post.stacks.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {post.stacks.map((stack) => (
            <span
              key={stack.id}
              className="text-xs px-2.5 py-1 rounded-md bg-[#2d2b38] text-white/80 border border-white/5 font-mono"
            >
              #{stack.title}
            </span>
          ))}
        </div>
      )}

      {/* Footer: Stats & Engagement */}
      <div className="flex items-center justify-between pt-3 border-t border-border/40 text-xs text-white/50">
        <div className="flex items-center gap-4">
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-white/70">
            <Star className={`size-4 ${post.ratings_count > 0 ? "text-amber-400 fill-amber-400" : "text-white/30"}`} />
            <span className="font-semibold text-white/90">{post.rating_avg > 0 ? post.rating_avg : "0"}</span>
            <span className="text-white/40">({post.ratings_count})</span>
          </div>

          {/* Comments */}
          <div className="flex items-center gap-1.5 text-white/70">
            <MessageSquare className="size-4 text-white/40" />
            <span className="font-semibold text-white/90">{post.comments_count}</span>
            <span className="text-white/40">komentar</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export function ListContentHome({ posts, isLoading, isError, onRetry }: ListContentHomeProps) {
  if (isLoading) {
    return (
      <div className="min-h-0 flex-1">
        <div className="grid grid-cols-1 gap-4">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-64 flex flex-col items-center justify-center gap-3 p-8 text-center rounded-xl border border-destructive/20 bg-destructive/5">
        <AlertCircle className="size-10 text-destructive/80" />
        <h3 className="font-semibold text-white">Gagal memuat postingan</h3>
        <p className="text-sm text-white/50 max-w-sm">
          Terjadi kendala saat mengambil data feed dari server.
        </p>
        <Button onClick={onRetry} variant="outline" className="gap-2 mt-2">
          <RefreshCw className="size-4" />
          Coba Lagi
        </Button>
      </div>
    )
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-64 flex flex-col items-center justify-center gap-3 p-8 text-center rounded-xl border border-border/40 bg-secondary/50">
        <div className="size-12 rounded-full bg-white/5 flex items-center justify-center text-white/30">
          <MessageSquare className="size-6" />
        </div>
        <h3 className="font-semibold text-white">Belum ada postingan</h3>
        <p className="text-sm text-white/50 max-w-sm">
          Belum ada yang membuat postingan di kategori ini. Jadilah yang pertama membagikan project atau problem Anda!
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-0 flex-1">
      <div className="grid grid-cols-1 gap-4 lg:gap-5">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}