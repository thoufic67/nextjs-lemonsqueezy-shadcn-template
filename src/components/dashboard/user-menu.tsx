"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loading } from "@/components/ui/loading";
import { ChevronRightIcon, MoreVertical } from "lucide-react";
import { type User } from "next-auth";
import { useState } from "react";
import { logout } from "@/app/actions";

export function UserMenu(props: { user?: User }) {
  const { user } = props;
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="text-muted-foreground hover:bg-muted/50 focus-visible:bg-muted/50 group flex w-full items-center justify-between gap-3 rounded-md px-4 py-2 transition-colors hover:text-foreground focus:outline-none focus-visible:text-foreground disabled:pointer-events-none disabled:opacity-50"
        disabled={loading}
      >
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="bg-muted/50 flex size-8 items-center justify-center rounded-full">
              <Loading size="sm" className="size-5" />
            </div>
          ) : (
            <Avatar className="size-8 group-disabled:opacity-50">
              <AvatarImage
                src={user.image ?? undefined}
                alt={user.name ?? undefined}
              />
              <AvatarFallback>
                {user.name?.charAt(0).toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
          )}

          <div className="text-start leading-5 group-disabled:opacity-50">
            <div className="max-w-[130px] truncate font-medium">
              {user.name}
            </div>
          </div>
        </div>

        <MoreVertical
          size={16}
          className="ml-auto shrink-0 opacity-70 group-disabled:opacity-50"
          strokeWidth={1.5}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-[226px]">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={async () => {
              setLoading(true);
              await logout();
            }}
          >
            <span>Sign out</span>
            <ChevronRightIcon className="ml-auto" aria-hidden size="16" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
