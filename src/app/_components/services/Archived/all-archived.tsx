"use client";
import { api } from "~/trpc/react";
import React from "react";
import moment from 'moment'


import { AlertComponent, ActionsComponent } from "~/components/common";
import { ListContainer, ListItem } from "~/components/templates/list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"


interface AllArchivedProps {
  userId: string;
}

interface Favorite {
  object: string;
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  cuid: string;
  type: string;
  createdBy: string;
  updatedBy: string;
  archivedAt: Date | null;
  archivedBy: string | null;
}

export function AllArchived({userId}: AllArchivedProps) {
  const [AllArchived] = api.archive.getByUser.useSuspenseQuery(
    { createdBy: userId }
  );
  

  if (!AllArchived || AllArchived.length === 0) {
    return (
      <AlertComponent type={"info"} icon={false} title={"No Objects Archived"} />
    );
  }

  // Group the data by 'type'
  const groupByType = (AllArchived: Favorite[]) => {
    return AllArchived.reduce((acc: Record<string, Favorite[]>, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type]!.push(item);
      return acc;
    }, {} as Record<string, Favorite[]>);
  };
  const groupedData = groupByType(AllArchived);

  if (AllArchived && Object.keys(groupedData).length === 1) {
    return (
      <ListContainer>
        {AllArchived.map((item: Favorite) => (
          <ListItem key={item.id}>

            <div className="min-w-0 px-5">
              <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6 text-gray-900">{item.object}</p>
                <p
                  className="mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                >
                  {item.type}
                </p>
              </div>
              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                <p className="whitespace-nowrap">
                Created: {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')} {/* Due on <time dateTime={item.createdAt}>{item.createdAt}</time> */}
                </p>
                {/* <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                  <circle r={1} cx={1} cy={1} />
                </svg>
                <p className="truncate">Created by {item.createdBy}</p> */}
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <ActionsComponent actions={['favorite', 'like', 'dislike', 'remove']} data={{model: 'archive', id: item.id, key: item.cuid, object: item.object, type: item.type, label: item.cuid}} />
            </div>            

          </ListItem>
        ))}
      </ListContainer>
    );
  }
      
  return (
    <Tabs defaultValue={Object.keys(groupedData)[0]} className="shadcn-tabs">
      <TabsList className="">
        {Object.keys(groupedData).map((type, idx) => (
          <TabsTrigger key={idx} value={type}>
            {type}
          </TabsTrigger>
        ))}
      </TabsList>
      {Object.keys(groupedData).map((type) => (
        <TabsContent key={type} value={type}>
          <ListContainer>
            {groupedData[type]?.map((item) => (
              <ListItem key={item.id}>
                <div className="min-w-0 px-5">
                  <div className="flex items-start gap-x-3">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{item.object}</p>
                  </div>
                  <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                      <p className="whitespace-nowrap">
                      Created: {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                      </p>
                  </div>
                </div>
                <div className="flex flex-none items-center gap-x-4">
                    <ActionsComponent actions={['remove']} data={{model: 'archive', id: item.id, key: item.cuid, object: item.object, type: item.type, label: item.cuid}} />
                </div>
              </ListItem>
            )) ?? null}
          </ListContainer>
        </TabsContent>
      ))}
    </Tabs>
  );
}

