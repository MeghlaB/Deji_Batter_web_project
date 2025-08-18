
import Swal from "sweetalert2";
import TipTapEditor from "./TipTapEditor";


const CreateNewsArticle = () => {
    
  const handleArticleSubmit = async (data) => {
    try {
      const res = await fetch("https://deji-baterryserver-1.onrender.com/add-news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
    
      if (res?.ok) {
        Swal.fire({
          icon: "success",
          title: "Article created successfully",
          showConfirmButton: false,
          timer: 1500,
        })

      }
    } catch (error) {
      console.error("Error submitting article", error);
    }
  };

  return <TipTapEditor onSubmit={handleArticleSubmit} />;
};

export default CreateNewsArticle;
