interface TimelineProps {
  children: React.ReactNode
}

interface TimelineItemProps {
  children: React.ReactNode
}

interface TimelineIconProps {
  icon: React.ElementType
}

export function Timeline({ children }: TimelineProps) {
  return <div className="space-y-4">{children}</div>
}

export function TimelineItem({ children }: TimelineItemProps) {
  return <div className="flex gap-4">{children}</div>
}

export function TimelineIcon({ icon: Icon }: TimelineIconProps) {
  return (
    <div className="mt-1">
      <Icon className="h-5 w-5 text-primary" />
    </div>
  )
}

export function TimelineContent({ children }: TimelineItemProps) {
  return <div>{children}</div>
} 