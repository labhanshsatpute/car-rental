import React from 'react'

const MobileSidebar = ({ sidebarState, toggleSidebar }: {
  sidebarState: Boolean,
  toggleSidebar: () => void
}) => {
  return (
    <React.Fragment>
      <aside className={`mobile-sidebar ${sidebarState && 'active'}`}>
        <div className='relative'>
          <div className='sidebar-content'>

          </div>
          <div className={`sidebar-overlay`} onClick={toggleSidebar} />
        </div>
      </aside>
    </React.Fragment>
  )
}

export default MobileSidebar
