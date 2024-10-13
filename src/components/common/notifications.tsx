import { Separator } from "~/components/ui/separator"
import { Button } from "~/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
 } from "~/components/ui/card"

import {
    BellIcon
  } from '@heroicons/react/24/outline'

export default function NotificationsComponent() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
            <span className="sr-only">View notifications</span>
            <BellIcon aria-hidden="true" className="h-6 w-6" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
      <div className="flex flex-col">
        {/* Top section (Notifications title) */}
        <div className="pt-5 space-y-2">
          <h4 className="font-medium leading-none text-center">Notifications</h4>
        </div>

        {/* Scrollable content (Notifications list) */}
        <div className="flex-1 overflow-y-auto border-gray-200 pt-5 space-y-2 h-full">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center w-full">
                <div className="flex-1">
                  <CardTitle className='truncate font-medium text-lg'>
                    TITLE
                  </CardTitle>
                </div>
              </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3">
                  @TODO: notificationsList
                </CardDescription>
              </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center w-full">
                <div className="flex-1">
                  <CardTitle className='truncate font-medium text-lg'>
                    TITLE
                  </CardTitle>
                </div>
              </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3">
                  @TODO: notificationsList
                </CardDescription>
              </CardContent>
          </Card>
        </div>

        {/* Bottom section (View All button) */}
        <div className="pt-5">
          <Separator />
          <Button variant="ghost" size="sm" className="w-full mt-2">
            View All
          </Button>
        </div>
      </div>
      </PopoverContent>
    </Popover>
  )
}
