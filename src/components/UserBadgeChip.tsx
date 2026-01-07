type UserBadge = {
  name: string;      // 아티스트명 (ex. IVE, BTS, IU)
  color?: string;    // 선택 (hex or tailwind token)
};


type UserBadgeProps = {
  badge: UserBadge;
};

export function UserBadgeChip({ badge }: UserBadgeProps) {
    badge.color = badge.color || 'bg-black';
  return (
    <span className={`rounded-full ${badge.color} px-2.5 py-1 text-[11px] font-semibold text-white`}>
      {badge.name}
    </span>
  );
}
