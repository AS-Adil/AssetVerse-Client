import React from 'react';
import useRole from '../../../hooks/useRole';
import Loading from '../../../component/loading/Loading';
import EmployeeProfilePage from './eployee-profile-page/EmployeeProfilePage';
import HrProfilePage from './hr-profile-page/HrProfilePage';

const ProfilePage = () => {
  const {role, roleLoading} =useRole()

  if(roleLoading) return <Loading />

  if(role ==='hr'){
    return <HrProfilePage></HrProfilePage>
   
  }else{
     return<EmployeeProfilePage></EmployeeProfilePage>
  }

};

export default ProfilePage;