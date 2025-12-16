import React from 'react';
import useRole from '../../../hooks/useRole';
import AssetList from '../asset-list/AssetList';
import MyAssets from '../my-assets/MyAssets';
import HrRoute from '../../../routes/HrRoute';
import EmployeeRoute from '../../../routes/EmployeeRoute';

const DashboardHome = () => {

    const {role} =useRole()

    if(role ==='hr') return <HrRoute><AssetList></AssetList></HrRoute>
    if(role ==='employee') return <EmployeeRoute><MyAssets></MyAssets></EmployeeRoute>

};

export default DashboardHome;