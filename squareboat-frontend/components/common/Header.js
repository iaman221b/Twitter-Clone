import {useState } from "react";
import { useRouter } from 'next/router'

const Header = () => {
  const Router = useRouter()

  console.log("router:::" , Router);

  let [filterKey, setFilterKey] = useState(1);

  const getClassName = (data) => {
    if (
      typeof window !== "undefined" &&
     Router.asPath == data
    ) {
      return "navbar-brand blue_anchor pointer-link";
    }

    return "navbar-brand pointer-link";
  };

  const setHighlighted = (data) => {
    try {
      localStorage.setItem("Feeds", data);
      setFilterKey(filterKey + 1);
      if (data == "allUsers") {
        Router.push("/users");
      } else if (data == "allFeeds") {
        Router.push("/feeds?all=true");
      } else {
        Router.push("/feeds");
      }
    } catch (error) {
      alert(error);

      console.log("er:", error);
    }
  };

  return (
    <nav key={filterKey} className="navbar navbar-light bg-light">
      <a
        className={getClassName("/feeds")}
        onClick={() => setHighlighted("myFeeds")}
      >
        My Feeds
      </a>
      <a
        className={getClassName("/feeds?all=true")}
        onClick={() => setHighlighted("allFeeds")}
      >
        Others Feeds
      </a>
      <a
        className={getClassName("/users")}
        onClick={() => setHighlighted("allUsers")}
      >
        Users
      </a>
      <a
        onClick={() => {
          localStorage.clear()
          Router.push('/login')
        }}
        className={"navbar-brand pointer-link"}
      >
        Log Out
      </a>
      <style scoped jsx>{`
        .blue_anchor {
          color: blue !important;
        }
        .pointer-link {
          cursor: pointer;
        }
      `}</style>
    </nav>
  );
};

export default Header;
