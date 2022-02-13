import ReactPaginate from "react-paginate";
import styled from "styled-components";

const MyPaginate = styled(ReactPaginate).attrs({
  // You can redifine classes here, if you want.
  activeClassName: "active", // default to "disabled"
})`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style-type: none;
  padding: 0 5rem;
  li a {
    border-radius: 50%;
    border: #ddd 1px solid;
    cursor: pointer;
    display: inline-block;
    height: 35px;
    width: 35px;
    text-align: center;
    line-height: 33px;
    margin: 0px 3px;
    font-size: 12px;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
    opacity: 0.5;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
  li:first-child a,
  li:last-child a {
    font-size: 0;
    background: #ddd;
    position: relative;
  }
  li:first-child a:after,
  li:last-child a:after {
    content: "<";
    position: absolute;
    font-size: 20px;
    left: 12px;
    font-weight: 300;
  }
  li:last-child a:after {
    content: ">" !important;
  }

  ::after {
  }
`;

export default MyPaginate;