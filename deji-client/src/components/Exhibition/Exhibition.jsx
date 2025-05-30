import { Box, Typography } from "@mui/material";

const ExhibitionSection = () => {
  return (
    <Box className=" py-10 px-4 md:px-20">
      {/* Top title */}
      <Typography
        variant="h6"
        className="mb-6 text-gray-700 font-semibold"
        style={{ borderBottom: "3px solid #ccc", width: "fit-content" }}
      >
        Exhibition Show
      </Typography>

      {/* Section heading and layout */}
      <Box className=" p-4 rounded-md shadow-md">
        

        {/* Image grid */}
        <Box className="w-full h-[450px]">
          <img
            src="https://www.dejibattery.com/uploadfile/2024/01/24/20240124135339MQJFRU.jpg"
            alt="Exhibition 1"
            className="rounded-md w-full h-[450px] object-cover"
          />
         
        </Box>
      </Box>
    </Box>
  );
};

export default ExhibitionSection;
