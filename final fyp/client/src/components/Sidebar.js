import React from 'react'
const Sidebar = () => {
    return (
        <>
         <div class="col-md-3 col-lg-2 sidebar-offcanvas pl-0" id="sidebar" role="navigation" style={{backgroundColor:"#e9ecef"}}>
            <ul class="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                <li class="nav-item mb-2 mt-3"><a class="nav-link text-secondary" href="#"><h5>Waqas</h5></a></li>
                <li class="nav-item mb-2 "><a class="nav-link text-secondary" href="/admin/dashboard"><i class="fa fa-list font-weight-bold"></i> <span className="ml-3">Dashboard</span></a></li>
                <li class="nav-item mb-2"><a class="nav-link text-secondary" href="/admin/deleteSeller"><i class="fas fa-user font-weight-bold"></i> <span className="ml-3">Sellers List</span></a></li>
                <li class="nav-item mb-2"><a class="nav-link text-secondary" href="/admin/deleteBuyer"><i class="fas fa-user font-weight-bold"></i><span className="ml-3">Buyers List</span></a></li>
                <li class="nav-item mb-2"><a class="nav-link text-secondary" href="/admin/deletePost"><i class="fas fa-tablet-alt font-weight-bold"></i><span className="ml-3">Posts List</span></a></li>
                <li class="nav-item mb-2"><a class="nav-link text-secondary" href="#"><i class="fas fa-atom font-weight-bold"></i> <span className="ml-3">Flex</span></a></li>
                <li class="nav-item mb-2"><a class="nav-link text-secondary" href="#"><i class="far fa-folder font-weight-bold"></i> <span className="ml-3">Layouts</span></a></li>
                <li class="nav-item mb-2"><a class="nav-link text-secondary" href="#">Templates</a></li>
                <li class="nav-item mb-2"><a class="nav-link text-secondary" href="#">Themes</a></li>
            </ul>
       </div>
       </>
    );
};
 
export default Sidebar