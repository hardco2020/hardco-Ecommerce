import React, { useEffect } from "react";
import {
  Widget,
  addResponseMessage,
  setQuickButtons,
  addUserMessage,
  renderCustomComponent
} from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import test from "./components/test";

//TODO: Implement answer logic
//FIXME: Fix every page render problem
const Chatbot = () => {
  useEffect(() => {
    addResponseMessage("Hi! Welcome to Hardco-Ecommerce!");
    addResponseMessage(
      "Let's get to know your style with a few quick question"
    );
    addResponseMessage("Do you want to see men's or women's clothing");
    const buttonList2 = [
      {
        label: "Men's",
        value: "men",
      },
      {
        label: "Women's",
        value: "women",
      },
    ];
    setQuickButtons(buttonList2);
  }, []);
  const initial = () => {
    console.log("hello");
  };

  const handleNewUserMessage = (newMessage: string) => {
    if (newMessage === "hello") {
      addResponseMessage("dfkdfdkf");
      //   renderCustomComponent(test,newMessage)
      const buttonList = [
        {
          label: "test",
          value: "button1",
        },
        {
          label: "test1",
          value: "button2",
        },
        {
          label: "test2",
          value: "button3",
        },
      ];
      setQuickButtons(buttonList);
    }
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
  };
  let gender: string;
  let picChoose:number;
  const handleQuickButtonClicked = (message: any) => {
    var dressList = [
      {
        label: "Teenager",
        value: "teen",
      },
      {
        label: "College Student",
        value: "college",
      },
      {
        label: "20's",
        value: "20",
      },
      {
        label: "30's",
        value: "30",
      },
    ];
    var picList = [
        {
            label:"1",
            value:"1",
        },
        {
            label:"2",
            value:"2",
        },
    ]
    switch (message) {
      case "men":
        addUserMessage("Mr!");
        addResponseMessage("Great lets get started!!!");
        addResponseMessage("Which of the following best describes you");
        setQuickButtons(dressList);
        gender = "men";
        break;
      case "women":
        addUserMessage("Mrs!");
        addResponseMessage("Greate lets get started!!!");
        addResponseMessage("Which of the following best describes you");
        setQuickButtons(dressList);
        gender = "women";
        break;
      case "20":
        if (gender === "men") {
          addResponseMessage("Time to learn your taste with a few 'either' or questions..."); 
          addResponseMessage("Which do you prefer, 1 or 2 ?");
          //TODO: 
          // How to return button click when click on an image
          // render two pic at once 
          renderCustomComponent(test,{src1:"https://i.imgur.com/AQ6mKy7.png",src2:"https://i.imgur.com/AQ6mKy7.png"})
          setQuickButtons(picList);
        } else if (gender === "women") {
            addResponseMessage("Time to learn your taste with a few 'either' or questions..."); 
          addResponseMessage("Which do you prefer, 1 or 2 ?"); 

        }
        break;
      case "college":
        if (gender === "men") {
          addResponseMessage("cool");
        } else if (gender === "women") {
          addResponseMessage("not cool");
        }
        break;
      case "30":
        if (gender === "men") {
          addResponseMessage("cool");
        } else if (gender === "women") {
          addResponseMessage("not cool");
        }
        break;
      case "teen":
        if (gender === "men") {
          addResponseMessage("cool");
        } else if (gender === "women") {
          addResponseMessage("not cool");
        }
        break;
      case "1":
        picChoose = 1
        console.log("123");
        break;
      case "2":
        picChoose = 2
        console.log("1234");
        break;
      default:
        gender = "men";
        break;
    }
  };

  return (
    <div className="App">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar="https://i.imgur.com/J6jdSx5.png"
        handleQuickButtonClicked={handleQuickButtonClicked}
        title="Hardoco-Ecommerce"
        subtitle="Know your style with Cobot!"
        handleToggle={initial}
      />
    </div>
  );
};

export default Chatbot;
