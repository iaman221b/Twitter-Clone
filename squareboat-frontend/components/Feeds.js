/* eslint-disable @next/next/no-img-element */
import { FeedListing, CreateFeed } from "../helpers/services/FeedService";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ReactPaginate from "../helpers/pagination";
import { useRouter } from 'next/router'



const Feeds = () => {
  const [feeds, setFeeds] = useState([]);

  const [filterKey, setFilterKey] = useState(1);

  const router = useRouter()

  const { all } = router.query

  const [fetching , setIsFetching] = useState(true)

  useEffect(() => {

    try {

      if(all){
        setParams({...params, myFeed:false})
      }
      else{
        setParams({...params, myFeed:true})
      }

      setFilterKey(filterKey + 1) 
      
    } catch (error) {

      console.log(error);
      
    }

  },[all])


  let [params, setParams] = useState({
    page: 0,
    limit: 10,
    myFeed: true,
  });

  let [feed, setFeed] = useState("");

  let [totalCount, setTotalCount] = useState(0);


  useEffect(() => {
    if(filterKey == 1){
      return
    }
    try {
      _getFeeds();
    } catch (error) {
      console.log(error);
    }
  }, [filterKey]);


  let _getFeeds = async () => {
    try {

      setIsFetching(true)
      let paramsObj = {
        params,
      };

      let result = await FeedListing(paramsObj);

      setFeeds(result?.data?.data?.data);
      setTotalCount(result?.data?.data?.totalCount)

    } catch (error) {
      console.log("error: " + error);

      if(error?.response?.status == 401){
        localStorage.clear();
        router.push('/')
    }
    }
    finally {
      setIsFetching(false)
    }
  };

  let createFeed = async () => {
    if(!feed){

      Swal.fire("", "Enter Valid Data", "error");

    }
    try {
      let result = await CreateFeed({ feed });

      Swal.fire("", "Feed added successfully", "success");

      setFeed("");

      if(params.myFeed){
        _getFeeds()
      }

    } catch (error) {
      console.log(error);

      if(error?.response?.status == 401){
        localStorage.clear();
        router.push('/')
    }
    }
  };

  const updateData = (e) => {
    setFeed(e.target.value);
  };

  return (
    <div>
      <div className="feed">
        <div className="tweetBox">
          <div>
            <div className="tweetbox__input">
              <img
                src="https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png"
                alt=""
              />
              <input
                type="text"
                placeholder="What's happening?"
                value={feed}
                onChange={(e) => updateData(e)}
              />
            </div>
            <button
              onClick={() => {
                createFeed();
              }}
              className="tweetBox__tweetButton"
            >
              Tweet
            </button>
          </div>
        </div>

       

          {feeds && feeds.length
            ? feeds.map((data, index) => {
              return(
                <div key ={index} className="post">
                <div className="post__avatar">
                  <img
                    src="https://i.pinimg.com/originals/a6/58/32/a65832155622ac173337874f02b218fb.png"
                    alt=""
                  />
                </div>
                <div  className="post__body">
                  <div className="post__header">
                    <div className="post__headerText">
                      <h3>
                        {data?.userId?.name}
                        <span className="post__headerSpecial">
                          <span className="material-icons post__badge">
                            {" "}
                            verified{" "}
                          </span>
                          {data?.userId?.email}
                        </span>
                      </h3>
                    </div>
                    <div className="post__headerDescription">
                      <p>
                        {data.feed}
                      </p>
                    </div>
                  </div>
                </div>
                 </div>
                )
              })
            : fetching ? "loading..." : "No Feed found"}

                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    forcePage={params.page}
                    onPageChange={(page) => {
                      page = page.selected;
                      setParams((prevState) => ({
                        ...prevState,
                        page: page,
                      }));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      setFilterKey(filterKey + 1);
                    }}
                    pageRangeDisplayed={5}
                    pageCount={Math.ceil(totalCount / 10)}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                  />
      </div>
    </div>
  );
};

export default Feeds;
