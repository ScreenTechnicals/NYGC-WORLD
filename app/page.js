"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const newId = v4();
  const [card, setCard] = useState("");
  const [redirect, setRedirect] = useState(false);

  const onSubmit = async (data) => {
    setRedirect(true);
    if (card === "card3") {
      if (data.from_user.length > 0 && data.to_user.length > 0 && card.length > 0) {
        await setDoc(doc(db, "greets", newId), {
          from_user: data.from_user,
          to_user: data.to_user,
          greet: data.greet,
          cardId: card,
        });
        router.push(`/${card}/${newId}`);
      } else if (data.from_user.length === 0) {
          toast.warning("From Is Empty!");
      }
      else if (data.to_user.length === 0) {
          toast.warning("To Is Empty!");
      }
      else if (card.length === 0) {
          toast.warning("Image Not Selected!");
      }
    }else{
      if (data.greet.length >= 25 && data.from_user.length > 0 && data.to_user.length > 0 && card.length > 0) {
        await setDoc(doc(db, "greets", newId), {
          from_user: data.from_user,
          to_user: data.to_user,
          greet: data.greet,
          cardId: card,
        });
        router.push(`/${card}/${newId}`);
      } else if (data.from_user.length === 0) {
          toast.warning("From Is Empty!");
      }
      else if (data.to_user.length === 0) {
          toast.warning("To Is Empty!");
      }
      else if (card.length === 0) {
          toast.warning("Image Not Selected!");
      } else {
          toast.warning("Message Is Too Short!");
      }
    }
  };
  const posters = [
    {
      name: "itachi2.jpg",
      id: "card2",
    },
    {
      name: "mountain1.jpg",
      id: "card1",
    },
    {
      name: "temp3.png",
      id: "card3",
    },
    {
      name: "anya.jpeg",
      id: "card4",
    },
    {
      name: "love.jpg",
      id: "card5",
    },
  ];

  return (
    <div className="p-5">
      {
        redirect ? <div className="w-screen h-screen bg-[#00000067] absolute z-[9999] top-0 left-0 backdrop-blur-sm flex justify-center items-center">
        <h1>Redirecting...</h1>
      </div> : ""
      }
      <h1 className="text-2xl text-center font-light font-jockey uppercase ">
        Give Your Well Wishes To Your Loved ❤️ Ones.
      </h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-xl text-center font-jockey mt-5">
            Select A Background Image:
          </h2>
          <div className="flex justify-center items-center flex-wrap">
            {posters.map((poster) => {
              return (
                <button
                  key={poster.id}
                  className="w-[100px] h-[50px] overflow-hidden m-3 focus:scale-95 transition-all shadow-md border rounded-md"
                  type="button"
                  onClick={() => {
                    setCard(poster.id);
                    toast.success("Image has been selected successfully!");
                  }}
                >
                  <Image
                    src={`/images/${poster.name}`}
                    width={200}
                    height={100}
                  />
                </button>
              );
            })}
          </div>
          <div className="relative my-6">
            <label
              htmlFor="from_user"
              className="block absolute text-gray-500 left-4 -top-3"
            >
              From
            </label>
            <input
              type="text"
              className="w-full border-b outline-none focus:border-black py-2 shadow-md px-4 rounded-md"
              placeholder="Ex: Apple"
              {...register("from_user")}
              required
            />
          </div>
          <div className="relative my-6">
            <label
              htmlFor="to_user"
              className="block absolute text-gray-500 left-4 -top-3"
            >
              To
            </label>
            <input
              type="text"
              className="w-full border-b outline-none focus:border-black py-2 shadow-md px-4 rounded-md"
              placeholder="Ex: Banana"
              {...register("to_user")}
              required
            />
          </div>
          <div className="relative my-6">
            <label
              htmlFor="greet"
              className="block absolute text-gray-500 left-4 -top-3"
            >
              Greetings
            </label>
            <textarea
              rows={6}
              type="text"
              className="w-full border-b outline-none focus:border-black shadow-md py-2 px-4 rounded-md"
              placeholder="Ex: I Love You"
              {...register("greet")}
              required
              value={card === "card3" ? "No Greet Is Required": ""}
              disabled={card === "card3" ? true : false}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-[#000] text-white rounded-md p-2 hover:scale-95 transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
