import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* logo */}
      <div className="flex items-center gap-4 text-2xl font-bold">
        <img src="/logo.png" className="w-8 h-8" alt="logo" />
        <span>bearbubbles</span>
      </div>

      {/* MOBILE MENU */}
      <div className="md:hidden">
        <div className="cursor-pointer text-4xl" onClick={() => setOpen((prev) => !prev)}
            >
          {open ? "X" : "☰"}
        </div>
      </div>

      {/* MOBILELINK LIST */}
      <div className="w-full h-screen flex flex-col items-center justify-center absolute top-16 transition ease-in-ease-out $">
        {/*  */}
        <div>Menu</div>
      </div>
    </div>
    {/* MOBILELINK LIST */}
    <div className="hissen md:flex">D</div>
  );
};

export default Navbar;
