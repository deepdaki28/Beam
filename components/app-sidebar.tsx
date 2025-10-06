"use client"
import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { UserButton, useUser } from "@clerk/nextjs"
import { ChannelList } from "stream-chat-react"
import { ChannelFilters, ChannelSort } from "stream-chat"
import { NewChatDialog } from "./NewChatDialog"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser()

  const filters: ChannelFilters = {
    members : { $in: [user?.id as string]},
    type : { $in : ["messaging", "team"]}, // Show 1-1 chats and group chats
  }

  const options = { presence : true, state : true}
  const sort : ChannelSort = {
    last_message_at: -1,
  }

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">
                    Welcome Back
                  </span>
                  <span className="text-sm font-semibold">
                    {user?.firstName} {user?.lastName}
                  </span>
                </div>
                <UserButton signInUrl="/sign-in"/>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            <NewChatDialog>
            <Button className="w-full" variant="outline">
              Start New Chat
            </Button>
            </NewChatDialog>

            {/* Channel List */}
            <ChannelList sort={sort} filters={filters} options={options}
              EmptyStateIndicator={() => (
                <div className="flex flex-col items-center justify-center h-full py-12 px-4">
                  <div className="text-6xl mb-6 opacity-20">💬</div>
                  <h2 className="text-xl font-medium text-foreground mb-2">
                    Ready to Chat?
                  </h2>
                  <p className="test-sm text-muted-foreground text-center leading-relaxed max-w-[200px]">
                    Your conversations will appear here once you start chatting
                    with others.
                  </p>
                </div>
              )}
            />

          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
