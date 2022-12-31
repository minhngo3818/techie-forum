import React, { ReactElement, useState } from "react";
import Navbar from "../nav/navbar/navbar";
import Sidebar from "../nav/sidebar/sidebar";
import Footer from "../footer/footer";

// Add hide bar and implement callback hook
export function Layout({ children }: { children: ReactElement }) {
  const [isShown, setIsShown] = useState(false);

  return (
    <>
      <div className="flex flex-col w-screen min-h-screen h-auto bg-black">
        <Navbar isToggled={isShown} onClick={() => setIsShown(!isShown)} />
        <Sidebar isToggled={isShown} />
        <main className="w-full h-full flex flex-grow justify-center">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
export default Layout;
