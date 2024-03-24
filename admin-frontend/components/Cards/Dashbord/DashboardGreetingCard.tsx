import React from 'react'

const DashboardGreetingCard = () => {
  return (
    <React.Fragment>
      <figure className="panel-card bg-center" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1)),url('/assets/login-bg.png')" }}>
        <div className="lg:p-10 md:p-10 sm:p-7 space-y-4">
                    
          <div className="space-y-2">
            <h1 className="font-semibold text-3xl text-white">Good Morning, Administrator</h1>
            <p className="text-sm text-gray-200">Welcome to your Administrator, Alumni Dashboard</p>
          </div>
    
        </div>
      </figure> 
    </React.Fragment>
  )
}

export default DashboardGreetingCard
