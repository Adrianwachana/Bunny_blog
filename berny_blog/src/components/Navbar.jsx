import { useState } from "react";
import {IKImage} from 'imagekitio-react;'

const Navbar = () => {
const [open, setOpen] = useState(false);

return ( <div className="w-full h-16 md:h-20 flex items-center justify-between relative">
{/* logo */} <div className="flex items-center gap-4 text-2xl font-bold"> <img src="/logo.png" className="w-8 h-8" alt="logo" /> <span>bearbubbles</span> </div>

```
  {/* MOBILE MENU BUTTON */}
  <div className="md:hidden">
    <div
      className="cursor-pointer text-4xl"
      onClick={() => setOpen((prev) => !prev)}
    >
      {open ? "X" : "☰"}
    </div>
  </div>

  {/* MOBILE LINK LIST */}
  <div
    className={`w-full h-screen flex flex-col items-center justify-center absolute top-16 left-0 transition-all duration-300 bg-white font-medium ${
      open ? "right-0" : "right-[100%]"
    }`}
  >
    <a href="/">Home</a>
    <a href="/">Trending</a>
    <a href="/">Most popular</a>
    <a href="/">About</a>
    <a href="">
      <button className="py-2 px-4 rounded=3xl big-blue-800 text-white">
        Login
      </button>
    </a>
  </div>

  {/* DESKTOP LINKS */}
  <div className="hidden md:flex items-center xl:gap-12 font-medium">
    <a href="/">Home</a>
    <a href="/">Trending</a>
    <a href="/">Most popular</a>
    <a href="/">About</a>
  </div>
</div>


);
};

export default Navbar;
