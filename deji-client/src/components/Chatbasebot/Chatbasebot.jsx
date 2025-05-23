import { useEffect } from "react";

const ChatlingWidget = () => {
  useEffect(() => {
   
    window.chtlConfig = { chatbotId: "5183636876" };

 
    const script = document.createElement("script");
    script.src = "https://chatling.ai/js/embed.js";
    script.async = true;
    script.setAttribute("data-id", "5183636876");
    script.id = "chtl-script";


    document.body.appendChild(script);


    return () => {
      document.getElementById("chtl-script")?.remove();
    };
  }, []);

  return null; 
};

export default ChatlingWidget;
