import React, { useState, useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { TfiReload } from "react-icons/tfi";
import { GoArrowDown } from "react-icons/go";
import { PiMagicWandDuotone } from "react-icons/pi";
import ReactDOM from "react-dom";

export const PromptBox = () => {
  const [popUp, setPopUp] = useState(false); // State to manage the visibility of the popup
  const [generate, setGenerate] = useState(false); // State to manage if the generation has been triggered
  const [inputValue, setInputValue] = useState(""); // State to manage the input value
  const [message, setMessage] = useState(""); // State to manage the message to be displayed

  // Predefined display text
  const displayText =
    "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";

  // Handler for focus event on the input div
  const handleDivFocus = (event: FocusEvent) => {
    const divElement = event.target as HTMLElement;
    const iconWrapper = document.createElement("div");
    iconWrapper.className = "icon-wrapper";

    // Render the icon in the wrapper
    ReactDOM.render(
      <PiMagicWandDuotone
        onClick={() => {
          setPopUp(true);
        }}
        style={{ color: "blue" }}
        className="icon-image"
      />,
      iconWrapper
    );
    divElement.appendChild(iconWrapper);

    // Add styles for the icon wrapper
    const styles = `
      .icon-wrapper {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: white;
        margin-bottom: 10px;
        margin-right: 3%;
        cursor: default;
      }
      
      .icon-wrapper:hover {
        cursor: pointer;
      }
      
      .icon-image {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `;
    const style = document.createElement("style");
    style.textContent = styles;
    document.head.appendChild(style);
  };

  // Handler for blur event on the input div
  const handleDivBlur = (event: FocusEvent) => {
    const divElement = event.target as HTMLElement;
    const iconWrapper = divElement.querySelector(".icon-wrapper");
    if (iconWrapper) {
      divElement.removeChild(iconWrapper);
    }
  };

  // Handler for input value change
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // Handler for generate button click
  const handleGenerateClick = () => {
    setMessage(inputValue);
    setInputValue("");
    setGenerate(true);
    console.log("Input value:", inputValue);
  };

  // Handler for clicking outside the popup
  const handOutsideClick = (event) => {
    if (event.target.className.includes("fixed inset-0")) {
      setPopUp(false);
    }
  };

  // Handler for insert button click
  const handleInsertClick = () => {
    const divElements = document.getElementsByClassName(
      "msg-form__contenteditable t-14 t-black--light t-normal flex-grow-1 full-height notranslate"
    );

    // Insert display text into each target element
    Array.from(divElements).forEach((element) => {
      element.removeAttribute("data-placeholder");
      const paragraph = element.querySelector("p");
      if (paragraph) {
        paragraph.textContent = displayText;
      }
    });

    const divElements2 = document.getElementsByClassName(
      "msg-form__placeholder t-14 t-black--light t-normal"
    );
    Array.from(divElements2).forEach((element) => {
      element.removeAttribute("data-placeholder");
    });

    setGenerate(false);
    setPopUp(false);
  };

  useEffect(() => {
    // Add event listeners to target divs
    const addEventListenersToDivs = () => {
      const divElements = document.getElementsByClassName(
        "msg-form__contenteditable t-14 t-black--light t-normal flex-grow-1 full-height notranslate"
      );

      if (divElements.length > 0) {
        Array.from(divElements).forEach((divElement) => {
          divElement.addEventListener("focus", handleDivFocus);
          divElement.addEventListener("blur", handleDivBlur);
        });
        return () => {
          Array.from(divElements).forEach((divElement) => {
            divElement.removeEventListener("focus", handleDivFocus);
            divElement.removeEventListener("blur", handleDivBlur);
          });
        };
      } else {
        setTimeout(addEventListenersToDivs, 1000);
      }
    };
    addEventListenersToDivs();
  }, []);

  return (
    <div className="z-50 flex fixed top-32 right-8">
      {popUp && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handOutsideClick}
        >
          <div
            id="authentication-modal"
            aria-hidden="true"
            style={{ width: "30%" }}
            className="overflow-y-auto overflow-x-hidden bg-white rounded-lg shadow max-h-[calc(100vh - 8rem)]"
          >
            <div className="relative p-4 w-full  max-h-[calc(100vh - 8rem)]">
              {generate && (
                <div>
                  <div className="chat-message p-2">
                    <div className="flex items-end justify-end">
                      <div className="flex flex-col space-y-2 text-xl max-w-xl mx-2 order-1 items-end">
                        <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-gray-200 text-slate-500">
                          {message}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="chat-message p-2">
                    <div className="flex items-end">
                      <div className="flex flex-col space-y-2 text-xl max-w-xl mx-2 order-2 items-start">
                        <span className="px-4 py-2 rounded-lg inline-block bg-blue-200 text-slate-500">
                          {displayText}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="p-4 md:p-5">
                <form className="space-y-4">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        style={{ fontSize: "15px" }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Your Prompt"
                        value={inputValue}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {generate ? (
                    <div
                      className="flex justify-end space-x-4"
                      style={{ fontSize: "15px" }}
                    >
                      <button
                        type="button"
                        className="text-slate-500 bg-white border border-slate-500 hover:bg-gray-200  rounded-md px-5 py-2.5 dark:hover:bg-gray-600 dark:hover:text-black"
                        onClick={handleInsertClick}
                      >
                        <GoArrowDown className="inline-block mr-2" /> Insert
                      </button>
                      <button
                        type="button"
                        className="text-white bg-blue-500 hover:bg-blue-700   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:hover:bg-blue-600 dark:hover:text-blue-700 dark:focus:ring-blue-800"
                      >
                        <TfiReload className="inline-block mr-2" /> Regenerate
                      </button>
                    </div>
                  ) : (
                    <div
                      className="flex justify-end space-x-4"
                      style={{ fontSize: "15px" }}
                    >
                      <button
                        type="button"
                        className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleGenerateClick}
                      >
                        <AiOutlineSend className="inline-block mr-2" /> Generate
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
