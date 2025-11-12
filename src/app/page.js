"use client";
import { useId, useState } from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { nanoid } from "nanoid";
import { Input } from "@/components/ui/input";

const tabs = ["All", "Completed", "Incomplete"];

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  const [selectedButton, setSelectedButton] = useState("All");

  console.log(todos);
  return (
    <div className="flex w-screen h-screen items-center justify-center bg-zinc-50 font-sans">
      <Card className="w-[377px] rounded-[6px] pt-6 pb-6 pr-4 pl-4 ">
        <CardHeader className="flex justify-center flex-col items-center gap-5">
          <h1 className="text-[20px] font-semibold">To-Do list</h1>
          <div className="flex gap-1.5">
            {" "}
            <Input
              className="w-[280px] h-10 rounded-[6px] "
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
              }}
            ></Input>
            <Button
              className="bg-[#3C82F6] h-10 flex gap-2.5 pt-2 pb-2 pl-4 pr-4 rounded-[6px]"
              onClick={() => {
                setTodos([
                  ...todos,
                  { id: nanoid(), isDone: false, text: value },
                ]);
                setValue("");
              }}
            >
              Add
            </Button>
          </div>
          <div className="flex self-start">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant="ghost"
                className="flex-1"
                style={{
                  backgroundColor:
                    tab === selectedButton ? "#3c82f6" : "transparent",
                }}
                onClick={() => {
                  setSelectedButton(tab);
                }}
              >
                {tab}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 p-0 justify-center">
          {todos
            .filter((item) => {
              if (selectedButton === "All") return true;
              if (selectedButton === "Completed") return item.isDone === true;
              return item.isDone === false;
            })
            .map((item) => (
              <div key={item.id}>
                <CardContent className="flex gap-4 items-center bg-[#F9FAFB] w-[345px] h-[62px] rounded-md text-[14px]">
                  <Checkbox
                    className="bg-[#FFFFFF] w-5 h-5 border-[#767676] rounded-px"
                    checked={item.isDone}
                    onClick={() => {
                      const newTodos = todos.map((todo) => {
                        if (todo.id !== item.id) return todo;
                        return {
                          isDone: !item.isDone,
                          text: item.text,
                          id: item.id,
                        };
                      });

                      setTodos(newTodos);
                    }}
                  ></Checkbox>
                  <p className="flex-1">{item.text}</p>
                  <Button className="bg-[#FEF2F2] rounded-[6px] pt-1.5 pb-1.5 pl-3 pr-3 gap-2.5 text-[#EF4444] text-[14px] font-normal">
                    Delete
                  </Button>
                </CardContent>
              </div>
            ))}
        </CardContent>
        <CardFooter>
          <p>Powered by Pinecone Academy</p>
        </CardFooter>
      </Card>
    </div>
  );
}
