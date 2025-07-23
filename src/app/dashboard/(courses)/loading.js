import { Card, CardBody, Skeleton } from '@heroui/react'
import React from 'react'

const loading = () => {
  return (
    <div className="space-y-6 min-h-[90vh]">
      <div className="text-center">
        <Skeleton className="h-12 w-80 mx-auto rounded-2xl" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="h-80">
            <CardBody className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <Skeleton className="h-16 w-16 rounded-2xl" />
                  <Skeleton className="h-6 w-6 rounded" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-8 w-3/4 rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-3/4 rounded" />
                </div>
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default loading