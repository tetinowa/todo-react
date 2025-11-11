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
      <Card className="w-[377px] rounded-[6px] pt-6 pb-6 pr-4 pl-4">
        <CardHeader className="flex justify-center flex-col items-center">
          <h1>To-Do list</h1>
          <div className="flex gap-1.5">
            <Input
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
              }}
            ></Input>
            <Button
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
        </CardHeader>
        <CardContent>
          <div className="flex">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant="ghost"
                className="flex-1"
                style={{
                  backgroundColor:
                    tab === selectedButton ? "lightblue" : "transparent",
                }}
                onClick={() => {
                  setSelectedButton(tab);
                }}
              >
                {tab}
              </Button>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {todos.map((item) => (
              <Card key={item.id}>
                <CardContent className="flex gap-4 items-center">
                  <Checkbox
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
                  <Button>Delete</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <p>Powered by Pinecone Academy</p>
        </CardFooter>
      </Card>
    </div>
  );
}
