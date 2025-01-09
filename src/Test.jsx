import Cookies from "js-cookie";
import { useState } from "react";

export default function Test() {
  const [cookie, setCookie] = useState();
  const saveCookie = () => {
    Cookies.set("userToken", "test", { expires: 7 });
  };

  const loadCookie = () => {
    setCookie(Cookies.get("userToken"));
    const test = Cookies.get("userToken");
    console.log(test);
  };

  return (
    <>
      <p>test</p>
      <button onClick={saveCookie}>save cookie</button>
      <button onClick={loadCookie}>load cookie</button>
    </>
  );
}
