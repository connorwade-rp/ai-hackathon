import React from "react";
import { Navbar } from "./components/navbar";
import { Hero } from "./components/hero";
import { Stat, StatContainer } from "./components/stat";
import { Teaser } from "./components/teaser";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <StatContainer>
        <Stat
          label="Dogs"
          value="100"
          description="Number of dogs looking for homes"
        ></Stat>
        <Stat
          label="Dogs homed"
          value="150"
          description="Number of dogs homed in the last month"
        ></Stat>
        <Stat
          label="Dogs in foster"
          value="50"
          description="Number of dogs in foster homes"
        ></Stat>
      </StatContainer>
      <div className="flex justify-center my-40">
        <p className="w-1/2 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur,
          aliquam possimus? Aliquam culpa omnis, ducimus voluptatum quia rem
          commodi itaque voluptatibus reprehenderit est amet aspernatur ut error
          dolorem! Porro, necessitatibus.
        </p>
      </div>
      <div className="py-5 px-20 mx-auto flex flex-row justify-between">
        <Teaser
          title="Adopt a dog"
          description="Find your new best friend"
          cta="View dogs"
          imgSrc="https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        ></Teaser>
        <Teaser
          title="Adopt a dog"
          description="Find your new best friend"
          cta="View dogs"
          imgSrc="https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        ></Teaser>
        <Teaser
          title="Adopt a dog"
          description="Find your new best friend"
          cta="View dogs"
          imgSrc="https://images.pexels.com/photos/220938/pexels-photo-220938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        ></Teaser>
      </div>
    </>
  );
}

export default App;
