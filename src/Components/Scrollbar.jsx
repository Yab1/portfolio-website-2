import { useEffect, useRef } from "react";

export default function Scrollbar() {
  const progressBar = useRef();

  useEffect(() => {
    let totalHeight = document.body.scrollHeight - window.innerHeight;
    window.onscroll = function () {
      let progressHeight = (window.pageYOffset / totalHeight) * 100;
      progressBar.current.style.height = progressHeight + "%";
    };
  }, []);

  return (
    <>
      <div
        ref={progressBar}
        id="progressbar"
        className="fixed top-0 right-0 w-2 rounded rounded-t-none before:content-[''] before:top-0 before:left-0 before:w-full before:h-full after:content-[''] after:top-0 after:left-0 after:w-full after:h-full z-50"
      ></div>
      <div id="scrollPath" className="fixed top-0 right-0 w-2 h-full "></div>
    </>
  );
}
