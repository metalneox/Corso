import Link from "next/link";
import React from "react";
import axios from "axios";

export default class Page2 extends React.Component {
  constructor(props) {
    super(props);
  }
  static async getInitialProps() {
    const res = await axios.get("https://api.github.com/repos/zeit/next.js");
    const json = res.data;
    console.log(json);
    return { stars: json.stargazers_count };
  }
  render() {
    return <div>Page 2 {this.props.stars}</div>;
  }
}
