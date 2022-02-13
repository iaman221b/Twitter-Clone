import { UserListing , FollowUser , UnFollowUser } from "../helpers/services/UserService";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Router from "next/router";


const UsersListing = () => {
  const [users, setUsers] = useState([]);

  const [fetching , setIsFetching] = useState(true)


  useEffect(() => {
    try {
      _getUsers();
    } catch (error) {
      console.log(error);
    }
  }, []);

  let _getUsers = async () => {
    try {
      setIsFetching(true)

      let result = await UserListing();

      setUsers(result?.data?.data?.data);
    } catch (error) {
        if(error?.response?.status == 401){
            localStorage.clear();
            Router.push('/')
        }
        console.log(error);
    }
    finally {
      setIsFetching(false)
    }
  };

  let followUser = async(index , data ,status) => {


    try {

        let params = {
            followerId:data._id
        }
    
        if(status == "Follow"){
            await FollowUser(params)
        }
        else{
            await UnFollowUser(params)
        }
    
        let _users = [...[] , ...users]
        
        _users[index].isFollowing = status == "Follow" ? 1 : 0

        setUsers(_users)
    
        Swal.fire("",`Successfully ${status} ${data.name}` , "success")
        
    } catch (error) {

        console.log(error)
        Swal.fire("",`Server Error` , "error")

        if(error?.response?.status == 401){
          localStorage.clear();
          Router.push('/')
      }

        
    }

  }

  return (
    <div className="container">
      <div className="row">
        {users && users.length ? users.map((data, index) => {
          return (
            <div key={index} className="col-md-12 col-lg-5">
              <div className="card">
                <div className="p-4">
                  <div className="d-flex flex-row">
                    <div className="">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar6.png"
                        alt="user"
                        className="rounded-circle"
                        width="100"
                      />
                    </div>
                    <div className="pl-4">
                      <h3>{data.name}</h3>
                      <h4>{data.email}</h4>
                      <button className="btn btn-success btn-rounded text-white text-uppercase font-14" onClick={() =>followUser(index , data  , data.isFollowing ? "UnFollow" : "Follow")}>
                        <i className={`fa mr-2 ${data.isFollowing ? "fa-minus" : "fa-plus"}`}></i> {data.isFollowing ? "UnFollow" : "Follow"}
                      </button>
                      {/* <button className="btn btn-success btn-rounded text-white text-uppercase font-14"><i className="fa fa-minus mr-2"></i> Follow</button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }) : fetching ? "Loading...." : "No user found"}
      </div>
      <style scoped jsx>{`
        body {
          color: #fff;
          background: #3598dc !important;
          font-family: "Roboto", sans-serif !important;
        }
        body{
            background: #edf1f5;
            margin-top:20px;
        }
        .card {
            position: relative;
            display: flex;
            flex-direction: column;
            min-width: 0;
            word-wrap: break-word;
            background-color: #fff;
            background-clip: border-box;
            border: 0 solid transparent;
            border-radius: 0;
        }
        ul.list-style-none {
            margin: 0;
            padding: 0;
        }
        ul.list-style-none li {
            list-style: none;
        }
        
        .font-light {
            font-weight: 300;
        }
        .font-20 {
            font-size: 25px !important;
        }
        
        }
        ul.list-style-none li a {
            color: #313131;
            padding: 8px 0;
            display: block;
            text-decoration: none;
        }
        .text-muted {
            color: #8898aa!important;
        }
      `}</style>
    </div>
  );
};

export default UsersListing;
