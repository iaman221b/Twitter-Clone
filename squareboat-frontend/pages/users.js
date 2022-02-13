/* eslint-disable @next/next/no-img-element */
import UserListing from '../components/Users'
import Header from "../components/common/Header";
import HigherOrderComponent from "../components/common/Auth";


const Users = () => {

  const _Users = () => {
    return (
      <div>
        <Header/>
        <UserListing/>
      </div>
    );
  };

  const HOCWRAP = HigherOrderComponent(_Users);
    return (
      <_Users/>
      );
}
 
export default Users;