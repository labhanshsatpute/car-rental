import React from 'react'

const MobileSidebar = ({ state, toggleSidebar }: {
  state: Boolean,
  toggleSidebar: () => void
}) => {
  return (
    <React.Fragment>
      <aside className={`mobile-sidebar ${state && 'active'}`}>
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
