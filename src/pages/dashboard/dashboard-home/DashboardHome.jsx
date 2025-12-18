import React from 'react';
import useRole from '../../../hooks/useRole';
import AssetList from '../asset-list/AssetList';
import HrRoute from '../../../routes/HrRoute';
import EmployeeRoute from '../../../routes/EmployeeRoute';
import MyAsset from '../my-asset/MyAsset';

const DashboardHome = () => {

    const {role} =useRole()

    if(role ==='hr') return <HrRoute><AssetList></AssetList></HrRoute>
    if(role ==='employee') return <EmployeeRoute><MyAsset></MyAsset></EmployeeRoute>

};

export default DashboardHome;