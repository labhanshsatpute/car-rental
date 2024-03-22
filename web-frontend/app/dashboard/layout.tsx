export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <header className="border-y py-4 lg:block md:block sm:hidden">
          <div className="container">

            <div className="flex space-x-5">
              <button className="dashboard-tab">
                Account Overview
              </button>

              <button className="dashboard-tab">
                My Bookings
              </button>

              <button className="dashboard-tab">
                Account Settings
              </button>

            </div>


          </div>
        </header>
        <div className="container py-16">
          {children}
        </div>
      </section>
    )
  }