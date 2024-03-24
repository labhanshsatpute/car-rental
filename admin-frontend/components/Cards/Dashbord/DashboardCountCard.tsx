import React from 'react'

const DashboardCountCard = ({ title, count, icon }: {
  title: String;
  count: String;
  icon: JSX.Element
}) => {
  return (
    <React.Fragment>
      <figure className="panel-card">
        <div className="panel-card-body">
          <div className="flex items-center justify-between">
            <div className="h-[70px] w-[70px] bg-complement rounded-full flex items-center justify-center">{icon}</div>
            <div className="text-right space-y-1">
              <p className="text-sm font-medium text-gray-400">{title}</p>
              <h1 className="font-semibold text-ascent text-2xl">{count}</h1>
            </div>
          </div>
        </div>
      </figure>
    </React.Fragment>
  )
}

export default DashboardCountCard
