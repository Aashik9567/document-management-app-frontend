import {  Outlet,} from 'react-router-dom';

const Layout = () => {
  return (
  <div className="bg-gradient-to-br from-slate-700 via-white to-blue-50">
    <Outlet />
  </div>
  )
}

export default Layout
